'use client';

import { useState, useEffect } from 'react';
import { getFAQs, addFAQ, updateFAQ, deleteFAQ, FAQ as FAQType } from '@/lib/firebaseAdmin';
import { Plus, Pencil, Trash2, X, HelpCircle, GripVertical } from 'lucide-react';

export default function AdminFAQsPage() {
    const [faqs, setFaqs] = useState<FAQType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [order, setOrder] = useState(0);

    useEffect(() => {
        fetchFAQs();
    }, []);

    async function fetchFAQs() {
        try {
            const data = await getFAQs();
            setFaqs(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setQuestion('');
        setAnswer('');
        setOrder(0);
        setEditingId(null);
        setShowForm(false);
    }

    function handleEdit(faq: FAQType) {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setOrder(faq.order || 0);
        setEditingId(faq.id || null);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const data = { question, answer, order };
            if (editingId) {
                await updateFAQ(editingId, data);
            } else {
                await addFAQ(data);
            }
            resetForm();
            await fetchFAQs();
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao salvar FAQ.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir esta FAQ?')) return;
        try {
            await deleteFAQ(id);
            await fetchFAQs();
        } catch (error) {
            console.error('Error:', error);
        }
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">FAQs</h1>
                    <p className="text-gray-500 mt-1">Gerencie as perguntas frequentes</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 bg-espelhart-accent hover:bg-espelhart-medium text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nova FAQ
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-espelhart-darkest">
                                {editingId ? 'Editar FAQ' : 'Nova FAQ'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta *</label>
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                    placeholder="Ex: Qual o prazo de entrega?"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resposta *</label>
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                    rows={4}
                                    placeholder="Responda de forma clara e completa..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ordem de exibição</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(Number(e.target.value))}
                                    min={0}
                                    className="w-32 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-espelhart-accent hover:bg-espelhart-medium text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Salvando...' : editingId ? 'Salvar' : 'Criar'}
                                </button>
                                <button type="button" onClick={resetForm} className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            {faqs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma FAQ cadastrada</h3>
                    <p className="text-gray-400 text-sm">Adicione perguntas frequentes dos seus clientes.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                            <GripVertical className="w-5 h-5 text-gray-300 mt-1 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-espelhart-darkest mb-1">{faq.question}</p>
                                <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => handleEdit(faq)} className="text-gray-400 hover:text-espelhart-accent">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(faq.id!)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
