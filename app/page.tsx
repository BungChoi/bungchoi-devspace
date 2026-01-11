/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { Hero, About, Skills } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Future sections: */}
      {/* <Projects /> */}
      {/* <Contact /> */}

      {/* Placeholder sections for scroll testing */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Projects Section</h2>
          <p className="text-[var(--foreground-secondary)]">Coming soon...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Section</h2>
          <p className="text-[var(--foreground-secondary)]">Coming soon...</p>
        </div>
      </section>
    </main>
  );
}
