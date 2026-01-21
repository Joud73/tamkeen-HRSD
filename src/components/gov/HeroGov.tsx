export default function HeroGov() {
  return (
    <section dir="rtl" className="relative min-h-[85vh] bg-[#1D4D37]">
      {/* Content Container - Far right aligned */}
      <div className="h-full min-h-[85vh] flex items-center justify-end w-full">
        <div className="py-24 md:py-32 lg:py-40 pr-8 md:pr-12 lg:pr-16 xl:pr-20 text-right">
          {/* Main Headline */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[1.4] font-hrsd-bold mb-6">
            الريادة عالمياً في تمكين الإنسان
            <br />
            والمجتمع، وتعزيز تنافسية سوق
            <br />
            العمل
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl font-hrsd-regular">
            تمكين الفرد والمجتمع والمؤسسات وخلق سوق عمل يحفز الابتكار والاستدامة ومواكبة التحولات
            <br />
            من خلال سياسات وتشريعات مرنة وفاعلة
          </p>
        </div>
      </div>
    </section>
  );
}
