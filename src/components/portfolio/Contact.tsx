import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center space-y-3">
          <p className="font-mono text-sm text-primary tracking-widest uppercase">
            05 — Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Let's build <span className="gradient-text">something</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <a
            href="mailto:naldwincuengco@gmail.com"
            className="glass-card rounded-2xl p-6 hover-lift group transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-110 transition-transform shrink-0">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Email
                </p>
                <p className="font-medium truncate">naldwincuengco@gmail.com</p>
              </div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/naldwincuengco"
            target="_blank"
            rel="noreferrer"
            className="glass-card rounded-2xl p-6 hover-lift group transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent grid place-items-center shadow-glow-teal group-hover:scale-110 transition-transform shrink-0">
                <Linkedin className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  LinkedIn
                </p>
                <p className="font-medium truncate">
                  linkedin.com/in/naldwincuengco
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="font-mono">
            2026{" "}
            <span className="gradient-text font-semibold">Naldwin Cuengco</span>{" "}
            · Crafted with React + Tailwind
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
