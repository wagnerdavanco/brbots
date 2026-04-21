import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { AdvantagesSection } from "@/components/sections/advantages";
import { MetricsSection } from "@/components/sections/metrics";
import { CasesSection } from "@/components/sections/cases";
import { DifferentialsSection } from "@/components/sections/differentials";
import { ApplicationsSection } from "@/components/sections/applications";
import { ContactSection } from "@/components/sections/contact";
import { LocationSection } from "@/components/sections/location";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        <MetricsSection />
        <CasesSection />
        <DifferentialsSection />
        <ApplicationsSection />
        <ContactSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
