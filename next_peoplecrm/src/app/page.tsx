'use client'

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from "@/components/header";
import Splash from "@/components/splash";

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <main className="min-h-screen">
      <Header />
      {isSignedIn ? (
        <div className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to the PeopleCRM!</h1>
            <p className="mb-2">
              This is a simple CRM for keeping track of people you care about.
            </p>
            <p>
              To get started, we&apos;re going to do some basic CRUD work to allow you to add, edit, and delete people.
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p>Welcome {user?.firstName}!</p>
              <p>Email: {user?.emailAddresses[0].emailAddress}</p>
              <p>Username: {user?.username}</p>
              {user?.imageUrl && (
                <img 
                  src={user.imageUrl} 
                  alt={`${user.firstName}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <p>User ID: {user?.id}</p>
            </div>
            <nav className="mt-6 space-y-2">
              <Link 
                href="/create" 
                className="block text-blue-600 hover:text-blue-800"
              >
                Create a Person
              </Link>
              <Link 
                href="/read" 
                className="block text-blue-600 hover:text-blue-800"
              >
                Read People
              </Link>
              <Link 
                href="/update" 
                className="block text-blue-600 hover:text-blue-800"
              >
                Update a Person
              </Link>
              <Link 
                href="/delete" 
                className="block text-blue-600 hover:text-blue-800"
              >
                Delete a Person
              </Link>
            </nav>
          </section>
        </div>
      ) : (
        <Splash />
      )}
    </main>
  );
}