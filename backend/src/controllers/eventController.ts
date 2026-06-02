import { Request, Response } from 'express'
import { Event } from '../models/Event.js'

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find({ active: true }).sort({ createdAt: -1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' })
  }
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body)
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' })
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const event = await Event.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update event' })
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Event.findByIdAndDelete(id)
    res.json({ message: 'Event deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' })
  }
}
