"use client"

import Header from "@/components/header"
import { WelcomeSection } from "@/components/welcome-section"
import { ProfileSection } from "@/components/profile-section"
import { MainTabs } from "@/components/main-tabs"
import type { Event } from "@/components/events/event-item"
import type { Person } from "@/components/people/people-item"
import type { Organization } from "@/components/organizations/organization-item"

type Editable = Event | Person | Organization;

export default function Dashboard() {
  const handleAddNew = (type: string) => {
    // Placeholder for add functionality - will be implemented with forms later
    console.log(`Add new ${type}`)
  }

  const handleEdit = (type: string, item: Editable) => {
    // Navigate to edit page based on type
    switch (type) {
      case 'person':
        window.location.href = `/edit/person?id=${item.id}`;
        break;
      case 'event':
        window.location.href = `/edit/event?id=${item.id}`;
        break;
      case 'organization':
        window.location.href = `/edit/organization?id=${item.id}`;
        break;
      default:
        console.log(`Edit ${type}:`, item);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <ProfileSection />
        <MainTabs onAddNew={handleAddNew} onEdit={handleEdit} />
      </div>
    </div>
  )
}
