import React from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    Users, 
    CreditCard, 
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const revenueData = [
    { name: 'Lun', total: 15000 },
    { name: 'Mar', total: 25000 },
    { name: 'Mer', total: 18000 },
    { name: 'Jeu', total: 45000 },
    { name: 'Ven', total: 32000 },
    { name: 'Sam', total: 60000 },
    { name: 'Dim', total: 55000 },
];

const recentOrders = [
    { id: '#CMD-001', client: 'Amadou B.', service: 'Installation Climatisation', amount: '45 000 FCFA', status: 'Terminé', date: 'Aujourd\'hui, 14:30' },
    { id: '#CMD-002', client: 'Sarah K.', service: 'Dépannage Électrique', amount: '15 000 FCFA', status: 'En cours', date: 'Aujourd\'hui, 10:15' },
    { id: '#CMD-003', client: 'Entreprise XYZ', service: 'Câblage Réseau', amount: '150 000 FCFA', status: 'En attente', date: 'Hier, 16:45' },
    { id: '#CMD-004', client: 'Fatou N.', service: 'Maintenance Plomberie', amount: '25 000 FCFA', status: 'Terminé', date: 'Hier, 09:20' },
];

export default function Overview() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vue d'ensemble</h1>
                    <p className="text-sm text-slate-500 mt-1">Suivez vos performances et vos revenus en temps réel.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
                        Retirer des fonds
                    </button>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Chiffre d'affaires", value: "345 000 FCFA", change: "+12.5%", trend: "up", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Commandes du mois", value: "24", change: "+4.2%", trend: "up", icon: CheckCircle2, color: "text-brand-600", bg: "bg-brand-50" },
                    { title: "Nouveaux Clients", value: "12", change: "-2.4%", trend: "down", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
                    { title: "Taux de conversion", value: "48.2%", change: "+1.2%", trend: "up", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-slate-500">{stat.title}</h3>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                            <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CHART & RECENT ORDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* CHART */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Revenus de la semaine</h2>
                        <select className="text-sm border-slate-200 rounded-lg text-slate-600 font-medium py-1.5 pl-3 pr-8">
                            <option>Cette semaine</option>
                            <option>Mois dernier</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `${value / 1000}k`} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number) => [`${value} FCFA`, 'Revenu']}
                                />
                                <Area type="monotone" dataKey="total" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* RECENT ORDERS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Activité récente</h2>
                        <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">Tout voir</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {recentOrders.map((order, i) => (
                            <div key={i} className="flex flex-col p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-slate-900 text-sm">{order.client}</span>
                                    <span className="font-bold text-slate-900 text-sm">{order.amount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500 line-clamp-1">{order.service}</span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-xs text-slate-400 font-medium">{order.date}</span>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider
                                        ${order.status === 'Terminé' ? 'bg-green-100 text-green-700' : 
                                          order.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                                          'bg-amber-100 text-amber-700'}
                                    `}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
