import { useState, useEffect } from 'react'

// Mock data types
interface Event {
  id: number
  eventName: string
  eventDate: string
  eventDescription?: string
  eventLocation?: string
  eventOrganizer?: string
}

interface Person {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  organization_id?: number | null
  notes?: string
}

interface Organization {
  id: number
  name: string
  industry?: string
  location?: string
  website?: string
  contact_email?: string
  notes?: string
  employee_count?: number
}

interface DatabaseEvent {
  id: number;
  event_name: string;
  event_date: string;
  event_location?: string;
  event_description?: string;
  event_organizer?: string;
}

// Mock data
const mockEvents: Event[] = [
  {
    id: 1,
    eventName: 'Team Meeting',
    eventDate: '2024-01-15',
    eventDescription: 'Weekly team sync',
    eventLocation: 'Conference Room A'
  },
  {
    id: 2,
    eventName: 'Client Call',
    eventDate: '2024-01-16',
    eventDescription: 'Follow up with client',
    eventOrganizer: 'John Doe'
  }
]

const mockPeople: Person[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    notes: 'Met at conference'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0456',
    notes: 'Potential client'
  }
]

const mockOrganizations: Organization[] = [
  {
    id: 1,
    name: 'Tech Corp',
    industry: 'Software',
    website: 'https://techcorp.com',
    contact_email: 'contact@techcorp.com'
  },
  {
    id: 2,
    name: 'Design Studio',
    industry: 'Creative',
    website: 'https://designstudio.com',
    contact_email: 'hello@designstudio.com'
  }
]

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/event')
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      // Transform database fields to match UI interface
      const transformedEvents = data.map((event: DatabaseEvent) => ({
        id: event.id,
        eventName: event.event_name,
        eventDate: event.event_date,
        eventLocation: event.event_location,
        eventDescription: event.event_description,
        eventOrganizer: event.event_organizer
      }))
      setEvents(transformedEvents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const deleteEvent = async (id: number) => {
    try {
      setError(null)
      const response = await fetch('/api/event', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete event')
      }
      
      setEvents(events.filter(event => event.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event')
    }
  }

  return { events, loading, error, deleteEvent, refetch: fetchEvents }
}

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPeople = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/people')
      if (!response.ok) {
        throw new Error('Failed to fetch people')
      }
      const data = await response.json()
      setPeople(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch people')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const deletePerson = async (id: number) => {
    try {
      setError(null)
      const response = await fetch('/api/people', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete person')
      }
      
      setPeople(people.filter(person => person.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete person')
    }
  }

  return { people, loading, error, deletePerson, refetch: fetchPeople }
}

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrganizations = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/organization')
      if (!response.ok) {
        throw new Error('Failed to fetch organizations')
      }
      const data = await response.json()
      setOrganizations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const deleteOrganization = async (id: number) => {
    try {
      setError(null)
      const response = await fetch('/api/organization', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete organization')
      }
      
      setOrganizations(organizations.filter(org => org.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete organization')
    }
  }

  return { organizations, loading, error, deleteOrganization, refetch: fetchOrganizations }
} 