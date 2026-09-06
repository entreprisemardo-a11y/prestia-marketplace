import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare, Star } from 'lucide-react';

const purchases = Array.from({ length: 8 }).map((_, i) => ({
    id: `CMD-2026-${1000 + i}`,
    provider: ['Amadou B.', 'Sarah K.', 'Entreprise XYZ', 'Fatou N.'][i % 4],
    service: ['Installation Climatisation', 'Dépannage Électrique', 'Câblage Réseau', 'Maintenance Plomberie'][i % 4],
    date: `0${(i % 9) + 1}/08/2026`,
    amount: [45000, 15000, 150000, 25000][i % 4],
    status: ['Terminé', 'En cours', 'En attente', 'Annulé'][i % 4]
}));

export default function ClientPurchases() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes Achats</h1>
                    <p className="text-sm text-slate-500 mt-1">Historique de vos commandes et prestations.</p>
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
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Filter className="h-4 w-4" /> Filtrer
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Commande</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Prestataire</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {purchases.map((purchase) => (
                                <tr key={purchase.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{purchase.id}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-slate-700">{purchase.provider}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600">{purchase.service}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{purchase.date}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{purchase.amount.toLocaleString('fr-FR')} FCFA</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                            ${purchase.status === 'Terminé' ? 'bg-green-100 text-green-700' : 
                                              purchase.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                                              purchase.status === 'En attente' ? 'bg-amber-100 text-amber-700' :
                                              'bg-slate-100 text-slate-600'}
                                        `}>
                                            {purchase.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-2">
                                        <button className="text-slate-400 hover:text-brand-600 transition-colors p-1.5 rounded-md hover:bg-brand-50" title="Message">
                                            <MessageSquare className="h-4 w-4" />
                                        </button>
                                        {purchase.status === 'Terminé' && (
                                            <button className="text-amber-400 hover:text-amber-500 transition-colors p-1.5 rounded-md hover:bg-amber-50" title="Évaluer">
                                                <Star className="h-4 w-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
