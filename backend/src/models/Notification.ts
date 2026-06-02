import mongoose, { Document, Schema } from 'mongoose'

export interface INotification extends Document {
  title: string
  message: string
  createdAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Notification = mongoose.model<INotification>('Notification', notificationSchema)
