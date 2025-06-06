'use client'

import { useUser } from "@clerk/nextjs";
import Header from "@/components/header";

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <div>
      <Header />
      <div>
      <h1>Welcome to the PeopleCRM!</h1>
      <p>
        This is a simple CRM for keeping track of people you care about.
      </p>
      <p>
        To get started, we&apos;re going to do some basic CRUD work to allow you to add, edit, and delete people.
      </p>
      <p>For my reviewers - still a work in progress! This is very basic CRUD functionality so far - exams are almost finished for me and then work will start for real. checkout <a href="https://arnavchauhan.com/blog/peoplecrm">the blog post</a> for more details about what this is supposed to be.</p>
      </div>
      {isSignedIn ? (
        // what shows when user is signed in
      <div className="flex flex-col gap-4 space-y-4 mt-4">
        <p>Welcome {user?.firstName}!</p>
        <a href="/create">Create a Person</a>
        <a href="/read">Read People</a>
        <a href="/update">Update a Person</a>
        <a href="/delete">Delete a Person</a>
      </div>
      ) : (
        // what shows when user is not signed in
        <div>
          <p>Hi! Please sign in to continue</p>
        </div>
      )}
    </div>
  );
}
