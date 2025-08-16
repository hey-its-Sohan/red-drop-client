import { Users, Heart, MapPin, Award } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Register",
      description: "Sign up and complete your donor profile",
    },
    {
      icon: Heart,
      title: "Get Matched",
      description: "We'll notify you when your blood type is needed",
    },
    {
      icon: MapPin,
      title: "Visit Center",
      description: "Go to the nearest donation center",
    },
    {
      icon: Award,
      title: "Save Lives",
      description: "Your donation helps up to 3 patients",
    },
  ];

  return (
    <div className="bg-slate-100/80">
      <section className="py-16 max-w-screen-xl mx-auto px-5 lg:px-0">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">Simple steps to save a life</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                {/* Icon Circle with Step Number */}
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-md">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                    {index + 1}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
