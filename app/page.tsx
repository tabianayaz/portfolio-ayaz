import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Details from './components/Details';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative aurora-bg transition-colors duration-500">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Details />
      <Contact />
    </main>
  );
}
