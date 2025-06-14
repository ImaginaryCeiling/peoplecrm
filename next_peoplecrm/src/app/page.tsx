"use client"


import Header from "@/components/header"
import LandingPage from "@/components/landingpage"
import { FeaturesSection } from "@/components/section/features-section"
import { CtaSection } from "@/components/section/cta-section"
import Footer from "@/components/layout/footer"

export default function Home() {

  return (
    <main>
      <LandingPage />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  )
}