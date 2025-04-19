import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-merriweather font-bold text-lg mb-4">RecipeFinder</h3>
            <p className="text-gray-400 text-sm">
              Find delicious recipes with ingredients you already have in your kitchen. Reduce food waste and discover new meals.
            </p>
          </div>
          <div>
            <h4 className="font-merriweather font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Popular Recipes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seasonal Ideas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quick Meals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-merriweather font-bold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cooking Techniques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingredient Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kitchen Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recipe Videos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-merriweather font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RecipeFinder. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Pinterest">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
