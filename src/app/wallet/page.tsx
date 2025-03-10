import Header from "../components/Dashboard_Components/Header";
import CardConmponent from "./components/card";
import CardCarousel from "./components/CardsSwiper";
import Component from "./components/chart";

export default function Wallet() {
  return (
    <>
      <Header />
      <main className="flex gap-4">
        <section>
          <CardConmponent />
          <Component />
        </section>

        <section className="">
          <CardCarousel />
        </section>
      </main>
    </>
  );
}
