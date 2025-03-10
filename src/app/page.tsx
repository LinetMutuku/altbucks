import Header from "./components/Homepage_Components/Header";
import Banner from "./components/Homepage_Components/Banner";
import How_Altbucks_Works from "./components/Homepage_Components/How_Altbucks_Works";
import PopularCategories from "./components/Homepage_Components/PopularCategories";
import ViewReviews from "./components/Homepage_Components/ViewReviews";
import EarnRewards from "./components/Homepage_Components/EarnRewards";
import Footer from "./components/Homepage_Components/Footer";

export default function Home() {
    return (
        <div className="w-screen h-fit bg-white">
            <Header />
            <Banner />
            <How_Altbucks_Works />
            <PopularCategories />
            <ViewReviews />
            <EarnRewards />
            <Footer/>
        </div>
    );
}
