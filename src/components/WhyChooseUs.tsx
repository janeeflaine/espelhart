import { Users, Cpu, Clock, ShieldCheck } from 'lucide-react';

const differentials = [
    {
        icon: Users,
        title: 'Equipe Especializada',
        description:
            'Profissionais altamente treinados e certificados para instalações complexas de vidros e esquadrias.',
    },
    {
        icon: Cpu,
        title: 'Alta Tecnologia',
        description:
            'Utilizamos maquinário de ponta e materiais de última geração para corte e acabamento perfeitos.',
    },
    {
        icon: Clock,
        title: 'Prazos Rigorosos',
        description:
            'Cronogramas respeitados do início ao fim, sem atrasos ou surpresas. Compromisso com sua obra.',
    },
    {
        icon: ShieldCheck,
        title: 'Garantia Estendida',
        description:
            'Segurança total com suporte pós-venda e garantia de fabricação em todos os nossos produtos.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-espelhart-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm">
                        Diferenciais
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-espelhart-darkest mt-2 mb-4">
                        Por que escolher a Espelhart?
                    </h2>
                    <div className="w-20 h-1 bg-espelhart-accent mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                        Combinamos técnica avançada e atendimento personalizado para garantir o sucesso da sua obra.
                    </p>
                </div>

                {/* Differentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {differentials.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover-lift border border-gray-100 hover:border-espelhart-accent/30 transition-colors text-center group"
                            >
                                <div className="w-14 h-14 bg-espelhart-accent/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-espelhart-accent group-hover:scale-110 transition-all">
                                    <Icon className="w-7 h-7 text-espelhart-accent group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-espelhart-darkest mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
