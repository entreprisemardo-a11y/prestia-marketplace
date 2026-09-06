import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, User, Mail, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/utils';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);

    const onSubmit = (data) => {
        if (step === 1) {
            setStep(2);
            return;
        }
        console.log("Données d'inscription :", data);
        // Appel API d'inscription
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                
                {/* PARTIE GAUCHE : Branding & Réassurance (Dark) */}
                <div className="bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[100px]"></div>
                    
                    <div className="relative z-10">
                        <Link to="/" className="text-2xl font-black tracking-tight mb-12 block">
                            PRESTIA<span className="text-brand-500">.</span>
                        </Link>
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            Devenez le prestataire de choix de milliers de clients.
                        </h2>
                        <p className="text-slate-400 text-lg mb-12">
                            PRESTIA sélectionne rigoureusement ses experts pour garantir une qualité de service inégalée.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Gérez vos commandes facilement",
                                "Paiements 100% garantis",
                                "Visibilité maximale dans votre zone",
                                "Outils de facturation intégrés"
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-brand-500 flex-shrink-0" />
                                    <span className="font-medium text-slate-200">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-16 pt-8 border-t border-slate-800 flex items-center gap-4">
                        <ShieldCheck className="h-10 w-10 text-green-400" />
                        <div>
                            <p className="font-bold">Sécurité d'entreprise</p>
                            <p className="text-sm text-slate-400">Vos données sont chiffrées de bout en bout.</p>
                        </div>
                    </div>
                </div>

                {/* PARTIE DROITE : Formulaire React Hook Form */}
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="mb-8">
                        <h3 className="text-2xl font-extrabold text-slate-900">Créer un compte Pro</h3>
                        <p className="text-slate-500 mt-2 font-medium">Étape {step} sur 2 : {step === 1 ? 'Informations personnelles' : 'Votre activité'}</p>
                        
                        {/* Progress Bar */}
                        <div className="flex gap-2 mt-4">
                            <div className="h-2 flex-1 rounded-full bg-brand-600"></div>
                            <div className={cn("h-2 flex-1 rounded-full transition-colors", step === 2 ? "bg-brand-600" : "bg-slate-200")}></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Prénom</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                            <input type="text" {...register("firstname", { required: true })} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="John" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom</label>
                                        <input type="text" {...register("lastname", { required: true })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Adresse Email Profesionnelle</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <input type="email" {...register("email", { required: true })} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="contact@entreprise.com" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <input type="password" {...register("password", { required: true })} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="••••••••" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nom de l'entreprise ou activité</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <input type="text" {...register("companyName", { required: true })} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="Ex: BricoFast SARL" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Numéro de téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <input type="tel" {...register("phone", { required: true })} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium transition-all" placeholder="+229 00 00 00 00" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="pt-4 flex gap-4">
                            {step === 2 && (
                                <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                    Retour
                                </button>
                            )}
                            <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-900/20">
                                {step === 1 ? 'Suivant' : 'Finaliser l\'inscription'}
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-8 font-medium">
                        Vous avez déjà un compte ? <Link to="/login" className="text-brand-600 font-bold hover:underline">Connectez-vous</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
