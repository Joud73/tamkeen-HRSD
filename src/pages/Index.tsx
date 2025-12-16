import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import GeographicDistributionSection from "@/components/GeographicDistributionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SpecializationsSection />
        <GeographicDistributionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
