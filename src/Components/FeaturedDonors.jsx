import React from 'react';

const featuredDonors = [
  {
    name: 'Rafiul Islam',
    bloodGroup: 'O+',
    image: 'https://i.ibb.co/BJwf8ZP/amir-riazipour-Xc-Z78-Dl-Xtes-unsplash.jpg',
    donations: 8,
    quote: 'Donating blood is my way of giving back to the community.',
  },
  {
    name: 'Tahmina Yasmin',
    bloodGroup: 'A-',
    image: 'https://i.ibb.co/ZpPKzBZm/rodolfo-sanches-carvalho-Cs-Nac-HXW6-RU-unsplash.jpg',
    donations: 5,
    quote: 'Every drop counts. I feel proud to be a donor.',
  },
  {
    name: 'Rakibul Hasan',
    bloodGroup: 'B+',
    image: 'https://i.ibb.co/BHghB7Vs/warren-VVEw-JJRRHgk-unsplash.jpg',
    donations: 8,
    quote: 'Saving lives is the most powerful thing we can do. Proud to be part of it.',
  }
];

const FeaturedDonors = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-12 px-5 lg:px-0">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
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
  );
};

export default FeaturedDonors;
