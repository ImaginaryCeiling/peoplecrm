import Link from "next/link";

export default function NavigationMenu() {
  const menuItems = [
    { href: "/create", label: "Create a Person" },
    { href: "/read", label: "Read People" },
    { href: "/update", label: "Update a Person" },
    { href: "/delete", label: "Delete a Person" },
  ];

  return (
    <nav className="mt-6 space-y-2">
      {menuItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className="block text-blue-600 hover:text-blue-800"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 