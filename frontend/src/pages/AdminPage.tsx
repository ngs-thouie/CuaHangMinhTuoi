import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { orderService } from '../services/orderService'
import { productService } from '../services/productService'
import { eventService } from '../services/eventService'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import { notificationService, Notification } from '../services/notificationService'
import { useNavigate, useLocation } from 'react-router-dom'
import { Product } from '../types'

type Tab = 'dashboard' | 'orders' | 'products' | 'events' | 'users' | 'messages' | 'notifications'

/* ───── tiny modal shell ───── */
const Modal: React.FC<{open:boolean; onClose:()=>void; title:string; children:React.ReactNode}> = ({open,onClose,title,children}) => {
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto mx-4 p-8 border border-sand" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
          <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal text-xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const inputCls = "w-full border border-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-primary bg-white"
const btnPrimary = "bg-primary text-white px-6 py-2.5 font-sans text-sm font-medium hover:bg-primary-dark transition-colors"
const btnDanger = "text-red-600 hover:text-red-800 font-sans text-xs transition-colors"
const thCls = "px-4 py-3 text-left font-sans text-xs uppercase tracking-wider text-charcoal/50"
const tdCls = "px-4 py-3 font-sans text-sm"

/* ───── product form ───── */
const emptyProduct = ():Partial<Product> => ({name:'',description:'',price:0,category:'individual',image:'',available:true,occasion:'',servings:undefined,components:[]})

const ProductForm:React.FC<{initial?:Partial<Product>;onSave:(p:Partial<Product>)=>void;saving:boolean}> = ({initial,onSave,saving}) => {
  const [f,setF] = useState<Partial<Product>>(initial||emptyProduct())
  const set = (k:string,v:any) => setF(prev=>({...prev,[k]:v}))
  return (
    <form onSubmit={e=>{e.preventDefault();onSave(f)}} className="space-y-4">
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Tên sản phẩm *</label><input className={inputCls} value={f.name||''} onChange={e=>set('name',e.target.value)} required/></div>
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Mô tả *</label><textarea className={inputCls+" h-20 resize-none"} value={f.description||''} onChange={e=>set('description',e.target.value)} required/></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Giá (VNĐ) *</label><input type="number" className={inputCls} value={f.price||0} onChange={e=>set('price',Number(e.target.value))} required/></div>
        <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Danh mục *</label><select className={inputCls} value={f.category||'individual'} onChange={e=>set('category',e.target.value)}><option value="individual">Món lẻ</option><option value="meal-set">Mâm cỗ</option></select></div>
      </div>
      {f.category==='meal-set' && (
        <div className="grid grid-cols-2 gap-4">
          <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Dịp</label><input className={inputCls} value={f.occasion||''} onChange={e=>set('occasion',e.target.value)} placeholder="cung-ram, vu-lan..."/></div>
          <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Số món</label><input type="number" className={inputCls} value={f.servings||''} onChange={e=>set('servings',Number(e.target.value))}/></div>
        </div>
      )}
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">URL Hình ảnh</label><input className={inputCls} value={f.image||''} onChange={e=>set('image',e.target.value)} placeholder="https://..."/></div>
      <div className="flex items-center gap-2"><input type="checkbox" checked={f.available!==false} onChange={e=>set('available',e.target.checked)} id="avail"/><label htmlFor="avail" className="font-sans text-sm text-charcoal/70">Còn hàng</label></div>
      <button type="submit" disabled={saving} className={btnPrimary+" w-full disabled:opacity-50"}>{saving?'Đang lưu...':'Lưu sản phẩm'}</button>
    </form>
  )
}

/* ───── event form ───── */
const emptyEvent = () => ({dateNumber:'',dateDetail:'',type:'THƯỜNG KỲ',typeColor:'bg-charcoal/10 text-charcoal',title:'',description:'',active:true})

const EventForm:React.FC<{initial?:any;onSave:(e:any)=>void;saving:boolean}> = ({initial,onSave,saving}) => {
  const [f,setF] = useState(initial||emptyEvent())
  const set = (k:string,v:any) => setF((prev:any)=>({...prev,[k]:v}))
  const typeOptions = [
    {value:'THƯỜNG KỲ',color:'bg-charcoal/10 text-charcoal'},
    {value:'ĐẠI LỄ',color:'bg-secondary text-white'},
    {value:'KHÓA TU',color:'bg-primary text-white'},
  ]
  return (
    <form onSubmit={e=>{e.preventDefault();onSave(f)}} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Ngày (VD: 15.07) *</label><input className={inputCls} value={f.dateNumber} onChange={e=>set('dateNumber',e.target.value)} required/></div>
        <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Chi tiết ngày *</label><input className={inputCls} value={f.dateDetail} onChange={e=>set('dateDetail',e.target.value)} required placeholder="15 THÁNG 7 ÂM LỊCH"/></div>
      </div>
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Loại sự kiện</label><select className={inputCls} value={f.type} onChange={e=>{const opt=typeOptions.find(o=>o.value===e.target.value);set('type',e.target.value);if(opt)set('typeColor',opt.color)}}>{typeOptions.map(o=><option key={o.value} value={o.value}>{o.value}</option>)}</select></div>
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Tiêu đề *</label><input className={inputCls} value={f.title} onChange={e=>set('title',e.target.value)} required/></div>
      <div><label className="font-sans text-xs text-charcoal/60 block mb-1">Mô tả *</label><textarea className={inputCls+" h-24 resize-none"} value={f.description} onChange={e=>set('description',e.target.value)} required/></div>
      <div className="flex items-center gap-2"><input type="checkbox" checked={f.active} onChange={e=>set('active',e.target.checked)} id="active"/><label htmlFor="active" className="font-sans text-sm text-charcoal/70">Đang hoạt động</label></div>
      <button type="submit" disabled={saving} className={btnPrimary+" w-full disabled:opacity-50"}>{saving?'Đang lưu...':'Lưu sự kiện'}</button>
    </form>
  )
}

/* ═══════ MAIN ═══════ */
export const AdminPage: React.FC = () => {
  const { user } = useAuth()
  const { success, error: toastError } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  useEffect(() => {
    if (location.hash === '#messages') {
      setActiveTab('messages')
    }
  }, [location])

  const { users, stats, fetchUsers, fetchStats, updateUser, deleteUser } = useUsers()

  // Products state
  const [products, setProducts] = useState<Product[]>([])
  const [prodModal, setProdModal] = useState<{open:boolean;edit?:Product}>({open:false})
  const [prodSaving, setProdSaving] = useState(false)

  // Orders state
  const [orders, setOrders] = useState<any[]>([])
  const [orderFilter, setOrderFilter] = useState('pending')
  const [loading, setLoading] = useState(false)

  // Events state
  const [events, setEvents] = useState<any[]>([])
  const [evtModal, setEvtModal] = useState<{open:boolean;edit?:any}>({open:false})
  const [evtSaving, setEvtSaving] = useState(false)

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notifForm, setNotifForm] = useState({ title: '', message: '' })
  const [notifSaving, setNotifSaving] = useState(false)

  /* ── data fetchers ── */
  const fetchAllProducts = useCallback(async () => {
    try { setProducts(await productService.getAllAdmin()) } catch(e) { console.error(e) }
  }, [])

  const fetchEvents = useCallback(async () => {
    try { setEvents(await eventService.getAllAdmin()) } catch(e) { console.error(e) }
  }, [])

  useEffect(() => {
    if (user?.role !== 'admin') { navigate('/'); return }
    fetchStats(); fetchUsers(); fetchAllProducts(); fetchEvents()
    notificationService.getNotifications().then(setNotifications).catch(console.error)
  }, [user, navigate, fetchStats, fetchUsers, fetchAllProducts, fetchEvents])

  useEffect(() => { if(activeTab==='orders') fetchOrders() }, [activeTab, orderFilter])

  const fetchOrders = async () => {
    setLoading(true)
    try { setOrders(await orderService.getAll(orderFilter)) } catch(e){ console.error(e) } finally { setLoading(false) }
  }

  /* ── handlers ── */
  const handleStatusChange = async (id:string, status:string) => {
    try { await orderService.updateStatus(id, status); setOrders(prev=>prev.map(o=>o._id===id?{...o,status}:o)); success('Cập nhật trạng thái thành công') } catch{ toastError('Lỗi cập nhật') }
  }

  const handlePaymentStatusChange = async (id:string) => {
    try { 
      await orderService.updatePaymentStatus(id, 'paid'); 
      setOrders(prev=>prev.map(o=>o._id===id?{...o,paymentStatus:'paid'}:o)); 
      success('Đã xác nhận thanh toán') 
    } catch { toastError('Lỗi cập nhật thanh toán') }
  }

  const handleSaveProduct = async (data:Partial<Product>) => {
    setProdSaving(true)
    try {
      if(prodModal.edit?._id) { await productService.update(prodModal.edit._id, data as Product) }
      else { await productService.create(data as Product) }
      setProdModal({open:false}); fetchAllProducts(); success('Lưu sản phẩm thành công')
    } catch{ toastError('Lỗi lưu sản phẩm') } finally { setProdSaving(false) }
  }

  const handleDeleteProduct = async (id:string) => {
    if(!confirm('Xóa sản phẩm này?')) return
    try { await productService.delete(id); fetchAllProducts(); success('Đã xóa') } catch{ toastError('Lỗi xóa') }
  }

  const handleSaveEvent = async (data:any) => {
    setEvtSaving(true)
    try {
      if(evtModal.edit?._id) { await eventService.update(evtModal.edit._id, data) }
      else { await eventService.create(data) }
      setEvtModal({open:false}); fetchEvents(); success('Lưu sự kiện thành công')
    } catch{ toastError('Lỗi lưu sự kiện') } finally { setEvtSaving(false) }
  }

  const handleDeleteEvent = async (id:string) => {
    if(!confirm('Xóa sự kiện này?')) return
    try { await eventService.delete(id); fetchEvents(); success('Đã xóa') } catch{ toastError('Lỗi xóa') }
  }

  const handleDeleteUser = async (id:string) => {
    if(!confirm('Xóa user này?')) return
    try { await deleteUser(id); success('Đã xóa người dùng') } catch(e:any){ toastError(e.message) }
  }

  const handleToggleRole = async (id:string, role:string) => {
    try { await updateUser(id, {role: role==='admin'?'customer':'admin'}); success('Đã cập nhật role') } catch(e:any){ toastError(e.message) }
  }

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotifSaving(true)
    try {
      const newNotif = await notificationService.createNotification(notifForm.title, notifForm.message)
      setNotifications(prev => [newNotif, ...prev])
      setNotifForm({ title: '', message: '' })
      success('Đã gửi thông báo thành công')
    } catch {
      toastError('Lỗi gửi thông báo')
    } finally {
      setNotifSaving(false)
    }
  }

  if (user?.role !== 'admin') return null

  const tabs:{key:Tab;label:string}[] = [
    {key:'dashboard',label:'Tổng quan'},{key:'orders',label:'Đơn hàng'},
    {key:'products',label:'Sản phẩm'},{key:'events',label:'Sự kiện'},
    {key:'users',label:'Người dùng'},{key:'notifications',label:'Thông Báo'}
  ]

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-serif text-4xl text-charcoal mb-8">Dashboard Admin</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-sand overflow-x-auto">
          {tabs.map(t=>(
            <button key={t.key} onClick={()=>setActiveTab(t.key)}
              className={`px-6 py-3 font-sans text-sm font-medium tracking-wide transition-colors border-b-2 -mb-[1px] whitespace-nowrap ${activeTab===t.key?'border-primary text-primary':'border-transparent text-charcoal/50 hover:text-charcoal'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══ Dashboard ═══ */}
        {activeTab==='dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {label:'Tổng sản phẩm',value:stats.totalProducts,color:'text-charcoal'},
                {label:'Tổng đơn hàng',value:stats.totalOrders,color:'text-charcoal'},
                {label:'Đơn chờ xử lý',value:stats.pendingOrders,color:'text-secondary'},
                {label:'Doanh thu',value:stats.totalRevenue.toLocaleString()+'đ',color:'text-primary'},
              ].map(s=>(
                <div key={s.label} className="bg-white p-6 border border-sand">
                  <p className="font-sans text-xs uppercase tracking-wider text-charcoal/40 mb-2">{s.label}</p>
                  <p className={`font-serif text-3xl ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-sand"><p className="font-sans text-xs uppercase tracking-wider text-charcoal/40 mb-2">Tổng người dùng</p><p className="font-serif text-3xl text-charcoal">{stats.totalUsers}</p></div>
              <div className="bg-white p-6 border border-sand"><p className="font-sans text-xs uppercase tracking-wider text-charcoal/40 mb-2">Đơn hoàn thành</p><p className="font-serif text-3xl text-primary">{stats.completedOrders}</p></div>
            </div>
          </div>
        )}

        {/* ═══ Orders ═══ */}
        {activeTab==='orders' && (
          <div className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              {[['pending','Chờ xác nhận'],['confirmed','Đã xác nhận'],['preparing','Đang chuẩn bị'],['ready','Sẵn sàng'],['completed','Hoàn thành'],['cancelled','Hủy']].map(([k,l])=>(
                <button key={k} onClick={()=>setOrderFilter(k)} className={`px-4 py-2 font-sans text-sm transition-colors ${orderFilter===k?'bg-primary text-white':'bg-white border border-sand text-charcoal/60 hover:border-charcoal/30'}`}>{l}</button>
              ))}
            </div>
            {loading ? <p className="text-center py-12 text-charcoal/50">Đang tải...</p> : orders.length===0 ? <div className="bg-white p-8 border border-sand text-center"><p className="text-charcoal/50">Không có đơn hàng</p></div> : (
              <div className="bg-white border border-sand overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-sand"><tr>
                    {['Mã Đơn','Khách Hàng','SĐT','Ngày Giao','Tổng Tiền','Thanh Toán','Trạng Thái','Hành Động'].map(h=><th key={h} className={thCls}>{h}</th>)}
                  </tr></thead>
                  <tbody>{orders.map(o=>{
                    const isLate = o.paymentStatus === 'pending' && (new Date().getTime() - new Date(o.createdAt).getTime() > 24 * 60 * 60 * 1000)
                    return (
                    <tr key={o._id} className={`border-b border-sand/50 hover:bg-cream/50 ${isLate ? 'bg-red-50/50' : ''}`}>
                      <td className={tdCls+" text-primary"}>{o.orderCode}</td>
                      <td className={tdCls}>{o.customerName}</td>
                      <td className={tdCls}>{o.customerPhone}</td>
                      <td className={tdCls}>{new Date(o.deliveryDate).toLocaleDateString('vi-VN')} {o.deliveryTime}</td>
                      <td className={tdCls+" font-medium text-primary"}>{o.totalAmount.toLocaleString()}đ</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold ${o.paymentStatus==='paid'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>
                            {o.paymentStatus==='paid' ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                          </span>
                          {isLate && <span className="text-[10px] text-red-600 font-semibold animate-pulse">! QUÁ HẠN 24H</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3"><select value={o.status} onChange={e=>handleStatusChange(o._id,e.target.value)} className="bg-white border border-sand px-2 py-1 text-sm focus:outline-none focus:border-primary">
                        {['pending','confirmed','preparing','ready','completed','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                      </select></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center">
                          {o.paymentStatus !== 'paid' && (
                            <button onClick={()=>handlePaymentStatusChange(o._id)} className="font-sans text-[11px] font-medium bg-green-600 text-white px-2 py-1 hover:bg-green-700 transition-colors">
                              Tick Đã TT
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )})}</tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══ Products ═══ */}
        {activeTab==='products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-sans text-sm text-charcoal/60">{products.length} sản phẩm</p>
              <button onClick={()=>setProdModal({open:true})} className={btnPrimary}>+ Thêm sản phẩm</button>
            </div>
            <div className="bg-white border border-sand overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-sand"><tr>
                  {['Hình','Tên sản phẩm','Giá','Danh mục','Trạng thái','Hành động'].map(h=><th key={h} className={thCls}>{h}</th>)}
                </tr></thead>
                <tbody>{products.map(p=>(
                  <tr key={p._id} className="border-b border-sand/50 hover:bg-cream/50">
                    <td className="px-4 py-3">{p.image?<img src={p.image} alt={p.name} className="w-12 h-12 object-cover"/>:<div className="w-12 h-12 bg-sand flex items-center justify-center text-charcoal/30 text-xs">Ảnh</div>}</td>
                    <td className={tdCls}>{p.name}</td>
                    <td className={tdCls+" font-medium text-primary"}>{p.price.toLocaleString()}đ</td>
                    <td className="px-4 py-3"><span className={`text-xs px-3 py-1 ${p.category==='meal-set'?'bg-secondary/10 text-secondary':'bg-primary/10 text-primary'}`}>{p.category==='meal-set'?'Mâm cỗ':'Món lẻ'}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-3 py-1 ${p.available?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{p.available?'Còn hàng':'Hết hàng'}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={()=>setProdModal({open:true,edit:p})} className="font-sans text-xs text-primary hover:text-primary-dark">Sửa</button>
                        <button onClick={()=>handleDeleteProduct(p._id!)} className={btnDanger}>Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <Modal open={prodModal.open} onClose={()=>setProdModal({open:false})} title={prodModal.edit?'Sửa sản phẩm':'Thêm sản phẩm'}>
              <ProductForm initial={prodModal.edit} onSave={handleSaveProduct} saving={prodSaving}/>
            </Modal>
          </div>
        )}

        {/* ═══ Events ═══ */}
        {activeTab==='events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-sans text-sm text-charcoal/60">{events.length} sự kiện</p>
              <button onClick={()=>setEvtModal({open:true})} className={btnPrimary}>+ Thêm sự kiện</button>
            </div>
            <div className="bg-white border border-sand overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-sand"><tr>
                  {['Ngày','Loại','Tiêu đề','Trạng thái','Hành động'].map(h=><th key={h} className={thCls}>{h}</th>)}
                </tr></thead>
                <tbody>{events.map((ev:any)=>(
                  <tr key={ev._id} className="border-b border-sand/50 hover:bg-cream/50">
                    <td className={tdCls}><span className="font-serif text-lg">{ev.dateNumber}</span><br/><span className="text-[10px] text-charcoal/50">{ev.dateDetail}</span></td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1 ${ev.typeColor}`}>{ev.type}</span></td>
                    <td className={tdCls}>{ev.title}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-3 py-1 ${ev.active?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{ev.active?'Hoạt động':'Ẩn'}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={()=>setEvtModal({open:true,edit:ev})} className="font-sans text-xs text-primary hover:text-primary-dark">Sửa</button>
                        <button onClick={()=>handleDeleteEvent(ev._id)} className={btnDanger}>Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <Modal open={evtModal.open} onClose={()=>setEvtModal({open:false})} title={evtModal.edit?'Sửa sự kiện':'Thêm sự kiện'}>
              <EventForm initial={evtModal.edit} onSave={handleSaveEvent} saving={evtSaving}/>
            </Modal>
          </div>
        )}

        {/* ═══ Users ═══ */}
        {activeTab==='users' && (
          <div className="bg-white border border-sand overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-sand"><tr>
                {['Tên','Email','SĐT','Role','Hành Động'].map(h=><th key={h} className={thCls}>{h}</th>)}
              </tr></thead>
              <tbody>{users.map(u=>(
                <tr key={u._id} className="border-b border-sand/50 hover:bg-cream/50">
                  <td className={tdCls}>{u.name}</td>
                  <td className={tdCls}>{u.email}</td>
                  <td className={tdCls}>{u.phone||'-'}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-3 py-1 ${u.role==='admin'?'bg-secondary/10 text-secondary':'bg-primary/10 text-primary'}`}>{u.role}</span></td>
                  <td className="px-4 py-3"><div className="flex gap-2">
                    <button onClick={()=>handleToggleRole(u._id,u.role)} className="font-sans text-xs text-primary hover:text-primary-dark">{u.role==='admin'?'Gỡ admin':'Cấp admin'}</button>
                    {u._id!==user?.id && <button onClick={()=>handleDeleteUser(u._id)} className={btnDanger}>Xóa</button>}
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* ═══ Notifications ═══ */}
        {activeTab==='notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create form */}
            <div className="bg-white border border-sand p-6 h-fit sticky top-24">
              <h3 className="font-serif text-xl text-charcoal mb-4">Gửi Thông Báo Mới</h3>
              <p className="font-sans text-xs text-charcoal/50 mb-6">Thông báo này sẽ được gửi Broadcast đến toàn bộ khách hàng trên hệ thống.</p>
              <form onSubmit={handleCreateNotification} className="space-y-4">
                <div>
                  <label className="font-sans text-xs text-charcoal/60 block mb-1">Tiêu đề *</label>
                  <input className={inputCls} value={notifForm.title} onChange={e=>setNotifForm({...notifForm, title: e.target.value})} required placeholder="VD: Khuyến mãi mừng Đại Lễ" />
                </div>
                <div>
                  <label className="font-sans text-xs text-charcoal/60 block mb-1">Nội dung *</label>
                  <textarea className={inputCls+" h-32 resize-none"} value={notifForm.message} onChange={e=>setNotifForm({...notifForm, message: e.target.value})} required placeholder="Nội dung thông báo..." />
                </div>
                <button type="submit" disabled={notifSaving} className={btnPrimary+" w-full disabled:opacity-50"}>
                  {notifSaving ? 'Đang gửi...' : 'Gửi Thông Báo Broadcast'}
                </button>
              </form>
            </div>

            {/* List history */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-xl text-charcoal mb-4">Lịch sử Thông Báo</h3>
              {notifications.length === 0 ? (
                <div className="bg-white p-8 border border-sand text-center">
                  <p className="text-charcoal/50">Chưa có thông báo nào được tạo.</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div key={n._id} className="bg-white border border-sand p-6">
                    <p className="font-sans font-medium text-lg text-primary">{n.title}</p>
                    <p className="font-sans text-sm text-charcoal mt-2">{n.message}</p>
                    <p className="font-sans text-xs text-charcoal/40 mt-4 border-t border-sand/50 pt-4">Gửi lúc: {new Date(n.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
