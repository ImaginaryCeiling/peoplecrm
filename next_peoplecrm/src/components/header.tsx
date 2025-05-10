import Link from 'next/link'

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4 text-2xl font-bold">
            <Link href="/">PeopleCRM</Link>
        </div>
    )
}