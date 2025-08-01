import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-brand-yellow via-yellow-200 to-brand-yellow py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-green mb-6 leading-tight">
              Bring Joy to Your Pet's Life
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 max-w-lg">
              Discover premium pet products that make tails wag and hearts purr. From nutritious food to fun toys, we have everything your furry friends need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="bg-brand-green text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block text-center">
                Shop Now →
              </Link>
              <Link 
                href="/shop"
                className="border-2 border-brand-green text-brand-green px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-green hover:text-white transition-all duration-300 inline-block text-center"
              >
                View Catalog
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Happy golden retriever dog with pet accessories"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold">1000+ Happy Pets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
