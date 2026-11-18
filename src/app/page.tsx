import HeroCarousel from "@/components/shared/HeroCarousel";
import EditorialSection from "@/components/shared/EditorialSection";
import EditorialGrid from "@/components/shared/EditorialGrid";
import NewArrivals from "@/components/shared/NewArrivals";
import CreationsGrid from "@/components/shared/CreationsGrid";
import ImmersiveQuote from "@/components/shared/ImmersiveQuote";

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

      {/* new arrivals — centered 3-up product grid (snap panel) */}
      <NewArrivals />

      {/* selected creations — scrolling flex grid with hover zoom + reveal */}
      <CreationsGrid />

      {/* immersive quote — full-screen serif line over a parallax veiled image */}
      <ImmersiveQuote />
    </>
  );
}
