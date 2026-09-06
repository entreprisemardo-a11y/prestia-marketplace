import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Star } from 'lucide-react';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setIsLoading(true);
        // Simulation d'un appel API (1.5s) avant de rediriger
        setTimeout(() => {
            console.log("Connexion réussie :", data);
            setIsLoading(false);
            // Redirection vers un futur dashboard (pour l'instant la Home)
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            
            {/* Background décors */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-400/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 z-10 min-h-[700px]">
                
                {/* PARTIE GAUCHE : Formulaire de connexion (Épuré, Stripe-like) */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
                        <Link to="/" className="inline-block mb-10">
                            <span className="text-2xl font-black tracking-tight text-slate-900">PRESTIA<span className="text-brand-600">.</span></span>
                        </Link>
                        
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Bienvenue.</h1>
                        <p className="text-slate-500 mb-8 font-medium">Connectez-vous pour gérer vos services et commandes.</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-colors text-slate-700">
                                {/* SVG Google Logo */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-colors text-slate-700">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        <div className="relative mb-8 text-center">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                            <span className="relative bg-white px-4 text-xs font-semibold uppercase text-slate-400">Ou avec votre email</span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Adresse Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                    <input 
                                        type="email" 
                                        {...register("email", { required: true })}
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none font-medium transition-all shadow-sm"
                                        placeholder="vous@entreprise.com"
                                    />
                                </div>
                                {errors.email && <span className="text-xs text-red-500 font-medium mt-1">L'email est requis</span>}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-slate-700">Mot de passe</label>
                                    <a href="#" className="text-sm font-bold text-brand-600 hover:underline">Oublié ?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                    <input 
                                        type="password" 
                                        {...register("password", { required: true })}
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none font-medium transition-all shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <span className="text-xs text-red-500 font-medium mt-1">Le mot de passe est requis</span>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-600 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Se connecter'}
                                {!isLoading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-10 font-medium">
                            Pas encore de compte ? <Link to="/register" className="text-slate-900 font-bold hover:underline">Créer un compte</Link>
                        </p>
                    </motion.div>
                </div>

                {/* PARTIE DROITE : Visuel Premium (Image + Testimonial) */}
                <div className="hidden lg:block relative bg-slate-900 overflow-hidden">
                    {/* Image de fond (Unsplash - Artisan/Architecte) */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                    ></div>
                    
                    {/* Gradient Overlay pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                    <div className="absolute inset-0 p-16 flex flex-col justify-end">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <blockquote className="text-3xl font-medium text-white leading-tight mb-8">
                                "Depuis que nous utilisons PRESTIA, notre chiffre d'affaires a augmenté de 40%. L'interface est incroyablement fluide et les clients sont sérieux."
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Avatar" className="h-12 w-12 rounded-full bg-slate-800 border-2 border-slate-700" />
                                <div>
                                    <p className="text-white font-bold">Sarah Koné</p>
                                    <p className="text-slate-400 text-sm">Gérante, Studio Pixel</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
