"use client"

import Header from "@/components/header"
import { WelcomeSection } from "@/components/welcome-section"
import { ProfileSection } from "@/components/profile-section"
import { MainTabs } from "@/components/main-tabs"

export default function Dashboard() {
  const handleAddNew = (type: string) => {
    // Placeholder for add functionality - will be implemented with forms later
    console.log(`Add new ${type}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <ProfileSection />
        <MainTabs onAddNew={handleAddNew} />
      </div>
    </div>
  )
}
