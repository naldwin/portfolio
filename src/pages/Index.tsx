import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import GithubActivity from "@/components/portfolio/GithubActivity";
import Contact from "@/components/portfolio/Contact";
import BackToTop from "@/components/portfolio/BackToTop";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Naldwin Cuengco — Junior Full Stack Developer";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Naldwin Cuengco — Junior Full Stack Developer building scalable web apps, dashboards and secure healthcare systems with React, Angular & Node.js.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GithubActivity />
      <Contact />
      <BackToTop />
    </main>
  );
};

export default Index;
