import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import { api } from '@/lib/api'; // Sera implémenté avec Zustand plus tard

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (code.length !== 6) {
            setError('Le code doit contenir exactement 6 chiffres.');
            return;
        }

        setIsLoading(true);

        try {
            // Simulation d'appel API
            // const response = await api.post('/verify-email', { code });
            
            // Simulation de chargement
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Si c'est un mock, on redirige vers le KYC ou Dashboard selon le rôle
            // Pour l'instant, on simule une réussite et on redirige le prestataire vers le KYC
            navigate('/dashboard/kyc'); 
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Code de vérification invalide.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-600/10 blur-[120px] rounded-full mix-blend-multiply"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-slate-100"
            >
                <div className="p-8">
                    <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-brand-100">
                        <Mail className="h-8 w-8 text-brand-600" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Vérifiez votre email</h2>
                    <p className="text-slate-500 mb-8 font-medium text-sm">
                        Nous vous avons envoyé un code de vérification à 6 chiffres. Veuillez le saisir ci-dessous pour activer votre compte.
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="code" className="block text-sm font-bold text-slate-700 mb-2">Code de vérification</label>
                            <input
                                id="code"
                                type="text"
                                required
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-2xl tracking-[0.5em] text-center font-black text-slate-900"
                                placeholder="000000"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>Valider mon compte <ArrowRight className="ml-2 h-5 w-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm font-medium text-slate-500">
                            Vous n'avez pas reçu le code ?{' '}
                            <button className="text-brand-600 font-bold hover:text-brand-700 hover:underline">Renvoyer le code</button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
