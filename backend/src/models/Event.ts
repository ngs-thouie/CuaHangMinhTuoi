import mongoose, { Schema, Document } from 'mongoose'

export interface IEvent extends Document {
  dateNumber: string
  dateDetail: string
  type: string
  typeColor: string
  title: string
  description: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<IEvent>({
  dateNumber: { type: String, required: true },
  dateDetail: { type: String, required: true },
  type: { type: String, required: true },
  typeColor: { type: String, default: 'bg-charcoal/10 text-charcoal' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Event = mongoose.model<IEvent>('Event', EventSchema)
