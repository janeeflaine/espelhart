'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/lib/SettingsContext';

export default function Footer() {
    const settings = useSettings();

    return (
        <footer className="bg-espelhart-darkest text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Col 1: Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-espelhart-accent rounded-lg flex items-center justify-center text-white font-bold">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-wider">
                                ESPEL<span className="text-espelhart-accent">HART</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Referência em vidraçaria e esquadrias de alumínio de alto padrão.
                            Qualidade, transparência e durabilidade em cada detalhe de vidros e esquadrias.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {settings.instagram && (
                                <a
                                    href={settings.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-espelhart-medium rounded-xl flex items-center justify-center hover:bg-espelhart-accent transition-colors"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        46:                                     </svg>
                                    47:                                 </a>
48:                             )}
                            49:                             {settings.facebook && (
                                50:                                 <a
51:                                     href={settings.facebook}
                            52:                                     target="_blank"
                            53:                                     rel="noopener noreferrer"
                            54:                                     className="w-10 h-10 bg-espelhart-medium rounded-xl flex items-center justify-center hover:bg-espelhart-accent transition-colors"
                            55:                                     aria-label="Facebook"
56:                                 >
                            57:                                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                58:                                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                59:                                     </svg>
                            60:                                 </a>
61:                             )}
                        62:                         </div>
                    63:                     </div>
                64:
                65:                     {/* Col 2: Quick Links */}
                66:                     <div>
                    67:                         <h4 className="text-lg font-bold mb-4 text-white">Links Rápidos</h4>
                    68:                         <ul className="space-y-3">
                        69:                             {[
                            70:                                 {href: '/#inicio', label: 'Início' },
                        71:                                 {href: '/#servicos', label: 'Nossos Serviços' },
                        72:                                 {href: '/#sobre', label: 'Sobre Nós' },
                        73:                                 {href: '/#depoimentos', label: 'Depoimentos' },
                        74:                                 {href: '/#faq', label: 'Perguntas Frequentes' },
75:                             ].map((link) => (
                        76:                                 <li key={link.href}>
                            77:                                     <a
78:                                         href={link.href}
                            79:                                         className="text-gray-400 hover:text-espelhart-accent transition-colors text-sm"
80:                                     >
                            81:                                         {link.label}
                            82:                                     </a>
                        83:                                 </li>
84:                             ))}
                    85:                         </ul>
                86:                     </div>
            87:
            88:                     {/* Col 3: Services */}
            89:                     <div>
                90:                         <h4 className="text-lg font-bold mb-4 text-white">Serviços</h4>
                91:                         <ul className="space-y-3">
                    92:                             {[
                        93:                                 'Box para Banheiro',
                    94:                                 'Esquadrias de Alumínio',
                    95:                                 'Guarda-Corpo de Vidro',
                    96:                                 'Vidros Temperados',
                    97:                                 'Espelhos Decorativos',
98:                             ].map((service) => (
                    99:                                 <li key={service}>
                        100:                                     <a
101:                                         href="/#servicos"
                        102:                                         className="text-gray-400 hover:text-espelhart-accent transition-colors text-sm"
103:                                     >
                        104:                                         {service}
                        105:                                     </a>
                    106:                                 </li>
107:                             ))}
                108:                         </ul>
            109:                     </div>
110:
    111: {/* Col 4: Contact */ }
    112: <div>
        113:                         <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
        114:                         <ul className="space-y-4">
            115:                             <li className="flex items-center gap-3">
                116:                                 <Phone className="w-4 h-4 text-espelhart-accent shrink-0" />
                117:                                 <span className="text-gray-400 text-sm">{settings.phone}</span>
                118:                             </li>
            119:                             <li className="flex items-center gap-3">
                120:                                 <Mail className="w-4 h-4 text-espelhart-accent shrink-0" />
                121:                                 <span className="text-gray-400 text-sm">{settings.email}</span>
                122:                             </li>
            123:                             <li className="flex items-start gap-3">
                124:                                 <MapPin className="w-4 h-4 text-espelhart-accent shrink-0 mt-0.5" />
                125:                                 <span className="text-gray-400 text-sm whitespace-pre-line">
                    126:                                     {settings.address}
                    127:                                 </span>
                128:                             </li>
            129:                         </ul>
        130:                     </div>
    131:                 </div >
        132:
    133: {/* Copyright */ }
    134: <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        135:                     <p className="text-xs text-gray-500 text-center sm:text-left">
            136:                         {settings.footerText || `© ${new Date().getFullYear()} Espelhart Vidros e Esquadrias. Todos os direitos reservados.`}
            137:                     </p>
        138:                     <div className="flex items-center gap-4 text-xs text-gray-500">
            139:                         <Link href="/politica-de-privacidade" className="hover:text-gray-300 transition-colors">
                140:                             Política de Privacidade
                141:                         </Link>
            142:                         <span>|</span>
            143:                         <Link href="/termos-de-uso" className="hover:text-gray-300 transition-colors">
                144:                             Termos de Uso
                145:                         </Link>
            146:                     </div>
        147:                 </div>
    148:             </div >
        149:         </footer >
            150:     );
    151:
}
