import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, UploadCloud, FileText, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function KycVerification() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'unverified' | 'pending' | 'approved'>('unverified');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);

        try {
            // Simulation API Call
            // const formData = new FormData();
            // formData.append('id_document', file);
            // await api.post('/kyc/upload', formData);

            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('pending');

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'pending') {
        return (
            <div className="max-w-2xl mx-auto mt-10">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ClockIcon className="h-10 w-10 text-amber-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Vérification en cours</h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
                        Vos documents ont bien été reçus. Notre équipe examine actuellement votre pièce d'identité. Ce processus prend généralement entre 2 et 24 heures.
                    </p>
                    <button onClick={() => navigate('/dashboard')} className="text-brand-600 font-bold hover:underline">
                        Retourner à l'accueil
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <ShieldAlert className="h-8 w-8 text-brand-600" /> Vérification d'Identité (KYC)
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Conformément à la réglementation, nous devons vérifier votre identité avant que vous puissiez proposer des services et recevoir des paiements.</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4 items-start">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-amber-900">Action Requise</h4>
                    <p className="text-sm text-amber-800 mt-1">Vous ne pouvez pas créer de nouveaux services tant que votre identité n'a pas été validée par nos équipes.</p>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Pièce d'identité valide</h3>
                        <p className="text-sm text-slate-500 mb-6">Veuillez téléverser une copie claire de votre Carte Nationale d'Identité (CNI) ou de votre Passeport. Assurez-vous que tous les coins sont visibles.</p>
                        
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors relative">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />
                            
                            {file ? (
                                <div className="flex flex-col items-center">
                                    <FileText className="h-12 w-12 text-brand-600 mb-4" />
                                    <span className="font-bold text-slate-900">{file.name}</span>
                                    <span className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    <button type="button" onClick={() => setFile(null)} className="mt-4 text-red-500 font-bold text-sm relative z-10 hover:underline">Changer de fichier</button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center pointer-events-none">
                                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                                        <UploadCloud className="h-8 w-8 text-brand-600" />
                                    </div>
                                    <span className="font-bold text-slate-900 text-lg">Cliquez ou glissez votre fichier ici</span>
                                    <span className="text-sm text-slate-500 mt-2">PDF, JPG, PNG jusqu'à 5MB</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading || !file}
                            className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            ) : (
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                            )}
                            Soumettre pour vérification
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
}

function ClockIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
