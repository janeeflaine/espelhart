'use client';

import { useSettings } from '@/lib/SettingsContext';

export default function Process() {
    const settings = useSettings();
    const steps = settings.processSteps.filter((s) => s.title);

    return (
        <section id="como-funciona" className="py-16 sm:py-20 lg:py-24 bg-mist">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-wide text-balance text-3xl sm:text-4xl font-bold text-ink leading-[1.08] max-w-xl">
                    {settings.processTitle}
                </h2>

                <ol className={`mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6 ${steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    {steps.map((step, i) => (
                        <li key={i} className="relative pt-6 border-t-2 border-ink/15">
                            <span
                                className="absolute -top-[2px] left-0 h-[2px] bg-teal"
                                style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                                aria-hidden="true"
                            />
                            <span className="font-wide text-sm font-bold text-teal">Etapa {i + 1}</span>
                            <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
