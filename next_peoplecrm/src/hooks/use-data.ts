import { useState, useEffect } from 'react'

// Mock data types
interface Event {
  id: number
  event_name: string
  event_date: string
  event_location?: string
  event_description?: string
  event_organizer?: string
  event_notes?: string
}

interface Person {
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

interface Organization {
  id: number
  organization_name: string
  organization_industry?: string
  organization_location?: string
  organization_website?: string
  organization_contact_email?: string
  organization_notes?: string
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
    event_name: 'Team Meeting',
    event_date: '2024-01-15',
    event_description: 'Weekly team sync',
    event_location: 'Conference Room A'
  },
  {
    id: 2,
    event_name: 'Client Call',
    event_date: '2024-01-16',
    event_description: 'Follow up with client',
    event_organizer: 'John Doe'
  }
]

const mockPeople: Person[] = [
  {
    id: 1,
    person_name: 'John Doe',
    person_email: 'john@example.com',
    person_phone: '+1-555-0123',
    person_notes: 'Met at conference'
  },
  {
    id: 2,
    person_name: 'Jane Smith',
    person_email: 'jane@example.com',
    person_phone: '+1-555-0456',
    person_notes: 'Potential client'
  }
]

const mockOrganizations: Organization[] = [
  {
    id: 1,
    organization_name: 'Tech Corp',
    organization_industry: 'Software',
    organization_website: 'https://techcorp.com',
    organization_contact_email: 'contact@techcorp.com'
  },
  {
    id: 2,
    organization_name: 'Design Studio',
    organization_industry: 'Creative',
    organization_website: 'https://designstudio.com',
    organization_contact_email: 'hello@designstudio.com'
  }
]

export function useData() {
  const [people, setPeople] = useState<Person[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch people
        const peopleResponse = await fetch('/api/people')
        if (peopleResponse.ok) {
          const peopleData = await peopleResponse.json()
          setPeople(peopleData)
        }

        // Fetch organizations
        const organizationsResponse = await fetch('/api/organization')
        if (organizationsResponse.ok) {
          const organizationsData = await organizationsResponse.json()
          setOrganizations(organizationsData)
        }

        // Fetch events
        const eventsResponse = await fetch('/api/event')
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          setEvents(eventsData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { people, organizations, events, loading, error }
}

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
        event_name: event.event_name,
        event_date: event.event_date,
        event_location: event.event_location,
        event_description: event.event_description,
        event_organizer: event.event_organizer
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