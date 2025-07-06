"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, MapPin, User, Edit } from "lucide-react"

export interface Event {
  id: number
  event_name: string
  event_date: string
  event_location?: string
  event_description?: string
  event_organizer?: string
  event_notes?: string
}

interface EventItemProps {
  event: Event
  onDelete: (id: number) => void
  onEdit: (event: Event) => void
}

export function EventItem({ event, onDelete, onEdit }: EventItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">{event.event_name}</h4>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(event.event_date)}
              </Badge>
            </div>

            {event.event_description && <p className="text-muted-foreground">{event.event_description}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {event.event_location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.event_location}
                </div>
              )}
              {event.event_organizer && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {event.event_organizer}
                </div>
              )}
            </div>

            {event.event_notes && <p className="text-sm text-muted-foreground italic">{event.event_notes}</p>}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(event)}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
