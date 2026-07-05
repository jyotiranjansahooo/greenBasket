import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/home/hero";
import Categories from "@/app/components/home/Categories";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
    </>
  );
}