import { useUser } from "@clerk/nextjs";

interface ProfileSectionProps {
  user: NonNullable<ReturnType<typeof useUser>['user']>;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="space-y-2">
        <p>Welcome {user?.firstName}!</p>
        <p>Email: {user?.emailAddresses[0].emailAddress}</p>
        <p>Username: {user?.username}</p>
        {user?.imageUrl && (
          <img 
            src={user.imageUrl} 
            alt={`${user.firstName}'s profile`}
            className="w-8 h-8 rounded-full"
          />
        )}
        <p>User ID: {user?.id}</p>
      </div>
    </>
  );
} 