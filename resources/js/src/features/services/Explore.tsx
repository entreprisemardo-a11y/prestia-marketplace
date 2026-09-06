import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ShieldCheck, Heart, Filter, ChevronDown, Clock, Search } from 'lucide-react';
import { cn } from '@/shared/utils';

export default function Explore() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Fausses données pour simuler l'API
    const services = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        title: ['Installation Climatiseur Split', 'Création Site E-commerce', 'Dépannage Plomberie Urgence', 'Rénovation Salle de Bain'][i % 4],
        category: ['Climatisation', 'Web Design', 'Plomberie', 'Bâtiment'][i % 4],
        provider: ['Kouassi Dev', 'Brico Fast', 'Studio Pixel', 'Climafrique'][i % 4],
        price: [45000, 150000, 25000, 500000][i % 4],
        rating: 4.8 + (i % 3) * 0.1,
        reviews: 42 + i * 13,
        distance: 1.2 + i * 0.8,
        responseTime: '< 1h',
        isPro: i % 2 === 0,
        img: `https://images.unsplash.com/photo-${[
            '1581092160562-40aa08e78837',
            '1621905252507-b35492d90fcb',
            '1584622650111-993a426fbf0a',
            '1505798577917-9861616c35c6'
        ][i % 4]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
    }));

    return (
        <div className="w-full min-h-screen bg-slate-50">
            {/* EN-TÊTE DE RECHERCHE */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full max-w-2xl flex bg-slate-100 rounded-full p-1 border border-slate-200">
                        <div className="flex-1 flex items-center px-4 bg-white rounded-full shadow-sm">
                            <Search className="h-4 w-4 text-slate-400 mr-2" />
                            <input type="text" placeholder="Quel service recherchez-vous ?" className="w-full py-2.5 outline-none text-sm font-medium bg-transparent" />
                        </div>
                        <div className="flex-1 flex items-center px-4">
                            <MapPin className="h-4 w-4 text-brand-500 mr-2" />
                            <input type="text" placeholder="Où ?" className="w-full py-2.5 outline-none text-sm font-medium bg-transparent" />
                        </div>
                        <button className="bg-slate-900 text-white rounded-full px-6 py-2.5 font-bold text-sm hover:bg-brand-600 transition-colors">
                            Rechercher
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                            <Filter className="h-4 w-4" /> Filtres
                        </button>
                        <select className="px-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors">
                            <option>Pertinence</option>
                            <option>Prix croissant</option>
                            <option>Les mieux notés</option>
                            <option>Distance</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex gap-8">
                {/* SIDEBAR FILTRES (Desktop) */}
                <aside className={cn("w-64 flex-shrink-0 hidden lg:block", isFilterOpen ? "block" : "hidden lg:block")}>
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-40 space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4">Catégories</h3>
                            <div className="space-y-3">
                                {['Plomberie', 'Électricité', 'Informatique', 'Ménage', 'Jardinage'].map((cat, i) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-brand-500 flex items-center justify-center transition-colors"></div>
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="font-bold text-slate-900 mb-4">Distance Max</h3>
                            <input type="range" className="w-full accent-brand-600" min="1" max="50" defaultValue="15" />
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
                                <span>1 km</span>
                                <span>15 km</span>
                                <span>50 km</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-10 h-6 bg-slate-200 rounded-full relative transition-colors group-hover:bg-slate-300">
                                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                                </div>
                                <span className="text-sm font-bold text-slate-700">Profils PRO uniquement</span>
                            </label>
                        </div>
                    </div>
                </aside>

                {/* GRILLE DE RÉSULTATS */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-2xl font-extrabold text-slate-900">Plus de 200 services trouvés</h1>
                        <p className="text-sm text-slate-500 font-medium">Autour de votre position</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={service.id} 
                                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Photo Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white text-slate-700 hover:text-red-500 transition-colors">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                    {service.isPro && (
                                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <ShieldCheck className="h-3.5 w-3.5 text-brand-400" /> PRO
                                        </div>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{service.category}</span>
                                        <div className="flex items-center gap-1 font-bold text-sm text-slate-900">
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            {service.rating} <span className="text-slate-400 font-medium text-xs">({service.reviews})</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-500 mb-4">{service.provider}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                                            <MapPin className="h-3 w-3" /> à {service.distance} km
                                        </div>
                                        <div className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                                            <Clock className="h-3 w-3" /> Rép. {service.responseTime}
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">À partir de</p>
                                            <p className="text-lg font-black text-slate-900">{service.price.toLocaleString('fr-FR')} FCFA</p>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-sm font-bold rounded-xl transition-colors">
                                            Réserver
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <button className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-slate-900 transition-colors">
                            Charger plus de services
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
