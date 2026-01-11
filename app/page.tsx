/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { HeroSection, HobiSection, ShowcaseProjectsSection, BlogPreviewSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* My Activity Section - Spotify & GitHub */}
      <HobiSection />

      {/* Showcase Projects Section */}
      <ShowcaseProjectsSection />

      {/* Blog Preview Section */}
      <BlogPreviewSection />

      {/* Future sections: */}
      {/* <Footer /> */}
    </main>
  );
}
