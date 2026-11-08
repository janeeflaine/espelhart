/**
 * Everything editable from the admin panel that lives in Firestore `settings/general`.
 * Shared by the public site (SettingsContext) and the admin panel.
 */

export interface Stat {
    label: string;
    value: string;
}

export interface TitledText {
    title: string;
    description: string;
}

export interface SiteSettings {
    // Company identity (shown in footer and legal pages)
    companyLegalName: string;
    cnpj: string;
    dpoName: string;

    // Contact
    whatsappNumber: string;
    whatsappMessage: string;
    phone: string;
    email: string;
    address: string;
    hoursWeek: string;
    hoursSaturday: string;
    instagram: string;
    facebook: string;

    // Hero
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroPromises: string[];

    // Services section
    servicesTitle: string;
    servicesSubtitle: string;

    // Process section
    processTitle: string;
    processSteps: TitledText[];

    // About
    aboutTitle: string;
    aboutText: string;
    aboutImage: string;
    aboutStats: Stat[];
    aboutHighlights: string[];

    // Features
    featuresTitle: string;
    featuresSubtitle: string;
    features: TitledText[];

    // Testimonials
    testimonialsTitle: string;

    // Quote form
    quoteTitle: string;
    quoteSubtitle: string;
    quotePropertyTypes: string[];
    quoteTimings: string[];

    // FAQ
    faqTitle: string;
    faqSubtitle: string;

    // Footer
    footerDescription: string;
    footerText: string;
}

export const defaultSettings: SiteSettings = {
    companyLegalName: 'LUIZ FELIPE SOUZA 05403061185',
    cnpj: '41.634.235/0001-12',
    dpoName: '',
    whatsappNumber: '556198179760',
    whatsappMessage: 'Olá! Gostaria de solicitar um orçamento.',
    phone: '(61) 99817-9760',
    email: 'contato@espelhart.com',
    address: '',
    hoursWeek: 'Seg a sex, 8h às 18h',
    hoursSaturday: 'Sábado, 8h às 12h',
    instagram: '',
    facebook: '',

    heroBadge: 'Referência em Vidraçaria de Alto Padrão',
    heroTitle: 'Vidros e Esquadrias\nde Alto Padrão',
    heroSubtitle:
        'Transformamos seus projetos em realidade com qualidade premium, acabamento impecável e atendimento personalizado.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80',
    heroPromises: ['Orçamento gratuito', 'Medição no local', 'Peças sob medida', 'Garantia em todos os serviços'],

    servicesTitle: 'O que fazemos para sua casa ou empresa',
    servicesSubtitle:
        'Escolha um serviço para ver detalhes e fotos. Cada peça é medida, cortada e instalada pela nossa equipe.',

    processTitle: 'Do primeiro contato à instalação',
    processSteps: [
        { title: 'Você conta o que precisa', description: 'Pelo formulário ou WhatsApp. Fotos do local ajudam a adiantar o orçamento.' },
        { title: 'Medição no local', description: 'Agendamos a visita técnica em até 48h após o contato para medir com precisão.' },
        { title: 'Projeto e orçamento', description: 'Você recebe o projeto com materiais, prazo e valor detalhados antes de fechar.' },
        { title: 'Fabricação e instalação', description: 'Box e vidros em 10 a 15 dias úteis, esquadrias em 20 a 30. Instalação com equipe própria.' },
    ],

    aboutTitle: 'Expertise que atravessa gerações de transparência.',
    aboutText: '',
    aboutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    aboutStats: [
        { label: 'Anos de Mercado', value: '10+' },
        { label: 'Obras Entregues', value: '1500+' },
    ],
    aboutHighlights: ['Certificação de Qualidade', 'Garantia em Todos os Serviços'],

    featuresTitle: 'Por que escolher a Espelhart?',
    featuresSubtitle: 'Combinamos técnica avançada e atendimento personalizado para garantir o sucesso da sua obra.',
    features: [
        { title: 'Equipe Especializada', description: 'Profissionais altamente treinados e certificados para instalações complexas de vidros e esquadrias.' },
        { title: 'Alta Tecnologia', description: 'Utilizamos maquinário de ponta e materiais de última geração para corte e acabamento perfeitos.' },
        { title: 'Prazos Rigorosos', description: 'Cronogramas respeitados do início ao fim, sem atrasos ou surpresas. Compromisso com sua obra.' },
        { title: 'Garantia Estendida', description: 'Segurança total com suporte pós-venda e garantia de fabricação em todos os nossos produtos.' },
    ],

    testimonialsTitle: 'Quem já instalou, recomenda',

    quoteTitle: 'Peça seu orçamento em 1 minuto',
    quoteSubtitle:
        'Responda o que souber. Ao enviar, o WhatsApp abre com seu pedido pronto e um especialista continua a conversa com você.',
    quotePropertyTypes: ['Casa', 'Apartamento', 'Comercial', 'Obra em construção'],
    quoteTimings: ['O quanto antes', 'Nos próximos 30 dias', 'Só estou pesquisando'],

    faqTitle: 'Dúvidas frequentes',
    faqSubtitle: 'Não encontrou o que procurava? Pergunte direto para a nossa equipe.',

    footerDescription:
        'Vidros e esquadrias de alumínio sob medida, com medição, fabricação e instalação feitas pela nossa equipe.',
    footerText: '© 2026 Espelhart. Todos os direitos reservados.',
};

/**
 * Merges stored settings over defaults. Empty strings and empty lists fall back
 * to the default so a cleared field never leaves a hole on the site.
 */
export function mergeSettings(stored: Partial<SiteSettings> | null | undefined): SiteSettings {
    const merged = { ...defaultSettings } as Record<string, unknown>;
    if (!stored) return merged as unknown as SiteSettings;
    for (const [key, value] of Object.entries(stored)) {
        if (value === undefined || value === null) continue;
        if (typeof value === 'string' && value.trim() === '' && key in defaultSettings) {
            // Optional contact fields may be intentionally blank
            if (['instagram', 'facebook', 'address', 'email', 'aboutText', 'hoursSaturday', 'companyLegalName', 'cnpj', 'dpoName'].includes(key)) merged[key] = value;
            continue;
        }
        if (Array.isArray(value) && value.length === 0) continue;
        merged[key] = value;
    }
    return merged as unknown as SiteSettings;
}
