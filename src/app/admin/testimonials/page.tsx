'use client';

import { useState, useEffect } from 'react';
import {
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    Testimonial,
} from '@/lib/firebaseAdmin';
import { Plus, Pencil, Trash2, X, Star, MessageSquareQuote } from 'lucide-react';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchTestimonials();
    }, []);

    async function fetchTestimonials() {
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setName('');
        setText('');
        setRating(5);
        setDate('');
        setEditingId(null);
        setShowForm(false);
    }

    function handleEdit(t: Testimonial) {
        setName(t.name);
        setText(t.text);
        setRating(t.rating);
        setDate(t.date || '');
        setEditingId(t.id || null);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const data = { name, text, rating, date };
            if (editingId) {
                await updateTestimonial(editingId, data);
            } else {
                await addTestimonial(data);
            }
            resetForm();
            await fetchTestimonials();
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao salvar depoimento.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir este depoimento?')) return;
        try {
            await deleteTestimonial(id);
            await fetchTestimonials();
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Depoimentos</h1>
                    <p className="text-gray-500 mt-1">Gerencie os depoimentos exibidos no site</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 bg-espelhart-accent hover:bg-espelhart-medium text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Depoimento
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-espelhart-darkest">
                                {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Ex: Maria Silva"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento *</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    rows={3}
                                    placeholder="O que o cliente disse..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm resize-none"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                <Star className="w-6 h-6 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data (ex: Há 1 mês)</label>
                                    <input
                                        type="text"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="Há 2 semanas"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-sm"
                                    />
                                </div>
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
            {testimonials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <MessageSquareQuote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum depoimento</h3>
                    <p className="text-gray-400 text-sm">Adicione depoimentos de seus clientes.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-semibold text-espelhart-darkest">{t.name}</p>
                                    <div className="flex text-yellow-400 gap-0.5 mt-1">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(t)} className="text-gray-400 hover:text-espelhart-accent">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(t.id!)} className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm italic">&ldquo;{t.text}&rdquo;</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
