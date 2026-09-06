import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Download } from 'lucide-react';

const orders = Array.from({ length: 12 }).map((_, i) => ({
    id: `CMD-2026-${1000 + i}`,
    client: ['Amadou B.', 'Sarah K.', 'Entreprise XYZ', 'Fatou N.', 'Jean P.', 'Marie D.'][i % 6],
    service: ['Installation Climatisation', 'Dépannage Électrique', 'Câblage Réseau', 'Maintenance Plomberie', 'Peinture Intérieure'][i % 5],
    date: `0${(i % 9) + 1}/08/2026`,
    amount: [45000, 15000, 150000, 25000, 80000][i % 5],
    status: ['Terminé', 'En cours', 'En attente', 'Annulé'][i % 4]
}));

export default function Orders() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes Commandes</h1>
                    <p className="text-sm text-slate-500 mt-1">Gérez l'historique et le statut de vos prestations.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
                        <Download className="h-4 w-4" /> Exporter CSV
                    </button>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
                {/* TOOLBAR */}
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher une commande..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-shadow"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Filter className="h-4 w-4" /> Filtrer
                        </button>
                        <select className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none">
                            <option>Tous les statuts</option>
                            <option>Terminé</option>
                            <option>En cours</option>
                            <option>En attente</option>
                        </select>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Commande</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order, i) => (
                                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{order.id}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-slate-700">{order.client}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600">{order.service}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{order.date}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{order.amount.toLocaleString('fr-FR')} FCFA</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                            ${order.status === 'Terminé' ? 'bg-green-100 text-green-700' : 
                                              order.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                                              order.status === 'En attente' ? 'bg-amber-100 text-amber-700' :
                                              'bg-slate-100 text-slate-600'}
                                        `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-slate-400 hover:text-brand-600 transition-colors p-1 rounded-md hover:bg-brand-50">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white">
                    <span className="text-sm text-slate-500">Affichage de 1 à 12 sur 45 commandes</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Précédent</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">Suivant</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
