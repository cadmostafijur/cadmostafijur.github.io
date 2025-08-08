'use client';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import EmailGenerator from '@/components/EmailGenerator';
import HowItWorks from '@/components/HowItWorks';
import Tips from '@/components/Tips';
import Footer from '@/components/Footer';

export default function Home() {
  const emailGeneratorRef = useRef<HTMLDivElement>(null);

  const scrollToEmailGenerator = () => {
    emailGeneratorRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={scrollToEmailGenerator} />
      <div className="pt-16"> {/* Add top padding to account for fixed navbar */}
        <Hero onGetStarted={scrollToEmailGenerator} />
        <div data-why-choose>
          <WhyChoose />
        </div>
        <div ref={emailGeneratorRef} data-email-generator>
          <EmailGenerator />
        </div>
        <div data-how-it-works>
          <HowItWorks />
        </div>
        <div data-tips>
          <Tips />
        </div>
        <Footer />
      </div>
    </div>
  );
}