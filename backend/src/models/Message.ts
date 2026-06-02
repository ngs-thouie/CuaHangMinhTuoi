import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId
  receiverId: mongoose.Types.ObjectId | null // null for admin
  content: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null // if null, it's a message sent to the "Admin/System"
    },
    content: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export const Message = mongoose.model<IMessage>('Message', messageSchema)
