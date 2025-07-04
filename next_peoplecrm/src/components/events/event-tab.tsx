"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EventItem } from "./event-item"
import { EmptyState } from "@/components/empty-state"
import { LoadingSpinner } from "@/components/loader-spinner"
import { ErrorMessage } from "@/components/error-message"

interface Event {
  id: number
  eventName: string
  eventDate: string
  eventLocation?: string
  eventDescription?: string
  eventOrganizer?: string
}

interface EventsTabProps {
  events: Event[]
  loading: boolean
  error: string | null
  onDelete: (id: number) => void
  onAddNew: () => void
  onEdit: (event: Event) => void
}

export function EventsTab({ events, loading, error, onDelete, onAddNew, onEdit }: EventsTabProps) {
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Events</h3>
        <Button onClick={() => window.location.href = '/create/event'} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Event
        </Button>
      </div>
      <div className="grid gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventItem key={event.id} event={event} onDelete={onDelete} onEdit={onEdit} />)
        ) : (
          <EmptyState message="No events found. Create your first event!" />
        )}
      </div>
    </div>
  )
} 
