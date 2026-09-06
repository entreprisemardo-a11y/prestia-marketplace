import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Heart, 
    MessageSquare, 
    Settings, 
    Bell, 
    Search,
    LogOut
} from 'lucide-react';
import { cn } from '@/shared/utils';

export default function ClientLayout() {
    const location = useLocation();

    const navigation = [
        { name: 'Tableau de bord', href: '/client', icon: LayoutDashboard },
        { name: 'Mes Achats', href: '/client/purchases', icon: ShoppingBag },
        { name: 'Favoris', href: '/client/favorites', icon: Heart },
        { name: 'Messages', href: '/client/messages', icon: MessageSquare },
        { name: 'Paramètres', href: '/client/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* SIDEBAR (Desktop) */}
            <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                    <Link to="/" className="text-xl font-bold tracking-tight text-white">
                        Prestia<span className="text-brand-500">.</span>Client
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                                        isActive 
                                            ? "bg-brand-600 text-white" 
                                            : "hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <item.icon 
                                        className={cn(
                                            "flex-shrink-0 h-5 w-5 mr-3 transition-colors",
                                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                                        )} 
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-slate-800 hover:text-red-300 transition-colors">
                        <LogOut className="flex-shrink-0 h-5 w-5 mr-3" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* HEADER */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex-1 flex">
                        <form className="w-full max-w-md relative flex items-center" action="#" method="GET">
                            <Search className="absolute left-3 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                name="search"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                                placeholder="Rechercher un service, un prestataire..."
                            />
                        </form>
                    </div>

                    <div className="ml-4 flex items-center gap-4">
                        <Link to="/services" className="hidden sm:block text-sm font-medium text-brand-600 hover:text-brand-700">
                            Nouveau service
                        </Link>
                        
                        <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
                            <Bell className="h-6 w-6" />
                        </button>
                        
                        <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shadow-sm cursor-pointer">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none bg-slate-50/50">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
