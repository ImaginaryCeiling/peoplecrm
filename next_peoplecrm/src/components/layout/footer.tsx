import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
    {href: "/", label: "Home"},
    { href: "/terms", label: "Terms" },
    { href: "/support", label: "Support" },
]

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 px-6 bg-black">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-2xl font-bold">
                        <span className="text-orange-500">Kokoro</span>
                    </div>
                    
                    <nav className="flex items-center space-x-8 text-gray-400">
                        {footerLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                            {link.label}
                            </Link>
                        ))} 
                    </nav>

                    <div className="text-gray-400">
                        © {new Date().getFullYear()} Kokoro. All rights reserved.
                    </div>
                </div>
            </Container>
        </footer>
    )
}