import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, User, ShoppingBag } from 'lucide-react'; // Icônes Premium

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
            {/* Navbar Premium */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-6 w-6 text-brand-600" />
                        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                            Prestia
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link to="/services" className="text-slate-600 hover:text-brand-600 transition-colors">Explorer</Link>
                        <Link to="/categories" className="text-slate-600 hover:text-brand-600 transition-colors">Catégories</Link>
                        <Link to="/how-it-works" className="text-slate-600 hover:text-brand-600 transition-colors">Comment ça marche</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                            <User className="h-4 w-4" />
                            Connexion
                        </Link>
                        <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md">
                            Devenir Prestataire
                        </Link>
                        <button className="md:hidden p-2 text-slate-600">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenu dynamique de la page (Sans container pour permettre le Full-Width) */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {/* Footer Minimaliste */}
            <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
                <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Prestia. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
