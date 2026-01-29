import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Target, Rocket } from "lucide-react";
import { Upload, Sparkles, Brain, ArrowRight, Zap } from "lucide-react";




export default function Home() {

  const audiences = [
    { icon: GraduationCap, label: "University Students" },
    { icon: BookOpen, label: "High Schoolers" },
    { icon: Briefcase, label: "Professionals" },
    { icon: Users, label: "Educators" },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Study Smarter, Not Harder",
      description: "Save hours of manual flashcard creation. Our AI does the heavy lifting while you focus on learning.",
      gradient: "from-primary to-[hsl(190,80%,50%)]",
    },
    {
      icon: TrendingUp,
      title: "Achieve Greater Results",
      description: "Spaced repetition algorithms ensure you review material at optimal intervals for maximum retention.",
      gradient: "from-accent to-[hsl(320,70%,55%)]",
    },
  ];

  const features = [
    { icon: Target, text: "AI-powered question generation" },
    { icon: Rocket, text: "Progress tracking & analytics" },
  ];

  const steps = [
  {
    icon: Upload,
    title: "Upload Document",
    description: "Drop any PDF, DOCX, or paste text directly. We support lecture notes, textbooks, and study guides.",
  },
  {
    icon: Sparkles,
    title: "Generate Cards",
    description: "Our AI analyzes your content and creates comprehensive flashcards with questions and answers.",
  },
  {
    icon: Brain,
    title: "Practice & Learn",
    description: "Study with spaced repetition algorithms that adapt to your learning pace for maximum retention.",
  },
];

  return (

    <div className="min-h-screen ">
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Learning
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Turn Any Document Into{" "}
            <span className="gradient-text">Smart Flashcards</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Upload your notes, textbooks, or any document. Our AI creates perfectly structured flashcards to help you study smarter, not harder.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="group">
              Start Learning Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-outline" size="xl">
              See How It Works
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-4 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 border-2 border-background"
                />
              ))}
            </div>
            <span>
              Trusted by <span className="text-foreground font-medium">10,000+</span> students worldwide
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">FlashMind</span> Helps You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your study materials into interactive flashcards in seconds
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="glass-card rounded-2xl p-8 h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Step number */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Who Benefits */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Who Benefits From{" "}
                <span className="gradient-text">FlashMind</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you're cramming for exams, learning a new language, or preparing for professional certifications, FlashMind adapts to your learning style and helps you achieve your goals faster.
              </p>

              {/* Audience tags */}
              <div className="grid grid-cols-2 gap-4">
                {audiences.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden glow animate-float">
                {/* Add Image later */}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 border border-border/50 animate-float-delayed">
                <div className="text-2xl font-bold gradient-text">94%</div>
                <div className="text-sm text-muted-foreground">Retention rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefit Section */}

      <section id="benefits" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Unlock Your <span className="gradient-accent-text">Learning Potential</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the difference that smart study tools can make
            </p>
          </div>

          {/* Benefit cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional features */}
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary/50 border border-border/50"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>










    </div>
  );
}