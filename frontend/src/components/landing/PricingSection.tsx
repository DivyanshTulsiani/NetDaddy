
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for individuals and small teams",
      features: [
        "5 AI-powered workflows",
        "Basic document processing",
        "1,000 AI credits per month",
        "Email support"
      ],
      highlight: false,
      buttonText: "Get started"
    },
    {
      name: "Professional",
      price: "$49",
      description: "Ideal for growing teams and companies",
      features: [
        "Unlimited AI-powered workflows",
        "Advanced document processing",
        "10,000 AI credits per month",
        "Priority support",
        "Custom integrations",
        "Team collaboration tools"
      ],
      highlight: true,
      buttonText: "Start free trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Unlimited AI credits",
        "Dedicated account manager",
        "Custom AI model training",
        "Enterprise security features",
        "Service level agreement (SLA)"
      ],
      highlight: false,
      buttonText: "Contact sales"
    }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, <span className="text-gradient">transparent pricing</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Choose the perfect plan for your team's needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                rounded-xl overflow-hidden ${plan.highlight ? 
                'border-2 border-dusk-500 relative bg-gradient-to-b from-dusk-500/10 to-background' : 
                'glass-card border border-white/10'}
              `}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 py-1.5 bg-gradient-to-r from-dusk-500 to-indigo-600 text-white text-xs font-medium text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 pt-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-dusk-400' : ''}`}>{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-white/60 ml-1">/month</span>}
                </div>
                <p className="text-white/60 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-8 ${plan.highlight ? 
                    'bg-gradient-to-r from-dusk-500 to-indigo-600 hover:opacity-90 text-white' : 
                    'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-2 text-dusk-400">
                        <Check size={16} />
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-6">All plans include a 14-day free trial. No credit card required.</p>
          <a href="#" className="text-dusk-400 hover:text-dusk-300 underline text-sm">View full plan comparison →</a>
        </div>
      </div>
    </section>
  );
}
