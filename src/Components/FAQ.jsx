// src/Components/FAQ.jsx
import React from "react";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Who can become a blood donor on RedDrop?",
    a: "Anyone 18+ (or per your local rules), in good health, and meeting standard donation guidelines can sign up as a donor. We recommend consulting your physician if you have specific medical concerns."
  },
  {
    q: "How do I request blood for a patient?",
    a: "Create a Donation Request from your dashboard with the patient’s details (recipient name, blood group, location, date & time, hospital). Volunteers and matching donors will be notified."
  },
  {
    q: "What do the request statuses mean?",
    a: "Pending: awaiting a donor. Inprogress: a donor has confirmed. Done: donation completed. Canceled: request withdrawn or no longer needed."
  },
  {
    q: "How do I publish or edit blog posts?",
    a: "Volunteers and Admins can create drafts. Only Admins can publish or unpublish. You can edit your posts from the Content Management page if you have the proper role."
  },
  {
    q: "How can I support RedDrop financially?",
    a: "You can contribute via the Give Back Funding page. Payments are processed securely with Stripe, and your support helps us maintain outreach and operations."
  }
];

const FAQ = () => {
  return (
    <div className="bg-slate-100/80 py-16">
      <section className="max-w-screen-xl mx-auto px-5 lg:px-0 ">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-3 text-base text-gray-500">
            Quick answers to common questions about donors, requests, and platform features.
          </p>
        </div>
        <div className="grid gap-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="collapse collapse-plus bg-white border border-base-300 rounded-xl shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-base md:text-lg font-semibold">
                {item.q}
              </div>
              <div className="collapse-content text-sm md:text-base leading-relaxed text-gray-600">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
