
import Header from "@/components/header";
export default function Home() {
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
      </div>
      <div className="flex flex-col gap-4 space-y-4 mt-4">
        <a href="/create">Create a Person</a>
        <a href="/read">Read People</a>
        <a href="/update">Update a Person</a>
        <a href="/delete">Delete a Person</a>
      </div>
    </div>
  );
}
