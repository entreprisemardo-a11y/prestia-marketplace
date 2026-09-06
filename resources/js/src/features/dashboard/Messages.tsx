import React from 'react';
import { Search, Send, Phone, Video, MoreVertical, CheckCircle2 } from 'lucide-react';

export default function Messages() {
    const contacts = [
        { id: 1, name: 'Amadou B.', lastMessage: 'Merci pour l\'installation !', time: '10:42', unread: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amadou' },
        { id: 2, name: 'Sarah K.', lastMessage: 'Pouvez-vous passer demain matin ?', time: 'Hier', unread: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, name: 'Entreprise XYZ', lastMessage: 'Le devis est validé.', time: 'Mar', unread: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Enterprise' },
        { id: 4, name: 'Fatou N.', lastMessage: 'D\'accord, à jeudi.', time: 'Lun', unread: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou' },
    ];

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden">
            {/* Contacts Sidebar */}
            <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher une conversation..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map((contact, i) => (
                        <div key={contact.id} className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-white transition-colors border-b border-slate-100 ${i === 1 ? 'bg-white border-l-4 border-l-brand-600' : 'border-l-4 border-l-transparent'}`}>
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200" />
                                {contact.unread > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className={`text-sm truncate ${contact.unread > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{contact.name}</h4>
                                    <span className="text-xs font-medium text-slate-400">{contact.time}</span>
                                </div>
                                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>{contact.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <img src={contacts[1].avatar} alt="Sarah" className="w-10 h-10 rounded-full bg-slate-100" />
                        <div>
                            <h3 className="font-bold text-slate-900">Sarah K.</h3>
                            <p className="text-xs text-brand-600 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-brand-500 mr-1.5 animate-pulse"></span> En ligne</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                        <button className="hover:text-brand-600 transition-colors"><Phone className="h-5 w-5" /></button>
                        <button className="hover:text-brand-600 transition-colors"><Video className="h-5 w-5" /></button>
                        <button className="hover:text-slate-600 transition-colors"><MoreVertical className="h-5 w-5" /></button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">
                    <div className="flex justify-center">
                        <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">Aujourd'hui</span>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <img src={contacts[1].avatar} alt="Sarah" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                                Bonjour, suite à la validation du devis, pouvez-vous passer demain matin vers 9h pour commencer les travaux ?
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 ml-1 block font-medium">10:15</span>
                        </div>
                    </div>

                    <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
                        <div>
                            <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                                Bonjour Sarah, oui c'est parfait pour moi. Je serai là avec le matériel.
                            </div>
                            <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                                <span className="text-[10px] text-slate-400 font-medium">10:20</span>
                                <CheckCircle2 className="h-3 w-3 text-brand-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <img src={contacts[1].avatar} alt="Sarah" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                                Super, merci beaucoup. À demain !
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 ml-1 block font-medium">10:22</span>
                        </div>
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Écrivez votre message..."
                            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-full px-5 py-3 text-sm transition-colors outline-none"
                        />
                        <button className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-md transition-colors flex-shrink-0">
                            <Send className="h-5 w-5 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
