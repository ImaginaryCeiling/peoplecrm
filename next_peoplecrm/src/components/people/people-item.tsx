"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, Phone, MapPin, Edit } from "lucide-react"

interface Person {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  organization_id?: number | null
  notes?: string
}

interface PersonItemProps {
  person: Person
  onDelete: (id: number) => void
  onEdit: (person: Person) => void
}

export function PersonItem({ person, onDelete, onEdit }: PersonItemProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg">{person.name}</h4>
                {person.organization_id && <Badge variant="secondary">Org ID: {person.organization_id}</Badge>}
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                {person.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {person.email}
                  </div>
                )}
                {person.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {person.phone}
                  </div>
                )}
                {person.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {person.address}
                  </div>
                )}
              </div>

              {person.notes && <p className="text-sm text-muted-foreground italic">{person.notes}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(person)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(person.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


