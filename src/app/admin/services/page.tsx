'use client';

import { useState, useEffect, useRef } from 'react';
import {
    getServices,
    addService,
    updateService,
    deleteService,
    uploadImage,
    uploadGalleryImages,
    Service,
} from '@/lib/firebaseAdmin';
import { Plus, Pencil, Trash2, Upload, X, Image, ImagePlus } from 'lucide-react';

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [featured, setFeatured] = useState(false);
    const [order, setOrder] = useState(0);
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [existingGallery, setExistingGallery] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setTitle('');
        setDescription('');
        setFeatured(false);
        setOrder(0);
        setMainImageFile(null);
        setMainImagePreview('');
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setExistingGallery([]);
        setEditingId(null);
        setShowForm(false);
    }

    function handleEdit(service: Service) {
        setTitle(service.title);
        setDescription(service.description);
        setFeatured(service.featured || false);
        setOrder(service.order || 0);
        setMainImagePreview(service.mainImage || '');
        setExistingGallery(service.gallery || []);
        setEditingId(service.id || null);
        setShowForm(true);
    }

    function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setMainImageFile(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    }

    function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setGalleryFiles((prev) => [...prev, ...files]);
        setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    }

    function removeGalleryImage(index: number, isExisting: boolean) {
        if (isExisting) {
            setExistingGallery((prev) => prev.filter((_, i) => i !== index));
        } else {
            setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
            setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        try {
            let mainImageUrl = mainImagePreview;

            // Upload main image if new
            if (mainImageFile) {
                try {
                    mainImageUrl = await uploadImage(
                        mainImageFile,
                        `services/${Date.now()}_main_${mainImageFile.name}`
                    );
                } catch (uploadError) {
                    console.error('Main image upload failed:', uploadError);
                    const proceed = confirm(
                        'Falha no upload da imagem principal. Firebase Storage pode não estar ativado.\n\nDeseja salvar o serviço sem a imagem?'
                    );
                    if (!proceed) {
                        setSaving(false);
                        return;
                    }
                    mainImageUrl = '';
                }
            }

            // Upload new gallery images
            let galleryUrls = [...existingGallery];
            if (galleryFiles.length > 0) {
                try {
                    const newUrls = await uploadGalleryImages(galleryFiles, editingId || 'new');
                    galleryUrls = [...galleryUrls, ...newUrls];
                } catch (uploadError) {
                    console.error('Gallery upload failed:', uploadError);
                    alert('Falha no upload da galeria. Firebase Storage pode não estar ativado. O serviço será salvo sem as novas imagens da galeria.');
                }
            }

            const serviceData = {
                title,
                description,
                mainImage: mainImageUrl,
                gallery: galleryUrls,
                featured,
                order,
            };

            if (editingId) {
                await updateService(editingId, serviceData);
            } else {
                await addService(serviceData);
            }

            resetForm();
            await fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Erro ao salvar serviço. Verifique o console para detalhes.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

        try {
            await deleteService(id);
            await fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Serviços</h1>
                    <p className="text-gray-500 mt-1">Gerencie os serviços exibidos no site</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 bg-espelhart-accent hover:bg-espelhart-medium text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Serviço
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-espelhart-darkest">
                                {editingId ? 'Editar Serviço' : 'Novo Serviço'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Ex: Box para Banheiro"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={4}
                                    placeholder="Descreva o serviço..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base resize-none"
                                />
                            </div>

                            {/* Main Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Principal</label>
                                <div className="flex items-center gap-4">
                                    {mainImagePreview && (
                                        <img
                                            src={mainImagePreview}
                                            alt="Preview"
                                            className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-espelhart-accent hover:text-espelhart-accent transition-colors"
                                    >
                                        <Upload className="w-4 h-4" />
                                        {mainImagePreview ? 'Alterar' : 'Upload'}
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Gallery */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Galeria de Imagens
                                    <span className="text-gray-400 font-normal"> (portfólio)</span>
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-3">
                                    {/* Existing gallery images */}
                                    {existingGallery.map((url, i) => (
                                        <div key={`existing-${i}`} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Galeria ${i + 1}`}
                                                className="w-full h-20 rounded-lg object-cover border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(i, true)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {/* New gallery previews */}
                                    {galleryPreviews.map((url, i) => (
                                        <div key={`new-${i}`} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Nova ${i + 1}`}
                                                className="w-full h-20 rounded-lg object-cover border-2 border-espelhart-accent/30"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(i, false)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {/* Add button */}
                                    <button
                                        type="button"
                                        onClick={() => galleryInputRef.current?.click()}
                                        className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-espelhart-accent hover:text-espelhart-accent transition-colors"
                                    >
                                        <ImagePlus className="w-5 h-5" />
                                        <span className="text-[10px] mt-1">Adicionar</span>
                                    </button>
                                    <input
                                        ref={galleryInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Options Row */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                                    <input
                                        type="number"
                                        value={order}
                                        onChange={(e) => setOrder(Number(e.target.value))}
                                        min={0}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={featured}
                                        onChange={(e) => setFeatured(e.target.checked)}
                                        className="w-4 h-4 text-espelhart-accent focus:ring-espelhart-accent border-gray-300 rounded"
                                    />
                                    <label htmlFor="featured" className="text-sm text-gray-700">
                                        Destacar como &quot;Mais Procurado&quot;
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full sm:flex-1 bg-espelhart-accent hover:bg-espelhart-medium text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 order-1 sm:order-2"
                                >
                                    {saving ? 'Salvando...' : editingId ? 'Salvar Alterações' : 'Criar Serviço'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full sm:px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium order-2 sm:order-1"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Services List */}
            {services.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum serviço cadastrado</h3>
                    <p className="text-gray-400 text-sm mb-6">Adicione seu primeiro serviço para aparecer no site.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 bg-espelhart-accent text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar Serviço
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                            {service.mainImage && (
                                <div className="h-40 overflow-hidden relative">
                                    <img
                                        src={service.mainImage}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {service.featured && (
                                        <span className="absolute top-3 right-3 bg-espelhart-accent text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                            Destaque
                                        </span>
                                    )}
                                    {service.gallery && service.gallery.length > 0 && (
                                        <span className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                                            +{service.gallery.length} fotos
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="p-5">
                                <h3 className="font-bold text-espelhart-darkest mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-espelhart-surface text-espelhart-medium rounded-lg text-xs font-medium hover:bg-espelhart-accent/10 transition-colors"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id!)}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
