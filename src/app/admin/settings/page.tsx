'use client';

import { useState, useEffect } from 'react';
import { getSettings, updateSettings, SiteSettings } from '@/lib/firebaseAdmin';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Phone, Globe, FileText, CheckCircle } from 'lucide-react';
import { defaultSettings } from '@/lib/SettingsContext';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await getSettings();
                if (data) {
                    setSettings(data);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        try {
            // Use setDoc to create or update
            await setDoc(doc(db, 'settings', 'general'), settings);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Erro ao salvar configurações.');
        } finally {
            setSaving(false);
        }
    }

    function updateField(field: keyof SiteSettings, value: string) {
        setSettings((prev) => ({ ...prev, [field]: value }));
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-espelhart-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Configurações</h1>
                <p className="text-gray-500 mt-1">Edite as informações exibidas no site</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
                {/* WhatsApp & Contact */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">WhatsApp e Contato</h2>
                            <p className="text-xs text-gray-400">Informações de contato exibidas no site</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número WhatsApp</label>
                            <input
                                type="text"
                                value={settings.whatsappNumber}
                                onChange={(e) => updateField('whatsappNumber', e.target.value)}
                                placeholder="5511999999999"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input
                                type="text"
                                value={settings.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem Pré-programada (WhatsApp)</label>
                            <input
                                type="text"
                                value={settings.whatsappMessage}
                                onChange={(e) => updateField('whatsappMessage', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => updateField('address', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Redes Sociais</h2>
                            <p className="text-xs text-gray-400">Links das redes sociais da Espelhart</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input
                                type="url"
                                value={settings.instagram}
                                onChange={(e) => updateField('instagram', e.target.value)}
                                placeholder="https://instagram.com/espelhart"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                            <input
                                type="url"
                                value={settings.facebook}
                                onChange={(e) => updateField('facebook', e.target.value)}
                                placeholder="https://facebook.com/espelhart"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Textos Gerais */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Textos Gerais</h2>
                            <p className="text-xs text-gray-400">Mensagens fixas do site</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Rodapé Central (Sobre a Empresa)</label>
                            <textarea
                                value={settings.footerText}
                                onChange={(e) => updateField('footerText', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-espelhart-accent hover:bg-espelhart-medium text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Salvando...' : 'Salvar Configurações'}
                    </button>
                    {saved && (
                        <span className="flex items-center gap-2 text-green-600 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                            <CheckCircle className="w-4 h-4" />
                            Salvo com sucesso!
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
