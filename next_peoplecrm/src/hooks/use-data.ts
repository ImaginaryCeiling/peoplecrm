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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 500)
  }, [])

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
  }

  return { events, loading, error, deleteEvent }
}

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPeople(mockPeople)
      setLoading(false)
    }, 500)
  }, [])

  const deletePerson = (id: number) => {
    setPeople(people.filter(person => person.id !== id))
  }

  return { people, loading, error, deletePerson }
}

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrganizations(mockOrganizations)
      setLoading(false)
    }, 500)
  }, [])

  const deleteOrganization = (id: number) => {
    setOrganizations(organizations.filter(org => org.id !== id))
  }

  return { organizations, loading, error, deleteOrganization }
} 