import { Calendar, Clock, MapPin } from 'lucide-react';
import React from 'react';

const Events = () => {
  return (
    <div>
      <section className="py-16 px-5 lg:px-0 bg-slate-100/80 ">
        <div className="max-w-screen-xl mx-auto mb-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Upcoming Events
            </h2>
            <p className="text-gray-500 text-lg">Join our blood drive campaigns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Community Blood Drive",
                date: "January 25, 2026",
                time: "9:00 AM - 5:00 PM",
                location: "Central Park Community Center",
                goal: "100 donors needed",
              },
              {
                title: "Corporate Blood Drive",
                date: "October 2, 2025",
                time: "10:00 AM - 4:00 PM",
                location: "Tech Hub Downtown",
                goal: "75 donors needed",
              },
              {
                title: "University Blood Donation Camp",
                date: "September 20, 2025",
                time: "10:00 AM - 6:00 PM",
                location: "Campus Student Center",
                goal: "150 student donors",

              }
            ].map((event, index) => (
              <div
                key={index}
                className="card bg-white border-l-4 border-primary shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body">

                  <h3 className="text-xl font-semibold text-secondary">
                    {event.title}
                  </h3>
                  <div className="badge badge-soft badge-primary my-2 text-sm">{event.goal}</div>

                  <div className="space-y-2 text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                  </div>
                  <button className="btn btn-outline btn-primary w-full">
                    Register Opening Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;