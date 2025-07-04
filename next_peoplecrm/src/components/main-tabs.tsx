"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Building2 } from "lucide-react"
import { EventsTab } from "./events/event-tab"
import { PeopleTab } from "./people/people-tab"
import { OrganizationsTab } from "./organizations/organization-tab"
import { useEvents, usePeople, useOrganizations } from "@/hooks/use-data"

interface EditableItem {
  id: number;
}

interface MainTabsProps {
  onAddNew: (type: string) => void
  onEdit: (type: string, item: EditableItem) => void
}

export function MainTabs({ onAddNew, onEdit }: MainTabsProps) {
  const { events, loading: eventsLoading, error: eventsError, deleteEvent } = useEvents()
  const { people, loading: peopleLoading, error: peopleError, deletePerson } = usePeople()
  const { organizations, loading: orgsLoading, error: orgsError, deleteOrganization } = useOrganizations()

  return (
    <Tabs defaultValue="events" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="events" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Events
        </TabsTrigger>
        <TabsTrigger value="people" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          People
        </TabsTrigger>
        <TabsTrigger value="organizations" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Organizations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="events">
        <EventsTab
          events={events}
          loading={eventsLoading}
          error={eventsError}
          onDelete={deleteEvent}
          onAddNew={() => onAddNew("event")}
          onEdit={(event) => onEdit("event", event)}
        />
      </TabsContent>

      <TabsContent value="people">
        <PeopleTab
          people={people}
          loading={peopleLoading}
          error={peopleError}
          onDelete={deletePerson}
          onAddNew={() => onAddNew("person")}
          onEdit={(person) => onEdit("person", person)}
        />
      </TabsContent>

      <TabsContent value="organizations">
        <OrganizationsTab
          organizations={organizations}
          loading={orgsLoading}
          error={orgsError}
          onDelete={deleteOrganization}
          onAddNew={() => onAddNew("organization")}
          onEdit={(organization) => onEdit("organization", organization)}
        />
      </TabsContent>
    </Tabs>
  )
}
