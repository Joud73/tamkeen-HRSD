import { useEffect, useState, useRef } from "react";
import favIcon from "@/assets/icons/fav.png";

// Region data with exact numbers from the screenshots
const regions = [{
  name: "الرياض",
  count: 394
}, {
  name: "القصيم",
  count: 203
}, {
  name: "المنطقة الشرقية",
  count: 192
}, {
  name: "المدينة المنورة",
  count: 132
}, {
  name: "مكة المكرمة",
  count: 424
}, {
  name: "حائل",
  count: 151
}, {
  name: "جازان",
  count: 112
}, {
  name: "نجران",
  count: 112
}, {
  name: "عسير",
  count: 219
}, {
  name: "الباحة",
  count: 78
}, {
  name: "الحدود الشمالية",
  count: 36
}, {
  name: "الجوف",
  count: 53
}, {
  name: "تبوك",
  count: 65
}];
const summaryStats = [{
  label: "منظمة اهلية",
  count: 1938
}, {
  label: "مؤسسة اهلية",
  count: 41
}];
const totalCount = 1978;

// Count-up animation hook
const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);
  return count;
};

// Orbit graphic SVG component - matches the curved lines in screenshot
const OrbitGraphic = () => null;

// Region Card Component
const RegionCard = ({
  region,
  startCounting
}: {
  region: typeof regions[0];
  startCounting: boolean;
}) => {
  const count = useCountUp(region.count, 1500, startCounting);
  return <div className="min-h-[140px] flex items-center justify-center rounded-xl border-2 relative cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:border-[#14573A]" style={{
    backgroundColor: '#F3F4F6',
    borderColor: '#1B8354'
  }}>
      <OrbitGraphic />
      <div className="relative z-10 text-center transition-transform duration-300">
        <div className="text-4xl md:text-5xl font-hrsd-bold mb-1 transition-colors duration-300" style={{
        color: '#1B8354'
      }}>
          {count}
        </div>
        <div className="text-lg font-hrsd-medium text-black">
          {region.name}
        </div>
      </div>
    </div>;
};

// Full width region card for Tabuk
const FullWidthRegionCard = ({
  region,
  startCounting
}: {
  region: typeof regions[0];
  startCounting: boolean;
}) => {
  const count = useCountUp(region.count, 1500, startCounting);
  return <div className="min-h-[140px] flex items-center justify-center col-span-full rounded-xl border-2 relative cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:border-[#14573A]" style={{
    backgroundColor: '#F3F4F6',
    borderColor: '#1B8354'
  }}>
      <OrbitGraphic />
      <div className="relative z-10 text-center transition-transform duration-300">
        <div className="text-4xl md:text-5xl font-hrsd-bold mb-1 transition-colors duration-300" style={{
        color: '#1B8354'
      }}>
          {count}
        </div>
        <div className="text-lg font-hrsd-medium text-black">
          {region.name}
        </div>
      </div>
    </div>;
};
const GeographicDistributionSection = () => {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orgCount = useCountUp(summaryStats[0].count, 2000, startCounting);
  const foundationCount = useCountUp(summaryStats[1].count, 2000, startCounting);
  const total = useCountUp(totalCount, 2500, startCounting);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setStartCounting(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-right text-black" style={{
          fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif"
        }}>التوزيع الجغرافي للإشراف الفني</h2>
          {/* Decorative lines */}
          <div className="flex justify-end gap-2">
            
          </div>
        </div>

        {/* Region Cards Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {regions.slice(0, 12).map((region, index) => <RegionCard key={index} region={region} startCounting={startCounting} />)}
        </div>

        {/* Tabuk - Full width */}
        <div className="mb-8">
          <FullWidthRegionCard region={regions[12]} startCounting={startCounting} />
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl py-8 text-center text-white" style={{
          backgroundColor: '#1D4D37'
        }}>
            <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
              +{orgCount}
            </div>
            <div className="text-xl font-hrsd-medium">
              {summaryStats[0].label}
            </div>
          </div>
          <div className="rounded-xl py-8 text-center text-white" style={{
          backgroundColor: '#1D4D37'
        }}>
            <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
              +{foundationCount}
            </div>
            <div className="text-xl font-hrsd-medium">
              {summaryStats[1].label}
            </div>
          </div>
        </div>

        {/* Total Card */}
        <div className="rounded-xl py-8 text-center text-white" style={{
        backgroundColor: '#1D4D37'
      }}>
          <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
            +{total}
          </div>
          <div className="text-xl font-hrsd-medium">
            الإجمالي
          </div>
        </div>
      </div>
    </section>;
};
export default GeographicDistributionSection;