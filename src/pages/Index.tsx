import AppHeader from "@/components/AppHeader";
import HeroGov from "@/components/gov/HeroGov";
import SupervisionSpecialtiesSection from "@/components/gov/SupervisionSpecialtiesSection";
import GeographicDistributionSection from "@/components/GeographicDistributionSection";
import GovFooter from "@/components/gov/GovFooter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader variant="main" />
      <main>
        <HeroGov />
        <SupervisionSpecialtiesSection />
        <GeographicDistributionSection />
      </main>
      <GovFooter />
    </div>
  );
};

export default Index;
