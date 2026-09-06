import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Star, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientOverview() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bonjour, Alex</h1>
                    <p className="text-sm text-slate-500 mt-1">Voici le récapitulatif de vos activités sur PRESTIA.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link to="/services" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
                        Trouver un prestataire
                    </Link>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Commandes en cours", value: "2", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Commandes terminées", value: "14", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                    { title: "Prestataires favoris", value: "5", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
                    { title: "Dépenses totales", value: "450k", icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500">{stat.title}</h3>
                            <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ACTIVE ORDERS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Interventions à venir</h2>
                        <Link to="/client/purchases" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                            Voir tout <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { id: '#CMD-2026-1011', service: 'Installation Climatisation', provider: 'Amadou B.', date: 'Demain, 09:00', status: 'Confirmé' },
                            { id: '#CMD-2026-1012', service: 'Réparation Fuite Eau', provider: 'Fatou N.', date: '14 Août 2026', status: 'En attente' },
                        ].map((order, i) => (
                            <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-6 w-6 text-brand-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{order.service}</h4>
                                        <p className="text-sm text-slate-500">Prestataire : <span className="font-medium text-slate-700">{order.provider}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:items-end gap-2">
                                    <span className="text-sm font-bold text-slate-700">{order.date}</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                                        ${order.status === 'Confirmé' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SUGGESTIONS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                >
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Recommandé pour vous</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Ménage à domicile', price: 'À partir de 5000F' },
                            { name: 'Menuiserie', price: 'Devis sur mesure' },
                            { name: 'Peinture', price: 'À partir de 15000F' },
                        ].map((suggestion, i) => (
                            <div key={i} className="group p-4 border border-slate-100 rounded-xl hover:border-brand-500 hover:shadow-md cursor-pointer transition-all">
                                <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{suggestion.name}</h4>
                                <p className="text-xs text-slate-500 font-medium mt-1">{suggestion.price}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
