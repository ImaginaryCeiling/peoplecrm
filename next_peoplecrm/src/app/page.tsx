"use client"

import HeroSection from "@/components/section/hero-section"
import { FeaturesSection } from "@/components/section/features-section"
import { CtaSection } from "@/components/section/cta-section"
import Footer from "@/components/layout/footer"
import { WhatSection } from "@/components/section/what-section" 

export default function Home() {

  return (
    <main>
      <HeroSection />
      <WhatSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  )
}