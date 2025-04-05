
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Duskflow has transformed how our team operates. We've reduced our workflow time by 60% and improved accuracy across the board.",
      name: "Sarah Johnson",
      role: "Operations Director, Acme Inc",
      avatar: "SJ"
    },
    {
      quote: "The AI-powered document processing has been a game-changer for our legal team. What used to take days now takes minutes.",
      name: "Michael Chen",
      role: "Legal Tech Lead, LawCorp",
      avatar: "MC"
    },
    {
      quote: "Our team was able to implement Duskflow in just a few days. The ROI has been incredible - we've already saved thousands of hours.",
      name: "Lisa Rodriguez",
      role: "Project Manager, TechSolutions",
      avatar: "LR"
    }
  ];

  const logos = [
    "Acme Inc", "TechCorp", "Innovative", "GlobalTech", "NextWave", "FutureSoft"
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="text-gradient">industry leaders</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">See what our customers have to say about Duskflow.</p>
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 border border-white/10"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-dusk-400">★</span>
                ))}
              </div>
              <blockquote className="mb-6 text-white/80">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dusk-500/30 text-white flex items-center justify-center mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-white/40 mb-8">TRUSTED BY FORWARD-THINKING COMPANIES</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {logos.map((logo, index) => (
              <div key={index} className="text-white/30 font-semibold text-lg">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
