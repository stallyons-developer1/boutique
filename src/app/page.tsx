import HeroCarousel from "@/components/shared/HeroCarousel";
import EditorialSection from "@/components/shared/EditorialSection";
import EditorialGrid from "@/components/shared/EditorialGrid";

export default function Home() {
  return (
    <>
      {/* hero — coverflow carousel (snap panel) */}
      <div className="snap-start">
        <HeroCarousel />
      </div>

      {/* editorial — interactive "look" selector (snap panel) */}
      <EditorialSection />

      {/* editorial grid — sticky image + product grid (snap panel) */}
      <EditorialGrid />
    </>
  );
}
