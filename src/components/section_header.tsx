export default function SectionHeader({ title }: { title: string }) {
    return (
        <header className="mb-12">
            <h1 className="text-4xl font-serif text-center mb-2">{title}</h1>
            <div className="w-12 h-0.5 bg-primary mx-auto"></div>
        </header>
    )
}