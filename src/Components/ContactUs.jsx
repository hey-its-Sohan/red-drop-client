import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-slate-100/80 px-5 pb-20" id="contact">
      <div className="max-w-screen-xl mx-auto">
        <section >
          <div >
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg text-gray-500">
                Get in touch for any questions or support
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {/* Phone */}
              <div className="card bg-white shadow-md hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                <div className="card-body items-center text-center">
                  <Phone className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title text-xl mb-2">Phone</h3>
                  <p className="text-lg font-medium">+880-1234-567890</p>
                  <p className="text-sm text-gray-500">24/7 Emergency Line</p>
                </div>
              </div>

              {/* Email */}
              <div className="card bg-white shadow-md hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                <div className="card-body items-center text-center">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title text-xl mb-2">Email</h3>
                  <p className="text-lg font-medium">support@reddrop.org</p>
                  <p className="text-sm text-gray-500">Response within 24hrs</p>
                </div>
              </div>

              {/* Address */}
              <div className="card bg-white shadow-md hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                <div className="card-body items-center text-center">
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title text-xl mb-2">Address</h3>
                  <p className="text-lg font-medium">123 Healthcare Ave</p>
                  <p className="text-sm text-gray-500">Banani, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
