import React from 'react';

const featuredDonors = [
  {
    name: 'Rafiul Islam',
    bloodGroup: 'O+',
    image: 'https://res.cloudinary.com/dpwjurgeu/image/upload/w_1000/q_auto/f_auto/v1754826258/e7fedd1b-fc47-42e9-9c11-4e8a8b110119.png',
    donations: 8,
    quote: 'Donating blood is my way of giving back to the community.',
  },
  {
    name: 'Tahmina Yasmin',
    bloodGroup: 'A-',
    image: 'https://res.cloudinary.com/dpwjurgeu/image/upload/w_1000/q_auto/f_auto/v1754826364/e9089fe2-56c2-40ca-904c-76bfed7da718.png',
    donations: 5,
    quote: 'Every drop counts. I feel proud to be a donor.',
  },
  {
    name: 'Rakibul Hasan',
    bloodGroup: 'B+',
    image: 'https://res.cloudinary.com/dpwjurgeu/image/upload/w_1000/q_auto/f_auto/v1755279446/3c493e0b-6a59-4c7f-82af-13013a26f940.png',
    donations: 8,
    quote: 'Saving lives is the most powerful thing we can do. Proud to be part of it.',
  }
];

const FeaturedDonors = () => {
  return (
    <section className='bg-red-100'>
      <div className="max-w-screen-xl mx-auto py-12 px-5 lg:px-0">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-secondary mb-10">
          Our Hero Donors
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredDonors.map((donor, idx) => (
            <div key={idx} className="card bg-white px-4 rounded-xl shadow-md">
              <div className="flex items-center gap-4 p-3">
                <img
                  src={donor.image}
                  alt={donor.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-lg font-bold">{donor.name}</h4>
                  <p className="text-sm text-gray-500">Blood Group: <span className="font-semibold">{donor.bloodGroup}</span></p>
                  <p className="text-sm text-gray-500">Total Donations: <span className="font-semibold">{donor.donations}</span></p>
                </div>
              </div>
              <div className="px-6 pb-3 text-gray-600 italic">
                “{donor.quote}”
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonors;
