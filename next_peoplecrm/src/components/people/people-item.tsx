"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, Phone, MapPin, Edit, Briefcase, Linkedin, Building2 } from "lucide-react"

export interface Person {
  id: number
  person_name: string
  person_email?: string
  person_phone?: string
  person_location?: string
  person_role?: string
  person_linkedin?: string
  person_notes?: string
  organization_id?: number | null
  organizations?: {
    id: number
    organization_name: string
    organization_industry?: string
    organization_location?: string
  }
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
                {person.person_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg">{person.person_name}</h4>
                {person.person_role && <Badge variant="secondary">{person.person_role}</Badge>}
                {person.organizations && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {person.organizations.organization_name}
                  </Badge>
                )}
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                {person.person_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {person.person_email}
                  </div>
                )}
                {person.person_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {person.person_phone}
                  </div>
                )}
                {person.person_location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {person.person_location}
                  </div>
                )}
                {person.person_role && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3" />
                    {person.person_role}
                  </div>
                )}
                {person.person_linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-3 w-3" />
                    <a href={person.person_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {person.organizations && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3" />
                    <span>{person.organizations.organization_name}</span>
                    {person.organizations.organization_industry && (
                      <span className="text-xs text-gray-500">({person.organizations.organization_industry})</span>
                    )}
                  </div>
                )}
              </div>

              {person.person_notes && <p className="text-sm text-muted-foreground italic">{person.person_notes}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(person)}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(person.id)}
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


