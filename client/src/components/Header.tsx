import React from 'react';
import { Link } from 'wouter';
import { Utensils } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="text-primary mr-2 text-3xl">
            <Utensils />
          </div>
          <h1 className="font-merriweather text-2xl font-bold text-foreground">Recipe<span className="text-primary">Finder</span></h1>
        </div>
        <nav>
          <ul className="flex space-x-6 text-sm font-opensans">
            <li><Link href="/" className="text-foreground hover:text-primary transition-colors duration-200 font-semibold">Home</Link></li>
            <li><a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Saved Recipes</a></li>
            <li><a href="#" className="text-foreground hover:text-primary transition-colors duration-200">Meal Plans</a></li>
            <li><a href="#" className="text-foreground hover:text-primary transition-colors duration-200">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
