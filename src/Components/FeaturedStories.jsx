import React from 'react';

const stories = [
  {
    name: 'Fatima Ahmed',
    image: 'https://i.ibb.co/7VKXwFx/survivor1.jpg',
    story:
      'After a severe accident, I needed 5 bags of blood urgently. Thanks to a donor from this platform, I got the help I needed to survive.',
  },
  {
    name: 'Rashed Khan',
    image: 'https://i.ibb.co/6vWzjPg/survivor2.jpg',
    story:
      'My son has thalassemia and needs blood regularly. This platform gave us hope and reliable donors every month.',
  },
];

const FeaturedStories = () => {
  return (
    <section className="bg-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
          Stories That Inspire
        </h2>
        <div className="space-y-8">
          {stories.map((s, idx) => (
            <div key={idx} className="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-16 h-16 rounded-full object-cover border"
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
