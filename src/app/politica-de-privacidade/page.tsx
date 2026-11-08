import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { CompanyIdentity, DpoContact, LegalEmailText } from '@/components/LegalDynamicContent';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Espelhart Vidros e Esquadrias',
    description:
        'Como a Espelhart trata dados pessoais de clientes e visitantes do site, em conformidade com a LGPD (Lei nº 13.709/2018).',
    alternates: { canonical: '/politica-de-privacidade' },
};

const toc = [
    { id: 'controlador', label: 'Quem cuida dos seus dados' },
    { id: 'dados', label: 'Quais dados tratamos' },
    { id: 'finalidades', label: 'Para que usamos' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'compartilhamento', label: 'Com quem compartilhamos' },
    { id: 'internacional', label: 'Transferência internacional' },
    { id: 'retencao', label: 'Por quanto tempo guardamos' },
    { id: 'direitos', label: 'Seus direitos' },
    { id: 'seguranca', label: 'Segurança' },
    { id: 'menores', label: 'Crianças e adolescentes' },
    { id: 'alteracoes', label: 'Alterações' },
];

export default function PrivacyPolicyPage() {
    return (
        <LegalPage
            title="Política de Privacidade"
            intro="Explicamos aqui, de forma direta, quais dados pessoais a Espelhart trata, por quê, com quem compartilha e como você exerce seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
            updated="8 de novembro de 2026"
            toc={toc}
        >
            <LegalSection id="controlador" title="1. Quem cuida dos seus dados">
                <p>
                    A Espelhart é a <strong>controladora</strong> dos dados pessoais tratados por meio deste site e dos nossos canais de
                    atendimento, ou seja, é quem decide como e por que esses dados são usados.
                </p>
                <CompanyIdentity />
                <DpoContact />
            </LegalSection>

            <LegalSection id="dados" title="2. Quais dados tratamos">
                <p>
                    <strong>Pedido de orçamento pelo site.</strong> O formulário pede o serviço desejado, tipo de imóvel, medidas
                    aproximadas, bairro ou cidade, prazo, seu nome e observações. Esses dados <strong>não ficam guardados no site</strong>:
                    ao tocar em enviar, eles são montados em uma mensagem que abre no seu WhatsApp, e só chegam até nós se você enviar
                    essa mensagem. A partir daí, também recebemos seu número de telefone pelo WhatsApp.
                </p>
                <p>
                    <strong>Contato direto.</strong> Quando você fala conosco por WhatsApp, telefone, e-mail ou Instagram, tratamos as
                    informações que você mesmo envia, como nome, telefone, e-mail, fotos do local e detalhes do projeto.
                </p>
                <p>
                    <strong>Contratação dos serviços.</strong> Se você fechar um serviço, podemos tratar endereço da obra, CPF ou CNPJ e
                    dados de pagamento necessários para o contrato, a emissão de nota fiscal e a garantia.
                </p>
                <p>
                    <strong>Navegação no site.</strong> Não usamos ferramentas de análise de tráfego, publicidade ou rastreamento. Como
                    qualquer site, nosso provedor de hospedagem registra dados técnicos de acesso (endereço IP, data, hora e página
                    acessada), que somos obrigados a manter pelo Marco Civil da Internet (Lei nº 12.965/2014).
                </p>
            </LegalSection>

            <LegalSection id="finalidades" title="3. Para que usamos e com qual base legal">
                <ul>
                    <li>
                        <strong>Responder seu pedido de orçamento</strong> e agendar a visita técnica: procedimentos preliminares a um
                        contrato, a seu pedido (art. 7º, V, da LGPD).
                    </li>
                    <li>
                        <strong>Executar o serviço contratado</strong>, incluindo fabricação, instalação, garantia e pós-venda: execução
                        de contrato (art. 7º, V).
                    </li>
                    <li>
                        <strong>Emitir nota fiscal e cumprir obrigações fiscais e legais</strong>: cumprimento de obrigação legal (art.
                        7º, II).
                    </li>
                    <li>
                        <strong>Guardar registros de acesso ao site e proteger o site contra abusos</strong>: cumprimento de obrigação
                        legal (art. 15 do Marco Civil da Internet) e legítimo interesse (art. 7º, IX).
                    </li>
                    <li>
                        <strong>Defender nossos direitos</strong> em eventual reclamação ou processo: exercício regular de direitos (art.
                        7º, VI).
                    </li>
                </ul>
                <p>
                    Não enviamos mensagens promocionais sem o seu consentimento. Se você autorizar e depois mudar de ideia, basta pedir
                    para sair.
                </p>
            </LegalSection>

            <LegalSection id="cookies" title="4. Cookies">
                <p>
                    Este site <strong>não usa cookies</strong> de análise, publicidade ou rastreamento. Para exibir textos e fotos
                    atualizados, o site carrega o conteúdo a partir do Google Firebase, que pode salvar no seu navegador um registro
                    técnico de funcionamento. Esse registro não identifica você e não é usado para publicidade.
                </p>
                <p>
                    Na área restrita da equipe (/admin), é guardada apenas a sessão de login dos administradores.
                </p>
            </LegalSection>

            <LegalSection id="compartilhamento" title="5. Com quem compartilhamos">
                <p>Não vendemos nem alugamos dados pessoais. Compartilhamos apenas o necessário com:</p>
                <ul>
                    <li>
                        <strong>Meta (WhatsApp e Instagram)</strong>, por onde acontece o atendimento quando você escolhe esses canais;
                    </li>
                    <li>
                        <strong>Google (Firebase)</strong>, que armazena o conteúdo do site, e <strong>Vercel</strong>, que hospeda o
                        site;
                    </li>
                    <li>
                        <strong>Contabilidade e órgãos públicos</strong>, para emissão de notas fiscais e cumprimento de obrigações
                        legais;
                    </li>
                    <li>
                        <strong>Autoridades</strong>, quando houver ordem judicial ou exigência legal.
                    </li>
                </ul>
            </LegalSection>

            <LegalSection id="internacional" title="6. Transferência internacional">
                <p>
                    Os serviços da Meta, do Google e da Vercel podem processar dados em servidores fora do Brasil, especialmente nos
                    Estados Unidos. Essas empresas adotam cláusulas contratuais e padrões de segurança reconhecidos, conforme o art. 33
                    da LGPD.
                </p>
            </LegalSection>

            <LegalSection id="retencao" title="7. Por quanto tempo guardamos">
                <ul>
                    <li>
                        <strong>Orçamentos não contratados:</strong> até 12 meses após o último contato, para retomarmos a conversa se
                        você quiser;
                    </li>
                    <li>
                        <strong>Serviços contratados e documentos fiscais:</strong> pelo prazo da garantia e pelos prazos exigidos pela
                        legislação fiscal e de defesa do consumidor (em geral, 5 anos);
                    </li>
                    <li>
                        <strong>Registros de acesso ao site:</strong> 6 meses, como exige o Marco Civil da Internet.
                    </li>
                </ul>
                <p>Depois desses prazos, os dados são eliminados ou anonimizados.</p>
            </LegalSection>

            <LegalSection id="direitos" title="8. Seus direitos">
                <p>Pelo art. 18 da LGPD, você pode, a qualquer momento e sem custo:</p>
                <ul>
                    <li>confirmar se tratamos seus dados e ter acesso a eles;</li>
                    <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
                    <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
                    <li>pedir a portabilidade dos dados a outro fornecedor;</li>
                    <li>pedir a eliminação dos dados tratados com base no seu consentimento;</li>
                    <li>saber com quem compartilhamos seus dados;</li>
                    <li>ser informado sobre a possibilidade de não dar consentimento e suas consequências;</li>
                    <li>revogar o consentimento;</li>
                    <li>se opor a um tratamento feito em desacordo com a lei.</li>
                </ul>
                <p>
                    Para exercer qualquer um desses direitos, escreva para <LegalEmailText /> ou fale conosco pelo WhatsApp. Podemos
                    pedir uma confirmação de identidade para proteger seus dados. Respondemos em até 15 dias. Se não ficar satisfeito,
                    você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD) em gov.br/anpd.
                </p>
            </LegalSection>

            <LegalSection id="seguranca" title="9. Segurança">
                <p>
                    O site usa conexão criptografada (HTTPS), e o acesso à área de administração é restrito à nossa equipe, com login
                    individual. Mesmo assim, nenhum sistema é totalmente imune a falhas. Se acontecer um incidente de segurança que
                    possa trazer risco a você, comunicaremos você e a ANPD, como determina o art. 48 da LGPD.
                </p>
            </LegalSection>

            <LegalSection id="menores" title="10. Crianças e adolescentes">
                <p>
                    Nossos serviços são voltados a adultos. Não coletamos intencionalmente dados de crianças e adolescentes. Se
                    perceber que isso aconteceu, avise-nos para eliminarmos os dados.
                </p>
            </LegalSection>

            <LegalSection id="alteracoes" title="11. Alterações desta política">
                <p>
                    Podemos atualizar esta política para refletir mudanças no site, nos serviços ou na lei. A data da última
                    atualização fica sempre no topo da página.
                </p>
            </LegalSection>
        </LegalPage>
    );
}
