import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Shield, Clock, ArrowRight, Zap, CheckCircle2, TrendingUp, Users, Award, PlayCircle } from 'lucide-react';
import { cn } from '@/shared/utils';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="w-full bg-slate-50">
            {/* HERO SECTION : Immersif et Sombre (Linear / Stripe inspired) */}
            <section className="relative w-full pt-28 pb-40 flex flex-col items-center justify-center overflow-hidden">
                {/* Effets de lumière / Mesh Gradient */}
                <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a] z-0">
                    {/* Image de fond : Artisan / Entrepreneur Africain (Unsplash) */}
                    <img 
                        src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Artisan joyeux"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    
                    {/* Overlay Dégradé très léger pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/30 to-[#0a0a0a]"></div>
                    
                    {/* Halos de lumière de la marque */}
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/40 blur-[120px] rounded-full mix-blend-screen"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen"></div>
                    
                    {/* Grille texturée subtile */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
                </div>
                
                {/* Floating Elements for visual density - Adaptés au fond sombre */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-28 left-10 hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
                    <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center"><CheckCircle2 className="text-green-400 h-5 w-5"/></div>
                    <div><p className="text-xs text-slate-300">Plombier vérifié</p><p className="text-sm font-bold text-white">À 2 km de vous</p></div>
                </motion.div>
                
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-10 hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
                    <div className="h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center"><Star className="text-amber-400 h-5 w-5 fill-amber-400"/></div>
                    <div><p className="text-xs text-slate-300">Note moyenne</p><p className="text-sm font-bold text-white">4.9/5 sur PRESTIA</p></div>
                </motion.div>

                <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-brand-300 shadow-sm"
                    >
                        <Zap className="mr-2 h-4 w-4 fill-brand-400 text-brand-400" />
                        <span>La plateforme n°1 en Afrique</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-white max-w-5xl leading-[1.1]"
                    >
                        Ne cherchez plus.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400">Trouvez l'expert idéal.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="max-w-2xl text-lg md:text-xl text-slate-300 font-medium"
                    >
                        Accédez au réseau le plus sélect de professionnels. Réservation en un clic, paiement sécurisé et qualité garantie.
                    </motion.p>

                    {/* SEARCH BAR MASSIVE (White on Dark background for pop) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="w-full max-w-4xl mt-12"
                    >
                        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full shadow-[0_0_50px_rgba(37,99,235,0.2)] border-4 border-white/20 backdrop-blur-xl p-2 gap-2">
                            <div className="flex-1 flex items-center w-full px-6 py-4 hover:bg-slate-50 rounded-full transition-colors cursor-text group border-r border-slate-100">
                                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-brand-600 transition-colors mr-4" />
                                <div className="flex flex-col items-start w-full">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Je recherche...</label>
                                    <input type="text" placeholder="Développeur, Menuisier..." className="w-full bg-transparent outline-none text-slate-900 font-semibold placeholder-slate-400 text-lg" />
                                </div>
                            </div>
                            
                            <div className="flex-1 flex items-center w-full px-6 py-4 hover:bg-slate-50 rounded-full transition-colors cursor-text group">
                                <MapPin className="h-6 w-6 text-slate-400 group-focus-within:text-brand-600 transition-colors mr-4" />
                                <div className="flex flex-col items-start w-full">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Où ?</label>
                                    <input type="text" placeholder="Ma position actuelle" className="w-full bg-transparent outline-none text-slate-900 font-semibold placeholder-slate-400 text-lg" />
                                </div>
                            </div>
                            
                            <button className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-full py-5 px-10 shadow-lg transition-all flex items-center justify-center text-lg">
                                Trouver <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Dégradé de transition vers la section suivante */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-slate-900"></div>
            </section>

            {/* DARK SECTION : COMMENT ÇA MARCHE */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Une expérience sans friction.</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">De la recherche à la facturation, PRESTIA s'occupe de tout pour vous garantir une tranquillité d'esprit totale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Recherchez', desc: 'Saisissez votre besoin, notre algorithme filtre les meilleurs profils.', icon: Search },
                            { step: '02', title: 'Comparez', desc: 'Consultez les portfolios, les avis vérifiés et les tarifs en toute transparence.', icon: Users },
                            { step: '03', title: 'Réservez', desc: 'Validez votre commande. Les fonds sont bloqués de manière sécurisée.', icon: Shield },
                            { step: '04', title: 'Validez', desc: 'Le travail est terminé ? Libérez le paiement en un clic.', icon: CheckCircle2 }
                        ].map((item, i) => (
                            <div key={i} className="relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors">
                                <div className="text-5xl font-black text-slate-700/50 absolute top-4 right-4">{item.step}</div>
                                <div className="h-14 w-14 bg-brand-600/20 rounded-xl flex items-center justify-center mb-6 border border-brand-500/30">
                                    <item.icon className="h-7 w-7 text-brand-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TOP PRESTATAIRES GRID (Dense et Coloré) */}
            <section className="py-24 container px-4 md:px-6 mx-auto bg-white rounded-3xl -mt-8 relative z-20 shadow-xl border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="h-5 w-5 text-amber-500" />
                            <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">L'élite de la plateforme</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Artisans & Experts à la Une</h2>
                    </div>
                    <button className="text-brand-600 font-bold hover:underline mt-4 md:mt-0 flex items-center">
                        Voir tout le classement <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Kouassi Dev', role: 'Architecte Logiciel', rating: '5.0', reviews: 142, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
                        { name: 'Brico Fast', role: 'Électricien Certifié', rating: '4.9', reviews: 89, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' },
                        { name: 'Studio Pixel', role: 'Designer UI/UX', rating: '4.9', reviews: 230, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
                        { name: 'Climafrique', role: 'Climatisation', rating: '4.8', reviews: 56, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver' }
                    ].map((pro, i) => (
                        <div key={i} className="group relative rounded-2xl border border-slate-200 bg-white p-1 hover:shadow-2xl hover:border-brand-200 transition-all cursor-pointer overflow-hidden">
                            <div className="bg-slate-100 h-32 rounded-xl mb-4 relative overflow-hidden">
                                {/* Abstract cover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                                <img src={pro.img} alt={pro.name} className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full border-4 border-white shadow-lg bg-white z-10" />
                            </div>
                            <div className="p-4 text-center pt-8">
                                <h3 className="text-lg font-extrabold text-slate-900">{pro.name}</h3>
                                <p className="text-sm font-medium text-brand-600 mb-3">{pro.role}</p>
                                <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-700 bg-slate-50 py-2 rounded-lg">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    {pro.rating} <span className="text-slate-400 font-normal">({pro.reviews} avis)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION MASSIVE */}
            <section className="py-24 px-4">
                <div className="container mx-auto bg-gradient-to-br from-brand-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 opacity-10">
                        <TrendingUp className="w-64 h-64" />
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Prêt à développer votre business ?</h2>
                        <p className="text-xl text-brand-100 mb-10 font-medium">Rejoignez des milliers de professionnels qui ont décuplé leurs revenus grâce à PRESTIA.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <Link to="/register" className="bg-white text-brand-600 hover:bg-slate-50 font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105 text-lg">
                                Créer mon compte Pro
                            </Link>
                            <button className="bg-brand-800 hover:bg-brand-900 text-white font-bold py-4 px-10 rounded-full transition-colors flex items-center justify-center text-lg border border-brand-500">
                                <PlayCircle className="mr-2 h-5 w-5" /> Voir la démo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
