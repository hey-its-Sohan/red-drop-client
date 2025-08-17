import { Zap } from 'lucide-react';
import React from 'react';

const Facts = () => {
  return (
    <div>
      <section className="pb-16 pt-10 px-5 bg-slate-100/80">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Did You Know?
            </h2>
            <p className="text-gray-500 text-lg">Important facts about blood donation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "One donation can save up to 3 lives",
              "You can donate every 56 days",
              "The donation process takes only 8-10 minutes",
              "Your body replaces donated blood within 24-48 hours",
              "Only 3% of eligible donors actually donate",
              "Type O- blood is the universal donor",
            ].map((fact, index) => (
              <div
                key={index}
                className="card bg-white shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="card-body text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-secondary font-medium">{fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Facts;