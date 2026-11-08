const steps = [
    {
        title: 'Você conta o que precisa',
        text: 'Pelo formulário ou WhatsApp. Fotos do local ajudam a adiantar o orçamento.',
    },
    {
        title: 'Medição no local',
        text: 'Agendamos a visita técnica em até 48h após o contato para medir com precisão.',
    },
    {
        title: 'Projeto e orçamento',
        text: 'Você recebe o projeto com materiais, prazo e valor detalhados antes de fechar.',
    },
    {
        title: 'Fabricação e instalação',
        text: 'Box e vidros em 10 a 15 dias úteis, esquadrias em 20 a 30. Instalação com equipe própria.',
    },
];

export default function Process() {
    return (
        <section id="como-funciona" className="py-16 sm:py-20 lg:py-24 bg-mist">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-wide text-balance text-3xl sm:text-4xl font-bold text-ink leading-[1.08] max-w-xl">
                    Do primeiro contato à instalação
                </h2>

                <ol className="mt-10 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {steps.map((step, i) => (
                        <li key={step.title} className="relative pt-6 border-t-2 border-ink/15">
                            <span
                                className="absolute -top-[2px] left-0 h-[2px] bg-teal"
                                style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                                aria-hidden="true"
                            />
                            <span className="font-wide text-sm font-bold text-teal">Etapa {i + 1}</span>
                            <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
