import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { CompanyIdentity } from '@/components/LegalDynamicContent';

export const metadata: Metadata = {
    title: 'Termos de Uso | Espelhart Vidros e Esquadrias',
    description:
        'Termos de Uso da Espelhart Vidros e Esquadrias. Conheça as condições de uso do nosso site e dos nossos serviços.',
    alternates: { canonical: '/termos-de-uso' },
};

const toc = [
    { id: 'identificacao', label: 'Quem somos' },
    { id: 'aceitacao', label: 'Aceitação' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'orcamentos', label: 'Orçamentos e contratação' },
    { id: 'garantia', label: 'Garantia' },
    { id: 'uso', label: 'Uso do site' },
    { id: 'propriedade', label: 'Propriedade intelectual' },
    { id: 'responsabilidade', label: 'Responsabilidade' },
    { id: 'privacidade', label: 'Privacidade' },
    { id: 'foro', label: 'Lei aplicável e foro' },
];

export default function TermsPage() {
    return (
        <LegalPage
            title="Termos de Uso"
            intro="Condições para usar este site e contratar os serviços da Espelhart. Nada aqui reduz os direitos que você tem pelo Código de Defesa do Consumidor."
            updated="8 de novembro de 2026"
            toc={toc}
        >
            <LegalSection id="identificacao" title="1. Quem somos">
                <CompanyIdentity />
            </LegalSection>

            <LegalSection id="aceitacao" title="2. Aceitação">
                <p>
                    Ao usar este site, você concorda com estes Termos de Uso. Se não concordar com alguma condição, pedimos que não use
                    o site. Podemos atualizar estes termos, e a data da última atualização fica sempre no topo da página.
                </p>
            </LegalSection>

            <LegalSection id="servicos" title="3. Serviços">
                <p>
                    A Espelhart oferece serviços de vidraçaria e esquadrias, como box para banheiro, esquadrias de alumínio, portas,
                    guarda-corpo, fachadas, vidros temperados e espelhos. As fotos e descrições do site ilustram trabalhos já feitos;
                    cada projeto é definido no orçamento, conforme as medidas e especificações do local.
                </p>
            </LegalSection>

            <LegalSection id="orcamentos" title="4. Orçamentos e contratação">
                <p>
                    O pedido de orçamento pelo site é gratuito e não gera nenhum compromisso de contratação. Os orçamentos têm validade
                    de 15 (quinze) dias a partir da emissão, salvo indicação diferente no próprio orçamento. A contratação só se
                    concretiza após a sua aprovação formal do orçamento e, quando combinado, o pagamento da entrada.
                </p>
                <p>
                    Quando a contratação acontecer fora do nosso estabelecimento, por exemplo pelo WhatsApp ou telefone, ficam
                    garantidos os direitos do art. 49 do Código de Defesa do Consumidor, inclusive o direito de arrependimento no prazo
                    de 7 dias, nas hipóteses previstas em lei.
                </p>
            </LegalSection>

            <LegalSection id="garantia" title="5. Garantia">
                <p>
                    <strong>Instalação e mão de obra: 1 (um) ano.</strong> Todo serviço executado pela Espelhart tem garantia
                    contratual de 12 meses contra defeitos de instalação, contados da data de conclusão do serviço. Ela cobre, por
                    exemplo, problemas de fixação, prumo e alinhamento, vedação e funcionamento de portas, janelas e box causados pela
                    instalação.
                </p>
                <p>
                    <strong>Materiais: garantia do fabricante.</strong> Vidros, perfis de alumínio, ferragens, fechaduras e acessórios
                    têm a garantia dada pelos respectivos fabricantes, no prazo e nas condições informados por eles. Se um material
                    apresentar defeito de fabricação, a Espelhart faz a avaliação e cuida do acionamento junto ao fabricante.
                </p>
                <p>
                    <strong>Garantia legal.</strong> A garantia contratual é complementar à garantia legal prevista no Código de Defesa
                    do Consumidor (arts. 26 e 50 da Lei nº 8.078/90) e não a substitui.
                </p>
                <p>
                    <strong>O que a garantia não cobre:</strong>
                </p>
                <ul>
                    <li>quebra ou trinca de vidro causada por impacto, batida, choque térmico ou acidente;</li>
                    <li>uso inadequado, força excessiva ou uso diferente do previsto para o produto;</li>
                    <li>consertos, ajustes ou modificações feitos por terceiros;</li>
                    <li>
                        falta de manutenção ou limpeza com produtos abrasivos, ácidos ou solventes que danifiquem vidros, perfis e
                        borrachas;
                    </li>
                    <li>
                        problemas da própria obra, como recalque, trincas na alvenaria, infiltração ou desnível surgidos depois da
                        instalação;
                    </li>
                    <li>desgaste natural de peças de uso contínuo, como roldanas, escovas e vedações, após o período de garantia;</li>
                    <li>eventos de força maior, como enchentes, vendavais e descargas elétricas.</li>
                </ul>
                <p>
                    <strong>Como acionar.</strong> Fale conosco pelo WhatsApp ou e-mail com o nome do contratante, o endereço da obra
                    e fotos ou vídeo do problema. Dentro da garantia, a visita técnica de avaliação não tem custo. Constatado defeito
                    coberto, o reparo é feito sem custo, no prazo máximo de 30 dias, conforme o art. 18 do Código de Defesa do
                    Consumidor.
                </p>
                <p>
                    <strong>Cuidados recomendados:</strong> limpar vidros e perfis com pano macio, água e sabão neutro; manter trilhos
                    limpos e livres de detritos; não forçar portas e janelas que estiverem travando, e nos chamar para ajuste.
                </p>
            </LegalSection>

            <LegalSection id="uso" title="6. Uso do site">
                <p>
                    Você se compromete a usar o site de forma lícita, sem tentar acessar áreas restritas, interferir no seu
                    funcionamento ou enviar informações falsas. O site tem links para serviços de terceiros, como WhatsApp e Instagram,
                    que seguem os próprios termos e políticas.
                </p>
            </LegalSection>

            <LegalSection id="propriedade" title="7. Propriedade intelectual">
                <p>
                    Textos, fotos de obras, logotipo e layout do site pertencem à Espelhart ou a quem nos licenciou o uso, e são
                    protegidos pela Lei de Direitos Autorais (Lei nº 9.610/98). Não é permitido copiá-los para fins comerciais sem
                    autorização.
                </p>
            </LegalSection>

            <LegalSection id="responsabilidade" title="8. Responsabilidade">
                <p>
                    Trabalhamos para manter as informações do site corretas e atualizadas, mas preços, prazos e condições só valem
                    quando constam do orçamento. Nossa responsabilidade pelos serviços prestados segue o Código de Defesa do
                    Consumidor e a legislação aplicável.
                </p>
            </LegalSection>

            <LegalSection id="privacidade" title="9. Privacidade">
                <p>
                    O tratamento dos seus dados pessoais está descrito na nossa{' '}
                    <Link href="/politica-de-privacidade" className="font-semibold text-ink underline decoration-teal underline-offset-2">
                        Política de Privacidade
                    </Link>
                    .
                </p>
            </LegalSection>

            <LegalSection id="foro" title="10. Lei aplicável e foro">
                <p>
                    Estes termos são regidos pelas leis brasileiras. Fica eleito o foro de Brasília/DF para resolver eventuais
                    conflitos, ressalvado o direito do consumidor de propor a ação no foro do seu domicílio, conforme o art. 101, I, do
                    Código de Defesa do Consumidor.
                </p>
            </LegalSection>
        </LegalPage>
    );
}
