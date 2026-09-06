import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ListOrdered, 
    MessageSquare, 
    Wallet, 
    Settings, 
    Bell, 
    Search,
    LogOut
} from 'lucide-react';
import { cn } from '@/shared/utils';

export default function DashboardLayout() {
    const location = useLocation();

    const navigation = [
        { name: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Mes Commandes', href: '/dashboard/orders', icon: ListOrdered },
        { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
        { name: 'Portefeuille', href: '/dashboard/wallet', icon: Wallet },
        { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* SIDEBAR (Desktop) */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-200">
                    <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Prestia<span className="text-brand-600">.</span>Pro
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
                                            ? "bg-brand-50 text-brand-700" 
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <item.icon 
                                        className={cn(
                                            "flex-shrink-0 h-5 w-5 mr-3 transition-colors",
                                            isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                                        )} 
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-200">
                    <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <LogOut className="flex-shrink-0 h-5 w-5 mr-3 text-red-500" />
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
                                id="search"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                                placeholder="Rechercher une commande, un client..."
                            />
                        </form>
                    </div>

                    <div className="ml-4 flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            <Bell className="h-6 w-6" />
                        </button>
                        
                        <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shadow-sm cursor-pointer">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="h-full w-full object-cover" />
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
