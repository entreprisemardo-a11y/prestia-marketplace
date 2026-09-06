import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CreditCard, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Trouvez l'expert parfait",
            desc: "Parcourez notre catalogue d'artisans et de professionnels locaux. Comparez les profils, les portfolios et lisez les avis vérifiés de la communauté."
        },
        {
            icon: ShieldCheck,
            title: "Réservez en toute sécurité",
            desc: "Discutez des détails de votre projet. Une fois d'accord, validez la prestation. Votre argent est sécurisé par PRESTIA jusqu'à la fin des travaux."
        },
        {
            icon: Star,
            title: "Profitez du résultat",
            desc: "Le travail est terminé ? Validez la livraison. Le prestataire est alors payé, et vous pouvez laisser un avis pour aider la communauté."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50">
            <div className="bg-[#0a0a0a] text-white pt-24 pb-32 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-600/10 blur-[100px] rounded-full"></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Simple. Sécurisé.<br/>Transparent.</h1>
                    <p className="text-xl text-slate-400 font-medium">Découvrez comment PRESTIA révolutionne la mise en relation entre particuliers et professionnels en Afrique.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 max-w-5xl -mt-20 relative z-20">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-slate-100">
                    <div className="space-y-16">
                        {steps.map((step, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                key={i} 
                                className="flex flex-col md:flex-row gap-8 items-center"
                            >
                                <div className="flex-shrink-0 w-24 h-24 bg-brand-50 rounded-2xl flex items-center justify-center border border-brand-100 shadow-inner">
                                    <step.icon className="h-10 w-10 text-brand-600" />
                                </div>
                                <div>
                                    <div className="text-brand-600 font-black text-sm uppercase tracking-widest mb-2">Étape 0{i + 1}</div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-lg text-slate-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-100 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Prêt à trouver votre prestataire ?</h3>
                        <Link to="/services" className="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105 text-lg">
                            Explorer les services <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
