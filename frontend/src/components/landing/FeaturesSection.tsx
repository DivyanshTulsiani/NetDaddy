
import { Check } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Instant Safety Check",
      heading:"Real-Time Content Protection",
      description: "NetDaddy scans webpages instantly to ensure they’re safe for kids. With lightning-fast text analysis and smart image queuing, it flags inappropriate content before little eyes see it—keeping browsing worry-free.",
      icon: <i className="bi bi-shield-shaded"></i>
    },
    {
      title: "Smart Scroll Handling",
      heading:"Seamless Dynamic Scanning",
      description: "Whether scrolling through feeds or loading new content, NetDaddy adapts on the fly. It tracks updates, scans only what’s new, and delivers results without slowing down the fun—perfect for curious explorers.",
      icon: <i className="bi bi-search"></i>
    },
    {
      title: "Quick Notifications",
      heading:"Get Instant Emails ",
      description: "Get instant notification when your child is exposed to potentially unsafe content. Paired with a brief AI-enabled description of the nature of the unsafe content.",
      icon: <i className="bi bi-envelope-fill"></i>
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle,rgba(115,115,115,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-[poppins] text-white font-bold mb-4 text-center animate-fade-in"><span className="text-gradient">Features</span> we provide</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 border border-white/10 hover:border-dusk-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-dusk-500/10"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dusk-400/20 to-dusk-600/20 flex items-center justify-center mb-4 text-2xl">
                {feature.icon}
              </div>
              <h1 className="text-xl font-bold mb-3">{feature.title}</h1>
              <h4 className="text font-semibold mb-3">{feature.heading}</h4>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
}
