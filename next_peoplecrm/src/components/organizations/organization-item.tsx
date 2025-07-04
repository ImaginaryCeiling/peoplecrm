"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Trash2, Globe, Mail, MapPin, Users, Edit } from "lucide-react"

export interface Organization {
  id: number
  name: string
  industry?: string
  location?: string
  website?: string
  contact_email?: string
  notes?: string
  employee_count?: number
}

interface OrganizationItemProps {
  organization: Organization
  onDelete: (id: number) => void
  onEdit: (organization: Organization) => void
}

export function OrganizationItem({ organization, onDelete, onEdit }: OrganizationItemProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-lg">{organization.name}</h4>
                {organization.industry && <Badge variant="outline">{organization.industry}</Badge>}
                {organization.employee_count !== undefined && organization.employee_count > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {organization.employee_count}
                  </Badge>
                )}
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                {organization.contact_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {organization.contact_email}
                  </div>
                )}
                {organization.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {organization.website}
                    </a>
                  </div>
                )}
                {organization.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {organization.location}
                  </div>
                )}
              </div>

              {organization.notes && <p className="text-sm text-muted-foreground italic">{organization.notes}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(organization)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(organization.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
