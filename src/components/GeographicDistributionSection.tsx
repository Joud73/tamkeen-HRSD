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
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-right text-black"
            style={{
              fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
            }}
          >
            التوزيع الجغرافي للإشراف الفني
          </h2>
          <p className="text-gray-600 text-right font-hrsd-regular text-lg">
            انقر على أي منطقة لعرض التفاصيل
          </p>
        </div>

        {/* Map and Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map - Right side on desktop (RTL) */}
          <div className="lg:col-span-7 order-1">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <SaudiHeatmapMap
                regions={regions}
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>
          </div>

          {/* Details Panel - Left side on desktop (RTL) */}
          <div className="lg:col-span-5 order-2">
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
