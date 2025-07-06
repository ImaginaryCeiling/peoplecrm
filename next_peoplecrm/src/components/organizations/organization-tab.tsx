"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { OrganizationItem, Organization } from "./organization-item"
import { EmptyState } from "../empty-state"
import { LoadingSpinner } from "../loader-spinner"
import { ErrorMessage } from "../error-message"

interface OrganizationsTabProps {
  organizations: Organization[]
  loading: boolean
  error: string | null
  onDelete: (id: number) => void
  onAddNew: () => void
  onEdit: (organization: Organization) => void
}

export function OrganizationsTab({ organizations, loading, error, onDelete, onAddNew, onEdit }: OrganizationsTabProps) {
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Organizations</h3>
        <Button onClick={() => window.location.href = '/create/organization'} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Organization
        </Button>
      </div>
      <div className="grid gap-4">
        {organizations.length > 0 ? (
          organizations.map((org) => <OrganizationItem key={org.id} organization={org} onDelete={onDelete} onEdit={onEdit} />)
        ) : (
          <EmptyState message="No organizations found. Add your first organization!" />
        )}
      </div>
    </div>
  )
}
