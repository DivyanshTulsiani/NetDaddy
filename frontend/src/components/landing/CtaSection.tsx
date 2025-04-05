
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-dusk-900/20 to-indigo-900/5 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dusk-500/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden border border-white/10">
          {/* Inner glow effects */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-dusk-500/30 rounded-full blur-[80px] z-0"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-[80px] z-0"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-dusk-600/20 via-dusk-800/20 to-indigo-900/30 z-0"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Ready to transform your workflow?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">Join thousands of teams using Duskflow to automate their processes and boost productivity.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-gradient-to-r from-dusk-500 to-indigo-600 hover:opacity-90 text-white px-8 py-6 text-lg shadow-lg shadow-dusk-500/25 transition-all duration-300 hover:shadow-dusk-500/40">
                Start your free trial
              </Button>
              <Button variant="ghost" className="text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                Schedule a demo
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-white/50">No credit card required • Free 14-day trial</p>
          </div>
        </div>
      </div>
    </section>
  );
}
