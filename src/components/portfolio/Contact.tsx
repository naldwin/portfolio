import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    toast.success("Message sent! I'll get back to you soon.");
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

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
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="mailto:naldwincuengco@gmail.com"
              className="block glass-card rounded-2xl p-5 hover-lift group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-muted-foreground uppercase">Email</p>
                  <p className="font-medium truncate">naldwincuengco@gmail.com</p>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/naldwin"
              target="_blank"
              rel="noreferrer"
              className="block glass-card rounded-2xl p-5 hover-lift group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary grid place-items-center shadow-glow-purple group-hover:scale-110 transition-transform shrink-0">
                  <Github className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-muted-foreground uppercase">GitHub</p>
                  <p className="font-medium truncate">github.com/naldwin</p>
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/naldwincuengco"
              target="_blank"
              rel="noreferrer"
              className="block glass-card rounded-2xl p-5 hover-lift group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent grid place-items-center shadow-glow-teal group-hover:scale-110 transition-transform shrink-0">
                  <Linkedin className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-muted-foreground uppercase">LinkedIn</p>
                  <p className="font-medium truncate">linkedin.com/in/naldwincuengco</p>
                </div>
              </div>
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 glass-card rounded-3xl p-6 md:p-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-background/50 border-border h-11"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-background/50 border-border h-11"
                placeholder="you@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-mono uppercase tracking-wider">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-background/50 border-border min-h-32 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <Button
              type="submit"
              disabled={sending || sent}
              className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow text-base font-semibold group"
            >
              {sent ? (
                <>
                  <Check className="mr-2 h-5 w-5 animate-scale-in" />
                  Sent!
                </>
              ) : sending ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-primary-foreground animate-ping mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  Let's build something
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="font-mono">
            © 2025 <span className="gradient-text font-semibold">Naldwin Cuengco</span> · Crafted with React + Tailwind
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
