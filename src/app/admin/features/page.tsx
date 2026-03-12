'use client';

import { useState, useEffect } from 'react';
import { getSettings, SiteSettings } from '@/lib/firebaseAdmin';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, CheckCircle, Award, GripHorizontal } from 'lucide-react';
import { defaultSettings } from '@/lib/SettingsContext';

export default function AdminFeaturesPage() {
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
            alert('Erro ao salvar as configurações.');
        } finally {
            setSaving(false);
        }
    }

    function updateField(field: keyof SiteSettings, value: any) {
        setSettings((prev) => ({ ...prev, [field]: value }));
    }

    function updateFeature(index: number, key: 'title' | 'description', val: string) {
        const newFeatures = [...settings.features];
        newFeatures[index][key] = val;
        updateField('features', newFeatures);
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
                <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Diferenciais</h1>
                <p className="text-gray-500 mt-1">Configure as razões de porquê os clientes devem escolher a Espelhart.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-3xl">

                {/* Textos Principais */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                            <Award className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Apresentação da Seção</h2>
                            <p className="text-xs text-gray-400">O título e descrição acima dos cards</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                type="text"
                                value={settings.featuresTitle}
                                onChange={(e) => updateField('featuresTitle', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (Pequeno texto abaixo)</label>
                            <textarea
                                value={settings.featuresSubtitle}
                                onChange={(e) => updateField('featuresSubtitle', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards de Diferencial */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                            <GripHorizontal className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Os 4 Grandes Benefícios</h2>
                            <p className="text-xs text-gray-400">Edite o conteúdo em cada um dos quadros explicativos</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {settings.features.map((feature, i) => (
                            <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                                <div className="font-medium text-espelhart-medium mb-1">Benefício {i + 1}</div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Título Curto</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => updateFeature(i, 'title', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Explicação / Parágrafo</label>
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) => updateFeature(i, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base text-gray-700 resize-none"
                                    />
                                </div>
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
