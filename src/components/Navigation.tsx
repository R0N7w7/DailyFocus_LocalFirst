import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Navigation() {
    const items = [
        { to: '/', label: 'Home' },
        { to: '/features', label: 'Features' },
        { to: '/about', label: 'About' },
    ]

    return (
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 shadow-sm">
            <nav className="container mx-auto flex flex-wrap items-center justify-between gap-2">
                <Link to="/" className="flex items-center gap-3 text-xl font-extrabold hover:opacity-90 transition-opacity shrink-0">
                    <span className="bg-white/10 px-2 py-1 rounded">Daily</span>
                    <span className="text-primary-300">Focus</span>
                </Link>

                <div className="flex items-center gap-2">
                    {items.map((i) => (
                        <NavLink key={i.to} to={i.to} className={({ isActive }) =>
                            `inline-block rounded-md ${isActive ? 'bg-white/10' : ''}`
                        }>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'secondary' : 'ghost'} className={isActive ? 'text-white' : 'text-white/90'}>
                                    {i.label}
                                </Button>
                            )}
                        </NavLink>
                    ))}

                    <Button variant="outline" className="ml-2 hidden md:inline-block">New Task</Button>
                </div>
            </nav>
        </header>
    );
}