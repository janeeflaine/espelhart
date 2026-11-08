import type { Metadata } from 'next';
import { QuoteProvider } from '@/lib/QuoteContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import Process from '@/components/Process';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

export default function Home() {
    return (
        <QuoteProvider>
            <Header />
            <main>
                <Hero />
                <ServicesGrid />
                <Process />
                <About />
                <WhyChooseUs />
                <Testimonials />
                <Contact />
                <FAQ />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </QuoteProvider>
    );
}
