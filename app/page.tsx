import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CompareSlider from "@/components/CompareSlider";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import TrustAndCta from "@/components/TrustAndCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Nav />
      <Hero />
      <CompareSlider />
      <FeatureGrid />
      <HowItWorks />
      <TrustAndCta />
      <Footer />
    </main>
  );
}
