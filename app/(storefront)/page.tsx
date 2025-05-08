import React from "react";
import Hero from "../components/stroefront/Hero";
import CategorySelection from "../components/stroefront/CategorySelection";
import FeaturedProducts from "../components/stroefront/FeaturedProducts";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
    </div>
  );
}
