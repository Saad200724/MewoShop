import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-green to-green-700">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Get 20% off on your first order!</h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90">New customers save big on premium pet products</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white text-brand-green px-6 py-3 rounded-full font-bold text-lg">
              Use Code: <span className="text-brand-green">MEOW20</span>
            </div>
            <Button className="bg-brand-yellow text-brand-green px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
              Claim Offer 🎁
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
