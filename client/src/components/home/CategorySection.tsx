import { Link } from "wouter";
import { categories } from "@/data/products";

const categoryIcons = {
  "Cat Food": "🐱",
  "Dog Food": "🐕",
  "Toys": "🎾",
  "Accessories": "🎗️",
  "Healthcare": "❤️",
  "Grooming": "✂️"
};

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find everything your pet needs in our carefully curated categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}>
              <div className="group cursor-pointer">
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-brand-yellow transition-colors duration-300 group-hover:shadow-lg">
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors">
                    <span className="text-2xl">{categoryIcons[category.name as keyof typeof categoryIcons]}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
