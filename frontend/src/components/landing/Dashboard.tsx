import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  // How it Works steps data
  const steps = [
    {
      title: "Connect Your Data Sources",
      description:
        "Easily integrate with your existing tools and platforms. Import data from multiple sources with just a few clicks.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200&h=800",
    },
    {
      title: "Configure AI Analysis",
      description:
        "Set up intelligent workflows that automatically process your data. Our AI identifies patterns and insights without manual intervention.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200&h=800",
    },
    {
      title: "Visualize Results",
      description:
        "View comprehensive analytics through customizable dashboards. Make data-driven decisions with real-time insights.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200&h=800",
    },
    {
      title: "Automate Actions",
      description:
        "Set up triggers for automated responses based on data thresholds. Let the system handle routine tasks while you focus on strategy.",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200&h=800",
    },
  ];

  return (
    <section id="working" className="py-24 relative">


      <div className="mt-16 relative">
      
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle,rgba(115,115,115,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="border-4 border-white/30 w-full bg-[#141414] rounded-lg overflow-hidden">
        
          <div className=" h-full flex items-center justify-center">
            <div className="text-white/20 text-lg">
              <div className="container max-w-6xl mx-auto px-4">
                {/* How it Works Section */}
                <div className="m-10">
                  <h2 className="text-4xl md:text-4xl lg:text-5xl font-[poppins] text-white font-bold mb-4 text-center animate-fade-in">
                    How <span className="text-gradient">It Works</span>
                  </h2>
                  <p
                    className="text-white/60 max-w-2xl mx-auto text-center mb-16 animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    Our streamlined process makes implementation simple and
                    effective, so you can start seeing results right away.
                  </p>

                  <div className="space-y-28">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex flex-col ${
                          index % 2 === 0
                            ? "md:flex-row"
                            : "md:flex-row-reverse"
                        } items-center gap-8 md:gap-16 animate-fade-in`}
                        style={{ animationDelay: `${(index + 1) * 300}ms` }}
                      >
                        {/* Screenshot Side */}
                        <div className="w-full md:w-1/2 transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-xl">
                          <div className="glass-card rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300 hover:border-dusk-400/30 hover:shadow-dusk-500/20">
                            <div className="aspect-video w-full bg-zinc-900/50 overflow-hidden">
                              <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-105"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 space-y-4">
                          <div className="flex items-center mb-2 group">
                            <div className="w-10 h-10 rounded-full bg-dusk-500/20 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-dusk-500/40 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-dusk-500/20">
                              <span className="text-dusk-400 text-xl font-bold group-hover:text-dusk-300">
                                {index + 1}.
                              </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-dusk-300">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/70 text-lg pl-14 transition-colors duration-300 hover:text-white/90">
                            {step.description}
                          </p>

                          <div className="pl-14 pt-4">
                            <ul className="space-y-3">
                              <li className="flex items-start group">
                                <div className="mt-1.5 mr-3 flex-shrink-0">
                                  <div className="w-5 h-5 rounded-full bg-dusk-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-dusk-500/40 group-hover:scale-110">
                                    <Check
                                      size={12}
                                      className="text-dusk-400 group-hover:text-dusk-300"
                                    />
                                  </div>
                                </div>
                                <span className="text-white/60 transition-colors duration-300 group-hover:text-white/90">
                                  Seamlessly integrates with your existing
                                  workflow
                                </span>
                              </li>
                              <li className="flex items-start group">
                                <div className="mt-1.5 mr-3 flex-shrink-0">
                                  <div className="w-5 h-5 rounded-full bg-dusk-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-dusk-500/40 group-hover:scale-110">
                                    <Check
                                      size={12}
                                      className="text-dusk-400 group-hover:text-dusk-300"
                                    />
                                  </div>
                                </div>
                                <span className="text-white/60 transition-colors duration-300 group-hover:text-white/90">
                                  Intuitive setup process requires no technical
                                  expertise
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="pl-14 pt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            <Button
                              size="sm"
                              className="bg-dusk-500/20 text-dusk-300 hover:bg-dusk-500/40 border border-dusk-400/20"
                            >
                              Learn more
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
