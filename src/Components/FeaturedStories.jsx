import React from 'react';

const stories = [
  {
    name: 'Fatima Ahmed',
    image: 'https://res.cloudinary.com/dpwjurgeu/image/upload/w_1000/q_auto/f_auto/v1755279461/6cdca423-6e6f-4caf-9bcd-d293f32e212d.png',
    story:
      'After a severe accident, I needed 5 bags of blood urgently. Thanks to a donor from this platform, I got the help I needed to survive.',
  },
  {
    name: 'Rashed Khan',
    image: 'https://res.cloudinary.com/dpwjurgeu/image/upload/w_1000/q_auto/f_auto/v1755279483/87888f84-8e12-44f3-aa00-16e1c95f9048.png',
    story:
      'My son has thalassemia and needs blood regularly. This platform gave us hope and reliable donors every month.',
  },
];

const FeaturedStories = () => {
  return (
    <section className="bg-slate-100/80 py-12 px-5 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-secondary mb-10">
          Stories That Inspire
        </h2>
        <div className="space-y-8">
          {stories.map((s, idx) => (
            <div key={idx} className="bg-white border-l-4 border-primary hover:shadow-lg hover:shadow-primary/10 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-16 h-16 rounded-full object-cover border border-primary"
                />
                <div>
                  <p className="italic text-gray-700 mb-2">“{s.story}”</p>
                  <p className="text-sm text-gray-500 font-medium">— {s.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
