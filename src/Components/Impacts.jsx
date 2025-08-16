import { Heart, Shield, Target, Users } from 'lucide-react';
import React from 'react';

const Impacts = () => {
  return (
    <div>
      <section className="py-16 px-5 lg:px-0 bg-secondary text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-white/80 text-lg">Together we're making a difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Lives Saved", icon: Heart },
              { number: "25,000+", label: "Active Donors", icon: Users },
              { number: "200+", label: "Partner Hospitals", icon: Shield },
              { number: "99%", label: "Success Rate", icon: Target },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <stat.icon className="w-12 h-12 mx-auto text-primary" />
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impacts;