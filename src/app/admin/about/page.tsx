'use client';

import { useState, useEffect } from 'react';
import { getSettings, SiteSettings } from '@/lib/firebaseAdmin';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, CheckCircle, Users, BarChart3, ListChecks } from 'lucide-react';
import { defaultSettings } from '@/lib/SettingsContext';

export default function AdminAboutPage() {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await getSettings();
                if (data) {
                    setSettings({ ...defaultSettings, ...data });
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

    function updateField(field: keyof SiteSettings, value: any) {
        setSettings((prev) => ({ ...prev, [field]: value }));
    }

    function updateStat(index: number, key: 'label' | 'value', val: string) {
        const newStats = [...settings.aboutStats];
        newStats[index][key] = val;
        updateField('aboutStats', newStats);
    }

    function updateHighlight(index: number, val: string) {
        const newHighlights = [...settings.aboutHighlights];
        newHighlights[index] = val;
        updateField('aboutHighlights', newHighlights);
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
                <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Quem Somos</h1>
                <p className="text-gray-500 mt-1">Personalize os detalhes e os grandes números da sua empresa.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-3xl">

                {/* Textos Sobre a Empresa */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">A Empresa</h2>
                            <p className="text-xs text-gray-400">Textos diretos sobre quem você é</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título de Chamada</label>
                            <input
                                type="text"
                                value={settings.aboutTitle}
                                onChange={(e) => updateField('aboutTitle', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">História / Texto Longo</label>
                            <textarea
                                value={settings.aboutText}
                                onChange={(e) => updateField('aboutText', e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Números e Conquistas */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Números e Conquistas</h2>
                            <p className="text-xs text-gray-400">Os grandes destaques numéricos da empresa</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {settings.aboutStats.map((stat, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                                <div className="w-full sm:flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => updateStat(i, 'value', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base font-semibold text-espelhart-darkest"
                                        placeholder="Ex: 10+"
                                    />
                                </div>
                                <div className="w-full sm:flex-[2]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rótulo / Significado</label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => updateStat(i, 'label', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base text-gray-600"
                                        placeholder="Ex: Anos de Mercado"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selos de Qualidade */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ListChecks className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Rótulos Destaque (Fundo Escuro)</h2>
                            <p className="text-xs text-gray-400">Dois pilares em formato de ícone e selo de qualidade abaixo do texto.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {settings.aboutHighlights.map((highlight, i) => (
                            <div key={i}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destaque {i + 1}</label>
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => updateHighlight(i, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base"
                                    placeholder="Ex: Certificação de Qualidade"
                                />
                            </div>
                        ))}
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
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                    {saved && (
                        <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Salvo com sucesso!
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
