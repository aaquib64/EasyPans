import { ChefHat, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <footer className="relative bg-[#044d2e] text-primary-foreground mt-12 overflow-hidden">

  {/* Soft gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#067a45]/70 via-[#044d2e] to-[#033a22] opacity-90"></div>

  {/* Light texture overlay */}
  <div className="absolute inset-0 bg-[url('/texture-light.png')] opacity-10 mix-blend-overlay"></div>

  <div className="relative container mx-auto px-4 md:px-6 py-14">
    
    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Brand */}
      <div className="col-span-1 md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-5">
          <ChefHat className="h-9 w-9 text-white drop-shadow-md" />
          <span className="font-extrabold text-3xl tracking-wide drop-shadow">
            EASYPANS
          </span>
        </Link>

        <p className="text-white/80 mb-5 leading-relaxed max-w-md">
          Cook fresh, eat better, feel happier. Every EasyPans box is designed 
          to help you enjoy cooking real food—balanced, flavorful, and full of love.
        </p>

        {/* Social */}
        <div className="flex gap-4">
          {[
            { icon: Facebook },
            { icon: Instagram },
            { icon: Twitter },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
              >
                <Icon className="h-5 w-5 text-white" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-semibold text-xl mb-4 text-white">Quick Links</h3>
        <ul className="space-y-3 text-white/80">
          <li>
            <Link to="/recipes" className="hover:text-white transition">
              All Recipes
            </Link>
          </li>
          <li>
            <a href="/#products" className="hover:text-white transition">
              Products
            </a>
          </li>
          <li>
            <a href="/#about" className="hover:text-white transition">
              About Us
            </a>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-semibold text-xl mb-4 text-white">Contact Us</h3>
        <ul className="space-y-4 text-white/80">
          <li className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-white" />
            <span>easypans.marketing@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-white" />
            <span>+91 8967028287</span>
          </li>
        </ul>
      </div>

    </div>

    {/* Bottom */}
    <div className="relative border-t border-white/20 mt-10 pt-6 text-center">
      <p className="text-white/70 text-sm">
        © 2025 EasyPans. All rights reserved.
      </p>
    </div>

  </div>
</footer>

  );
};

export default Footer;
