import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const favorites = [
    { id: 1, name: 'Amadou B.', role: 'Plombier Expert', rating: 4.8, reviews: 124, location: 'Cotonou, Littoral', image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Sarah K.', role: 'Électricienne', rating: 4.9, reviews: 89, location: 'Abomey-Calavi', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Tech Solutions', role: 'Dépannage Informatique', rating: 4.7, reviews: 56, location: 'Porto-Novo', image: 'https://images.unsplash.com/photo-1531123414780-f74244c2b0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function ClientFavorites() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes Favoris</h1>
                <p className="text-sm text-slate-500 mt-1">Les prestataires que vous avez sauvegardés.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav, i) => (
                    <motion.div 
                        key={fav.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                    >
                        <div className="h-48 relative overflow-hidden">
                            <img src={fav.image} alt={fav.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full text-red-500 shadow-sm hover:bg-red-50 transition-colors">
                                <Heart className="h-5 w-5 fill-current" />
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{fav.name}</h3>
                                    <p className="text-sm text-brand-600 font-medium">{fav.role}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                                    <span className="font-bold text-slate-900 text-sm">{fav.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm mt-4">
                                <MapPin className="h-4 w-4" />
                                {fav.location}
                            </div>
                            <Link to="/services" className="mt-6 w-full block text-center bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-900 font-bold py-2.5 rounded-xl transition-colors border border-slate-200 hover:border-brand-200">
                                Voir le profil
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
