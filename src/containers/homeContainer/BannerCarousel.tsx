import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import {
    memo,
    useEffect, useMemo, useRef, useState,
} from 'react';

type BannerContentProps = {
    index:number
};
const BannerContent = memo(({ index }:BannerContentProps) => {
    const bannerParentClass = useMemo(() => classNames('absolute', ' w-full', 'h-full', 'flex', 'card', 'p-8', 'top-0', {
        'justify-content-end  align-items-center': index === 5,
        'justify-content-end  align-items-center p-8': index === 0,
        'align-items-center justify-content-start': index === 1,
        'align-items-start justify-content-end': index === 2,
        'align-items-center justify-content-start p-8': index === 3,
        'align-items-center justify-content-start p-8 d': index === 4,
    }), [index]);

    const bannerClass = useMemo(() => classNames('card', 'flex-column', 'justify-content-center', 'align-item-center', 'border-round-lg', {
        'w-20rem text-primary': index === 5,
        'w-20rem text-white ': index === 0,
        'w-26rem p-4 h-14rem text-white bg-black-alpha-40 align-items-stretch p-6': index === 1,
        'border-2 border-white  w-24rem text-white O': index === 2,
        'w-20rem bg-black-alpha-40 text-primary border-3 border-primary text-2xl': index === 3,
        'w-20rem bg-black-alpha-60 text-primary ': index === 4,
    }), [index]);

    const buttonClass = useMemo(() => classNames('border-2', 'text-1xl', 'w-full', {
        'text-primary hover:text-black-alpha-90 hover:bg-primary': index === 5,
        'text-white hover:text-primary border-white hover:bg-white': index === 0,
        'text-white hover:text-black-alpha-90 border-white hover:bg-white P': index === 1,
        'text-white hover:text-black-alpha-90 border-white hover:bg-white O': index === 2,
        'text-primary hover:text-black-alpha-90 border-primary hover:bg-primary': index === 3,
        'hover:text-black-alpha-90 border-white hover:bg-white SSA': index === 4,
    }), [index]);

    const bannerText = useMemo(() => {
        switch (index) {
            case 0:
                return {
                    heading: 'Flat 20%',
                    caption: 'Style on a Budget: Grab Your Favorites at 20% Off!',
                };
            case 1:
                return {
                    heading: 'Heritage Hues',
                    caption: 'Celebrate Tradition with Timeless Elegance.',
                };
            case 2:
                return {
                    heading: 'Boardroom Basics',
                    caption: 'Sophistication Meets Success in Every Stitch.',
                };
            case 3:
                return {
                    heading: 'Coral Breeze',
                    caption: 'Feel the Breeze, Wear the Ease: Summer\'s Best Looks.',
                };
            case 4:
                return {
                    heading: 'Fresh Finds',
                    caption: 'Stay Ahead of the Trends with Our Latest Arrivals.',
                };
            case 5:
                return {
                    heading: 'Casual Comforts',
                    caption: 'Relax in Style: Effortlessly Chic, Always Comfortable.',
                };
            default:
                return {
                    heading: 'Flat 20%',
                    caption: '',
                };
        }
    }, [index]);

    console.log('bannerParentClass: ', bannerParentClass);
    console.log();
    return (
        <div className={bannerParentClass}>
            <div className={bannerClass}>
                <div className="text-4xl w-full text-center w-auto font-semibold">
                    {bannerText.heading}
                </div>
                {/* <div className="text-lg w-full text-justify w-auto font-light p-2">
                    {bannerText.caption}
                </div> */}
                <br />
                <Button label="EXPLORE" className={buttonClass} size="large" outlined />
            </div>
        </div>
    );
});

BannerContent.displayName = 'BannerContent';

const BannerCarousel = () => {
    const galleriaRef = useRef(null);
    const [activeBanner, setActiveBanner] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const images = useMemo(() => [
        {
            itemImageSrc: '/bannerImages/banner1.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
        },
        {
            itemImageSrc: 'bannerImages/banner2.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2',
        },
        {
            itemImageSrc: 'bannerImages/banner3.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3',
        },
        {
            itemImageSrc: 'bannerImages/banner4.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4',
        },
        {
            itemImageSrc: 'bannerImages/banner5.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5',
        },
        {
            itemImageSrc: '/bannerImages/banner6.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6',
        },
    ], []);

    useEffect(() => {
        const preloadImages = () => {
            const promises = images.map((image) => new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = image.itemImageSrc;
                img.onload = () => resolve();
                img.onerror = () => reject();
            }));

            Promise.all(promises)
                .then(() => setImagesLoaded(true))
                .catch((error) => console.error('Failed to preload images', error));
        };

        preloadImages();
    }, [images]);

    const itemTemplate = (item:unknown) => (
        <img
            // @ts-ignore
            src={item.itemImageSrc}
            // @ts-ignore
            alt={item.alt}
            className="w-full"
            style={{
                height: '80vh',
                objectFit: 'cover',
                // position: 'relative',
                // background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)!important',
                display: imagesLoaded ? 'block' : 'none',
            }}
        />
    );
    // @ts-ignore
    const onItemChange = (event) => {
        setActiveBanner(event.index);
    };
    console.log();
    return (
        <div className="w-full h-full relative">
            <div className="p-0 w-full">
                { !imagesLoaded && (
                    <div className="w-full h-full">
                        <Skeleton
                            // width="100vw"
                            height="80vh"
                            // className="mb-2 "
                            className="w-100 "
                        />
                    </div>
                )}
                {imagesLoaded && (
                    <>
                        <Galleria
                            className="p-0 m-0"
                            ref={galleriaRef}
                            value={images}
                            activeIndex={activeBanner}
                            onItemChange={onItemChange}
                            showThumbnails={false}
                            // showItemNavigators
                            // showItemNavigatorsOnHover
                            numVisible={6}
                            circular
                            autoPlay
                            transitionInterval={5000}
                            item={itemTemplate}
                        />
                        <BannerContent index={activeBanner} />
                    </>
                )}
            </div>
        </div>
    );
};

export default BannerCarousel;
