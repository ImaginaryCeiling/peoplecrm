import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export function WhatSection() {
  return (
    <Section>
      <Container size="md">
        <div className="flex row-auto">
            <h3 className="text-4xl sm:text-5xl font-bold">What is <span className="text-orange-500">Kokoro</span>?</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Kokoro (心) is a Japanese word for “heart” — the center of feeling, connection, and care. In a world where it's easy to lose touch, Kokoro helps you stay meaningfully connected to the people who matter. Inspired by moments of meeting amazing people and forgetting to follow up, it’s designed to help you invest in relationships with intention.</p>
        </div>
      </Container>
    </Section>
  )
}