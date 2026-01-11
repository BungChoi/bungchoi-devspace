/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { Hero, HobiSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Hobi Section - Spotify & GitHub */}
      <HobiSection />

      {/* Future sections: */}
      {/* <ShowcaseProjects /> */}
      {/* <BlogPreview /> */}
      {/* <Footer /> */}
    </main>
  );
}
