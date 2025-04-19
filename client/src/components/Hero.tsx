import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="font-merriweather text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Find Delicious Recipes With What You Have
        </h1>
        <p className="font-opensans text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Enter ingredients you have in your kitchen and discover perfect recipes to make right now.
        </p>
      </div>
    </section>
  );
};

export default Hero;
