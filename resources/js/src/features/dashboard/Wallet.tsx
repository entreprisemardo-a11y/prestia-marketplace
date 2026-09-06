import React from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, History, Building2, CreditCard } from 'lucide-react';

export default function Wallet() {
    const transactions = [
        { id: 'TRX-982', type: 'Paiement reçu', desc: 'Commande #CMD-001', amount: '+45 000 FCFA', date: 'Aujourd\'hui', status: 'Complété', isCredit: true },
        { id: 'TRX-981', type: 'Retrait', desc: 'Vers compte bancaire', amount: '-150 000 FCFA', date: '01 Août 2026', status: 'En cours', isCredit: false },
        { id: 'TRX-980', type: 'Paiement reçu', desc: 'Commande #CMD-004', amount: '+25 000 FCFA', date: '31 Juil 2026', status: 'Complété', isCredit: true },
        { id: 'TRX-979', type: 'Frais de service', desc: 'Commission PRESTIA (5%)', amount: '-1 250 FCFA', date: '31 Juil 2026', status: 'Complété', isCredit: false },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mon Portefeuille</h1>
                    <p className="text-sm text-slate-500 mt-1">Gérez vos revenus et effectuez des retraits.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <WalletIcon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-400 font-medium mb-1">Solde disponible</p>
                        <h2 className="text-5xl font-black mb-8 tracking-tight">234 500 <span className="text-2xl text-slate-400 font-bold">FCFA</span></h2>
                        
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors flex items-center gap-2">
                                <ArrowUpRight className="h-5 w-5" /> Retirer des fonds
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-xl transition-colors">
                                Historique complet
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col"
                >
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Moyen de retrait</h3>
                    
                    <div className="flex-1 space-y-4">
                        <div className="p-4 border-2 border-brand-500 bg-brand-50 rounded-xl relative">
                            <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-4 border-brand-500 bg-white"></div>
                            <div className="flex items-center gap-3 mb-2">
                                <Building2 className="text-brand-600 h-6 w-6" />
                                <span className="font-bold text-slate-900">Ecobank Bénin</span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 tracking-widest">BJ06 1234 **** **** 89</p>
                        </div>

                        <button className="w-full p-4 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-400 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                            <CreditCard className="h-4 w-4" /> Ajouter un compte
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Transactions */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <History className="h-5 w-5 text-slate-400" /> Transactions récentes
                    </h3>
                    <button className="text-sm font-bold text-brand-600 hover:text-brand-700">Filtrer</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {transactions.map((trx, i) => (
                        <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.isCredit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {trx.isCredit ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{trx.type}</p>
                                    <p className="text-xs font-medium text-slate-500">{trx.desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-black text-sm ${trx.isCredit ? 'text-green-600' : 'text-slate-900'}`}>{trx.amount}</p>
                                <div className="flex items-center justify-end gap-2 mt-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{trx.date}</span>
                                    <span className={`w-2 h-2 rounded-full ${trx.status === 'Complété' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
