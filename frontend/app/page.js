import Hero from "@/app/components/home/hero";
import Categories from "@/app/components/home/Categories";


export const metadata = {
  title: " Green Basket | Homepage",
  description: "Browse fresh products from local farmers.",
};
export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
    </>
  );
}