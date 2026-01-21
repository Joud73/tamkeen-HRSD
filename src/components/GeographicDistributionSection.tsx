import { useEffect, useState, useRef } from "react";
import SaudiHeatmapMap from "./geographic/SaudiHeatmapMap";
import RegionDetailsPanel from "./geographic/RegionDetailsPanel";
import { regions, RegionData } from "./geographic/types";

const GeographicDistributionSection = () => {
  const [startCounting, setStartCounting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleRegionSelect = (region: RegionData | null) => {
    setSelectedRegion(region);
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-white min-h-0">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 text-right text-black"
            style={{
              fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
            }}
          >
            التوزيع الجغرافي للإشراف الفني
          </h2>
          <p className="text-gray-600 text-right font-hrsd-regular text-base">
            انقر على أي منطقة لعرض التفاصيل
          </p>
        </div>

        {/* Map and Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-[calc(100vh-220px)] lg:max-h-[500px]">
          {/* Map - Right side on desktop (RTL) */}
          <div className="lg:col-span-7 order-1 h-full">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 h-full">
              <SaudiHeatmapMap
                regions={regions}
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>
          </div>

          {/* Details Panel - Left side on desktop (RTL) */}
          <div className="lg:col-span-5 order-2 h-full">
            <RegionDetailsPanel
              selectedRegion={selectedRegion}
              onClose={() => setSelectedRegion(null)}
              startCounting={startCounting}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeographicDistributionSection;
