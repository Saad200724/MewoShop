import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you for subscribing! 🐾",
        description: "You'll receive updates on new products and special offers.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-brand-yellow">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-green mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-8">
            Get the latest updates on new products, special offers, and pet care tips
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border-2 border-transparent focus:border-brand-green"
              required
            />
            <Button
              type="submit"
              className="bg-brand-green text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4">No spam, only paw-some content!</p>
        </div>
      </div>
    </section>
  );
}
