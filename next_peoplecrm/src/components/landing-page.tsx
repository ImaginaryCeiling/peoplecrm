"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { ArrowRight, Heart, Users, Calendar, Bell, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Heart className="h-6 w-6 text-rose-500" />
          <span>PeopleCRM</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
        </nav>
        <div className="ml-4">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Never forget the people who matter most
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    PeopleCRM helps you keep track of the important people in your life, remember key details, and
                    nurture your relationships.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <SignUpButton mode="modal">
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignUpButton>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="PeopleCRM Dashboard Preview"
                  className="rounded-lg object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features designed for meaningful connections
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to maintain and strengthen your personal relationships.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-rose-100 p-3">
                  <Users className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Contact Management</h3>
                <p className="text-center text-gray-500">
                  Store all important details about the people in your life in one organized place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-rose-100 p-3">
                  <Calendar className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Important Dates</h3>
                <p className="text-center text-gray-500">
                  Never miss a birthday, anniversary, or other special occasion with timely reminders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-rose-100 p-3">
                  <Bell className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Interaction Reminders</h3>
                <p className="text-center text-gray-500">
                  Get gentle nudges to check in with people you haven't connected with in a while.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How PeopleCRM works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple process to strengthen your relationships.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">1</div>
                <h3 className="text-xl font-bold">Add your contacts</h3>
                <p className="text-center text-gray-500">
                  Import or manually add the people who matter most to you with all their important details.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">2</div>
                <h3 className="text-xl font-bold">Set up reminders</h3>
                <p className="text-center text-gray-500">
                  Configure how often you want to be reminded to check in with each person in your network.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">3</div>
                <h3 className="text-xl font-bold">Nurture relationships</h3>
                <p className="text-center text-gray-500">
                  Receive timely notifications and log your interactions to maintain strong connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our users say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  PeopleCRM has helped thousands strengthen their personal connections.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div>
                  <p className="mb-4 italic text-gray-500">
                    "PeopleCRM has transformed how I maintain relationships. I never forget a birthday or important
                    event anymore, and my friends notice the difference."
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Freelance Designer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div>
                  <p className="mb-4 italic text-gray-500">
                    "As someone who struggles with remembering details, this app has been a lifesaver. My relationships
                    have improved because I can recall important information about the people I care about."
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to strengthen your relationships?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are nurturing their personal connections with PeopleCRM.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                    Get Started for Free
                  </Button>
                </SignUpButton>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <CheckCircle className="h-5 w-5 text-rose-500" />
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2 font-semibold">
          <Heart className="h-5 w-5 text-rose-500" />
          <span>PeopleCRM</span>
        </div>
        <p className="text-xs text-gray-500 sm:ml-4">
          &copy; {new Date().getFullYear()} PeopleCRM. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
