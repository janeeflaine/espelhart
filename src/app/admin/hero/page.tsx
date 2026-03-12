'use client';

import { useState, useEffect } from 'react';
import { getSettings, SiteSettings } from '@/lib/firebaseAdmin';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, CheckCircle, MonitorUp } from 'lucide-react';
import { defaultSettings } from '@/lib/SettingsContext';

export default function AdminHeroPage() {
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
                <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Topo do Site</h1>
                <p className="text-gray-500 mt-1">Edite a primeira seção exibida quando um cliente abre o site.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <MonitorUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-espelhart-darkest">Textos Principais</h2>
                            <p className="text-xs text-gray-400">Título e descrição principais do seu negócio</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pequena tag superior (Badge) </label>
                            <input
                                type="text"
                                value={settings.heroBadge}
                                onChange={(e) => updateField('heroBadge', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                                placeholder="Ex: Referência em Vidraçaria"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título Grande Principal</label>
                            <textarea
                                value={settings.heroTitle}
                                onChange={(e) => updateField('heroTitle', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm resize-none"
                                placeholder="Titúlo que mais chama a atenção..."
                            />
                            <p className="text-xs text-gray-400 mt-1">Dica: use Enter para quebrar a linha e manter um visual elegante.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo / Descrição Abaixo</label>
                            <textarea
                                value={settings.heroSubtitle}
                                onChange={(e) => updateField('heroSubtitle', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm resize-none"
                                placeholder="Uma pequena explicação dos seus serviços..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-500 bg-blue-50/50 p-4 border border-blue-100 rounded-xl">
                    <p>💡 <b>Nota:</b> Os números informativos no fim desta seção do seu site são puxados diretamente dos "Números e Conquistas" na tela de <b>Quem Somos</b>. Você pode editá-los lá e irão atualizar aqui também.</p>
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
