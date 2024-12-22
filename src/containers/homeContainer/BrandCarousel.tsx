import useGlobalStore from '../../store/store';
import './brandCarousel.css';

const BrandCarousel = () => {
    const items = [
        { id: 1, name: 'Item 1', image: 'brandImages/brand_1.svg' },
        { id: 2, name: 'Item 2', image: 'brandImages/brand_2.svg' },
        { id: 3, name: 'Item 3', image: 'brandImages/brand_3.svg' },
        { id: 4, name: 'Item 4', image: 'brandImages/brand_4.svg' },
        { id: 5, name: 'Item 5', image: 'brandImages/brand_5.svg' },
        { id: 6, name: 'Item 6', image: 'brandImages/brand_6.svg' },
        { id: 7, name: 'Item 7', image: 'brandImages/brand_7.svg' },
        { id: 8, name: 'Item 8', image: 'brandImages/brand_8.svg' },
        // Add more items as needed
    ];

    const { theme } = useGlobalStore();
    const themeCheck = theme === 'dark';
    return (
        <div className="wrapper  mb-6">
            {
                items.map((item) => (
                    <div key={item.id} className={`item item${item.id}`}>
                        <img
                            className="w-full h-full"
                            src={item.image}
                            alt={item.name}
                            style={{
                                objectFit: 'contain',
                                filter: themeCheck ? 'invert(1)' : 'invert(0)',
                            }}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default BrandCarousel;
