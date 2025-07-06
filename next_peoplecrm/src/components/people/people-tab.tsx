"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PersonItem, Person } from "./people-item"
import { EmptyState } from "../empty-state"
import { LoadingSpinner } from "../loader-spinner"
import { ErrorMessage } from "../error-message"

interface PeopleTabProps {
  people: Person[]
  loading: boolean
  error: string | null
  onDelete: (id: number) => void
  onAddNew: () => void
  onEdit: (person: Person) => void
}

export function PeopleTab({ people, loading, error, onDelete, onAddNew, onEdit }: PeopleTabProps) {
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">People</h3>
        <Button onClick={() => window.location.href = '/create/person'} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Person
        </Button>
      </div>
      <div className="grid gap-4">
        {people.length > 0 ? (
          people.map((person) => <PersonItem key={person.id} person={person} onDelete={onDelete} onEdit={onEdit} />)
        ) : (
          <EmptyState message="No people found. Add your first contact!" />
        )}
      </div>
    </div>
  )
}
