export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Cat Parent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9b7b3bb?w=60&h=60&fit=crop&crop=face",
      text: "Amazing quality food for my cat Whiskers! Fast delivery and great customer service.",
      rating: 5
    },
    {
      name: "Rafi Khan",
      role: "Dog Parent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      text: "Best pet shop in BD! My dog loves the toys and the prices are very reasonable.",
      rating: 5
    },
    {
      name: "Fatima Begum",
      role: "Rabbit Parent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      text: "Excellent grooming products! My rabbit's fur has never been softer and healthier.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">What Pet Parents Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real reviews from happy customers and their beloved pets
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex text-yellow-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center justify-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
