import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppLayout from '../layouts/AppLayout';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Home from '../features/home/Home';
import Explore from '../features/services/Explore';
import HowItWorks from '../features/home/HowItWorks';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../features/dashboard/Overview';
import Orders from '../features/dashboard/Orders';
import Messages from '../features/dashboard/Messages';
import Wallet from '../features/dashboard/Wallet';
import Settings from '../features/dashboard/Settings';
import KycVerification from '../features/dashboard/KycVerification';

import ClientLayout from '../layouts/ClientLayout';
import ClientOverview from '../features/client/ClientOverview';
import ClientPurchases from '../features/client/ClientPurchases';
import ClientFavorites from '../features/client/ClientFavorites';
import VerifyEmail from '../features/auth/VerifyEmail';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="services" element={<Explore />} />
                        <Route path="how-it-works" element={<HowItWorks />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="verify-email" element={<VerifyEmail />} />
                    </Route>

                    {/* DASHBOARD ROUTES */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="kyc" element={<KycVerification />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="wallet" element={<Wallet />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* CLIENT DASHBOARD ROUTES */}
                    <Route path="/client" element={<ClientLayout />}>
                        <Route index element={<ClientOverview />} />
                        <Route path="purchases" element={<ClientPurchases />} />
                        <Route path="favorites" element={<ClientFavorites />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* CATCH ALL */}
                    <Route path="*" element={
                            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                                <h2 className="text-4xl font-extrabold text-slate-900 mb-2">404</h2>
                                <p className="text-slate-500">Cette page n'existe pas ou a été déplacée.</p>
                            </div>
                        } />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
