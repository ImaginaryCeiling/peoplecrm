"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Trash2, Globe, Mail, MapPin, Edit } from "lucide-react"

export interface Organization {
  id: number
  organization_name: string
  organization_industry?: string
  organization_location?: string
  organization_website?: string
  organization_contact_email?: string
  organization_notes?: string
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
                <h4 className="font-semibold text-lg">{organization.organization_name}</h4>
                {organization.organization_industry && <Badge variant="outline">{organization.organization_industry}</Badge>}
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                {organization.organization_contact_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {organization.organization_contact_email}
                  </div>
                )}
                {organization.organization_website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    <a
                      href={organization.organization_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {organization.organization_website}
                    </a>
                  </div>
                )}
                {organization.organization_location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {organization.organization_location}
                  </div>
                )}
              </div>

              {organization.organization_notes && <p className="text-sm text-muted-foreground italic">{organization.organization_notes}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(organization)}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(organization.id)}
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
