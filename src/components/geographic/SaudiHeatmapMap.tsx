import { useState, useCallback, useMemo } from "react";
import { RegionData, getHeatmapColor } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// SVG paths for Saudi Arabia regions (simplified accurate representation)
const regionPaths: Record<string, string> = {
  riyadh: "M 180 160 L 220 140 L 280 150 L 300 180 L 290 230 L 260 260 L 220 270 L 180 250 L 160 210 L 170 180 Z",
  makkah: "M 80 200 L 120 180 L 160 190 L 170 220 L 150 260 L 120 280 L 90 270 L 70 240 L 75 215 Z",
  madinah: "M 90 130 L 130 120 L 160 130 L 170 160 L 160 190 L 130 200 L 100 190 L 80 160 L 85 140 Z",
  qassim: "M 160 100 L 200 90 L 240 100 L 250 130 L 230 160 L 190 170 L 160 160 L 150 130 Z",
  eastern: "M 280 100 L 350 80 L 400 120 L 410 180 L 390 250 L 340 290 L 290 270 L 270 220 L 280 160 Z",
  hail: "M 140 60 L 190 50 L 230 65 L 240 100 L 210 130 L 170 135 L 140 115 L 130 85 Z",
  asir: "M 100 270 L 140 260 L 180 280 L 190 320 L 170 360 L 130 370 L 100 350 L 90 310 Z",
  najran: "M 170 340 L 210 330 L 250 350 L 260 390 L 240 420 L 200 430 L 170 410 L 160 375 Z",
  jazan: "M 70 340 L 100 330 L 130 350 L 135 390 L 115 420 L 85 425 L 65 400 L 60 370 Z",
  jawf: "M 100 30 L 140 20 L 180 30 L 185 60 L 160 85 L 120 90 L 95 70 L 90 50 Z",
  northern: "M 180 20 L 240 10 L 300 25 L 310 60 L 280 90 L 230 95 L 190 75 L 175 45 Z",
  baha: "M 90 260 L 115 255 L 135 270 L 138 295 L 120 315 L 95 318 L 80 300 L 82 275 Z",
  tabuk: "M 50 50 L 100 35 L 130 50 L 135 90 L 110 125 L 70 130 L 40 105 L 35 75 Z",
};

interface SaudiHeatmapMapProps {
  regions: RegionData[];
  selectedRegion: RegionData | null;
  onRegionSelect: (region: RegionData | null) => void;
}

const SaudiHeatmapMap = ({
  regions,
  selectedRegion,
  onRegionSelect,
}: SaudiHeatmapMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const { min, max } = useMemo(() => {
    const counts = regions.map((r) => r.count);
    return { min: Math.min(...counts), max: Math.max(...counts) };
  }, [regions]);

  const regionMap = useMemo(() => {
    return new Map(regions.map((r) => [r.id, r]));
  }, [regions]);

  const handleRegionClick = useCallback(
    (regionId: string) => {
      const region = regionMap.get(regionId);
      if (region) {
        onRegionSelect(selectedRegion?.id === regionId ? null : region);
      }
    },
    [regionMap, onRegionSelect, selectedRegion]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, regionId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRegionClick(regionId);
      }
    },
    [handleRegionClick]
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto">
        <svg
          viewBox="0 0 450 450"
          className="w-full h-full"
          role="img"
          aria-label="خريطة المملكة العربية السعودية التفاعلية"
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="450"
            height="450"
            fill="#F9FAFB"
            rx="8"
          />

          {/* Regions */}
          {Object.entries(regionPaths).map(([id, path]) => {
            const region = regionMap.get(id);
            if (!region) return null;

            const fillColor = getHeatmapColor(region.count, min, max);
            const isHovered = hoveredRegion === id;
            const isSelected = selectedRegion?.id === id;

            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <path
                    d={path}
                    fill={fillColor}
                    stroke={isSelected ? "#1D4D37" : isHovered ? "#14573A" : "#FFFFFF"}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.5}
                    className="cursor-pointer transition-all duration-200 outline-none focus:outline-none"
                    style={{
                      filter: isHovered || isSelected ? "brightness(0.95)" : "none",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                      transformOrigin: "center",
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${region.name}: ${region.count} إشراف`}
                    onMouseEnter={() => setHoveredRegion(id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(id)}
                    onKeyDown={(e) => handleKeyDown(e, id)}
                    onFocus={() => setHoveredRegion(id)}
                    onBlur={() => setHoveredRegion(null)}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-white border border-gray-200 shadow-lg px-4 py-3 rounded-lg z-50"
                  dir="rtl"
                >
                  <div className="text-center">
                    <p className="font-hrsd-bold text-[#1D4D37] text-lg mb-1">
                      {region.name}
                    </p>
                    <p className="font-hrsd-medium text-gray-700">
                      <span className="text-2xl font-hrsd-bold text-[#1B8354]">
                        {region.count}
                      </span>{" "}
                      إشراف
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-gray-100">
          <p className="text-xs font-hrsd-medium text-gray-600 mb-2 text-right">
            مقياس الكثافة
          </p>
          <div className="flex items-center gap-1">
            {["#E8F5E9", "#A5D6A7", "#66BB6A", "#2E7D32", "#1B5E20"].map(
              (color, i) => (
                <div
                  key={i}
                  className="w-6 h-4 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-hrsd-regular">
            <span>أقل</span>
            <span>أكثر</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SaudiHeatmapMap;
