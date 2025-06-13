'use client'

import { useUser } from "@clerk/nextjs";
import Header from "@/components/header";
import Splash from "@/components/splash";

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="">
      {isSignedIn ? (
        <div className="">
          <div>
            <h1>Welcome to the PeopleCRM!</h1>
            <p>
              This is a simple CRM for keeping track of people you care about.
            </p>
            <p>
              To get started, we&apos;re going to do some basic CRUD work to allow you to add, edit, and delete people.
            </p>
          </div>
          <div className="flex flex-col gap-4 space-y-4 mt-4">
            <p>Welcome {user?.firstName}!</p>
            <p>Here's your email: {user?.emailAddresses[0].emailAddress}</p>
            <p>Here's your username: {user?.username}</p>
            <p>Here's your image: {user?.imageUrl}</p>
            <p>Here's your clerk id: {user?.id}</p>
            <a href="/create">Create a Person</a>
            <a href="/read">Read People</a>
            <a href="/update">Update a Person</a>
            <a href="/delete">Delete a Person</a>
          </div>
        </div>
      ) : (
        <Splash />
      )}
    </div>
  );
}
