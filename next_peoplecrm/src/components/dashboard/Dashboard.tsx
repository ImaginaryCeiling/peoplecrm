import { useUser } from "@clerk/nextjs";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import ProfileSection from "@/components/dashboard/ProfileSection";
import NavigationMenu from "@/components/dashboard/NavigationMenu";

interface DashboardProps {
  user: NonNullable<ReturnType<typeof useUser>['user']>;
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeSection />
      <section className="flex flex-col gap-4">
        <ProfileSection user={user} />
        <NavigationMenu />
      </section>
    </div>
  );
} 