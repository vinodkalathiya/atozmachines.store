import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsTicker from "./components/StatsTicker";
import Categories from "./components/Categories";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import FeaturedListings from "./components/FeaturedListings";
import Industries from "./components/Industries";
import FeaturedVendors from "./components/FeaturedVendors";
import SocialProof from "./components/SocialProof";
import ForVendors from "./components/ForVendors";
import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* 1. Hero + Search */}
        <Hero />

        {/* 2. Animated stats ticker */}
        <StatsTicker />

        {/* 3. Browse categories */}
        <Categories />

        {/* 4. How it works (buyer + vendor) */}
        <HowItWorks />

        {/* 5. Why choose us vs IndiaMART */}
        <WhyUs />

        {/* 6. Featured machine listings */}
        <FeaturedListings />

        {/* 7. Industries we serve (SEO) */}
        <Industries />

        {/* 8. Featured verified vendors */}
        <FeaturedVendors />

        {/* 9. Social proof (stats + testimonials) */}
        <SocialProof />

        {/* 10. For vendors CTA with pricing preview */}
        <ForVendors />

        {/* 11. FAQ (SEO + trust) */}
        <FAQ />

        {/* 12. Final CTA banner */}
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
