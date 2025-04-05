
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dashboard } from "./Dashboard";

export function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle,rgba(115,115,115,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>


      {/* Enhanced background glow effects */}
      <div className="absolute inset-0 bg-hero-glow opacity-80 z-0"></div>
      <div className="absolute top-40 left-1/4 w-[600px] h-[600px] bg-dusk-500/20 rounded-full blur-[150px] -z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px] -z-0"></div>
      
      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col min-h-[75vh] items-center text-center max-w-4xl mx-auto gap-5">
          <div className="animate-float">
            <div className="mb-6 inline-flex items-center py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="animate-pulse rounded-full h-2 w-2 bg-dusk-500 mr-2"></span>
              <span className="text-xs text-white/80">Introducing</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span
            className="font-[poppins] text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'repeating-radial-gradient(circle farthest-side at center center, #FFFFFF 0%, #C4C4C4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NetDaddy<br/>
          </span>
            <span className="text-gradient font-[inte] italic">Ensuring a safe internet for your child</span>            
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl">
          Keep your kids protected online with our browser extension that filters out inappropriate content, ensuring a safe and secure browsing experience.
          </p>
          
          
          <div className="group w-full sm:w-auto">
            <Button className="w-full sm:w-auto whitespace-nowrap bg-gradient-to-t from-[#5636f7] to-[#9781e3] group-hover:bg-gradient-to-b hover:opacity-90 border-none px-6 py-6 shadow-lg shadow-[#843dff]/25 transition-all duration-300">
              Add Extension
            </Button>
          </div>

        
        </div>
        
        {/* Dashboard */}
        <div>        
          <Dashboard></Dashboard>
        </div>
        
      </div>
    </section>
  );
}
