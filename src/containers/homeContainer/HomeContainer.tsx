import BannerCarousel from './BannerCarousel';
import BrandCarousel from './BrandCarousel';
import ScrollingParallax from './ScrollingParallax';

const HomeContainer = () => (
    <div className="m-0 p-0">
        <BannerCarousel />
        <div className="text-3xl font-bold font-italic text-center p-8 m-8">
            Explore a Selection of the Maison&apos;s Creations
        </div>
        <div>
            <ScrollingParallax />
        </div>
        <div className="text-3xl font-bold font-italic text-center p-8 m-8">
            Elevate Your Wardrobe with Premium Brands
        </div>
        <div className="m-8">
            <BrandCarousel />
        </div>
    </div>
);

export default HomeContainer;
