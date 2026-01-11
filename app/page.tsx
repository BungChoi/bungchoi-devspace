/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { HeroSection, HobiSection, ShowcaseProjectsSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* My Activity Section - Spotify & GitHub */}
      <HobiSection />

      {/* Showcase Projects Section */}
      <ShowcaseProjectsSection />

      {/* Future sections: */}
      {/* <BlogPreviewSection /> */}
      {/* <Footer /> */}
    </main>
  );
}
