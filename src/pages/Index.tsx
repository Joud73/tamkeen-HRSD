import GovHeader from "@/components/gov/GovHeader";
import HeroGov from "@/components/gov/HeroGov";
import QuickAccessGrid from "@/components/gov/QuickAccessGrid";
import ServicesExplorer from "@/components/gov/ServicesExplorer";
import KpiBand from "@/components/gov/KpiBand";
import NewsPreview from "@/components/gov/NewsPreview";
import PlatformsGrid from "@/components/gov/PlatformsGrid";
import ContactSupport from "@/components/gov/ContactSupport";
import GovFooter from "@/components/gov/GovFooter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GovHeader />
      <main>
        <HeroGov />
        <QuickAccessGrid />
        <ServicesExplorer />
        <KpiBand />
        <NewsPreview />
        <PlatformsGrid />
        <ContactSupport />
      </main>
      <GovFooter />
    </div>
  );
};

export default Index;
