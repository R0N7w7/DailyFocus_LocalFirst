import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-neutral-100">
            <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full  blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full blur-3xl" />

            <main className="relative z-10 grow container mx-auto p-4 md:p-8">
                <div className="mx-auto max-w-4xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}