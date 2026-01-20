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
const OrbitGraphic = () => <svg viewBox="0 0 120 120" className="w-20 h-20 absolute left-4 bottom-4">
    {/* Multiple curved ellipses forming orbit pattern */}
    {[...Array(8)].map((_, i) => <ellipse key={i} cx="30" cy="60" rx={20 + i * 8} ry={35 + i * 5} fill="none" stroke={i % 2 === 0 ? "#f5961e" : "#1a9b8e"} strokeWidth="1.5" transform="rotate(-25 30 60)" opacity={0.4 + i * 0.05} />)}
    {/* Star/palm icon in center */}
    <image href={favIcon} x="10" y="40" width="40" height="40" />
  </svg>;

// Region Card Component
const RegionCard = ({
  region,
  startCounting
}: {
  region: typeof regions[0];
  startCounting: boolean;
}) => {
  const count = useCountUp(region.count, 1500, startCounting);
  return <div className="region-card min-h-[140px] flex items-center justify-center">
      <OrbitGraphic />
      <div className="relative z-10 text-center">
        <div className="text-4xl md:text-5xl font-hrsd-bold text-primary mb-1">
          {count}
        </div>
        <div className="text-lg font-hrsd-medium text-accent">
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
  return <div className="region-card min-h-[140px] flex items-center justify-center col-span-full">
      <OrbitGraphic />
      <div className="relative z-10 text-center">
        <div className="text-4xl md:text-5xl font-hrsd-bold text-primary mb-1">
          {count}
        </div>
        <div className="text-lg font-hrsd-medium text-accent">
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
        <div className="text-right mb-12">
          <h2 className="section-title text-black">التوزيع الجغرافي للإشراف الفني</h2>
          <div className="section-title-underline" />
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
          <div className="stats-card-teal py-8">
            <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
              +{orgCount}
            </div>
            <div className="text-xl font-hrsd-medium">
              {summaryStats[0].label}
            </div>
          </div>
          <div className="stats-card-teal py-8">
            <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
              +{foundationCount}
            </div>
            <div className="text-xl font-hrsd-medium">
              {summaryStats[1].label}
            </div>
          </div>
        </div>

        {/* Total Card */}
        <div className="stats-card-navy py-8">
          <div className="text-5xl md:text-6xl font-hrsd-bold mb-2">
            {total}+
          </div>
          <div className="text-xl font-hrsd-medium">
            الإجمالي
          </div>
        </div>
      </div>
    </section>;
};
export default GeographicDistributionSection;