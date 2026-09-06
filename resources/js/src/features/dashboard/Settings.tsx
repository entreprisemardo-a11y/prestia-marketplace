import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Building, Globe, Camera } from 'lucide-react';

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Paramètres</h1>
                <p className="text-sm text-slate-500 mt-1">Gérez votre profil professionnel et vos préférences.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                
                {/* Settings Navigation */}
                <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50/50 p-4 space-y-1">
                    {[
                        { id: 'profile', name: 'Profil Public', icon: User, active: true },
                        { id: 'security', name: 'Sécurité', icon: Lock, active: false },
                        { id: 'notifications', name: 'Notifications', icon: Bell, active: false },
                        { id: 'business', name: 'Entreprise', icon: Building, active: false },
                    ].map((item) => (
                        <button key={item.id} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                            ${item.active ? 'bg-white shadow-sm border border-slate-200 text-brand-600' : 'text-slate-600 hover:bg-slate-100'}
                        `}>
                            <item.icon className={`h-4 w-4 ${item.active ? 'text-brand-600' : 'text-slate-400'}`} />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6 md:p-8">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Informations du Profil</h2>
                        
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md" />
                                <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full hover:bg-brand-600 transition-colors shadow-sm">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Photo de profil</h3>
                                <p className="text-xs text-slate-500 mt-1 mb-3">JPG, GIF ou PNG. 2MB max.</p>
                                <button className="text-sm font-semibold text-red-600 hover:text-red-700">Supprimer la photo</button>
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Prénom</label>
                                    <input type="text" defaultValue="Kouassi" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nom</label>
                                    <input type="text" defaultValue="Dev" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Titre professionnel</label>
                                <input type="text" defaultValue="Architecte Logiciel Senior" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Bio (Description public)</label>
                                <textarea rows={4} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none" defaultValue="Expert en développement d'applications web et mobiles avec plus de 8 ans d'expérience. Je garantis un travail de qualité et dans les délais."></textarea>
                            </div>

                            <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                                <button type="button" className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors">
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
