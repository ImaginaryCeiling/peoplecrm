"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, MapPin, User, Edit } from "lucide-react"

interface Event {
  id: number
  eventName: string
  eventDate: string
  eventLocation?: string
  eventDescription?: string
  eventOrganizer?: string
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
              <h4 className="font-semibold text-lg">{event.eventName}</h4>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(event.eventDate)}
              </Badge>
            </div>

            {event.eventDescription && <p className="text-muted-foreground">{event.eventDescription}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {event.eventLocation && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.eventLocation}
                </div>
              )}
              {event.eventOrganizer && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {event.eventOrganizer}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
