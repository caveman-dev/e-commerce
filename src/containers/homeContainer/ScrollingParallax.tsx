import {
    useTransform, useScroll,
    motion, MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import styles from './page.module.scss';
import useGlobalStore from '../../store/store';

const files = [
    'clothing_1.jpg',
    'clothing_2.jpg',
    'clothing_4.jpg',
    'clothing_5.jpg',
    'clothing_6.jpg',
    'clothing_7.jpg',
    'clothing_3.webp',
    'clothing_10.jpg',
    'clothing_11.jpg',
    'clothing_12.avif',
    'clothing_13.jpg',
    'clothing_14.jpg',
];

type ColumnProps = {
    images: string[];
    y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => (
    <motion.div
        className={styles.column}
        style={{ y }}
    >
        {images.map((src) => (
            <div
                key={src}
                className={`${styles.imageContainer} border-white border-2`}
            >
                <img
                    src={`parallaxImages/${src}`}
                    alt="scroll"
                />
            </div>
        ))}
    </motion.div>
);

const ScrollingParallax = () => {
    const gallery = useRef(null);
    const [dimension, setDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start'],
    });
    const { cartActive } = useGlobalStore();
    const lenisRef = useRef<Lenis | null>(null);

    const y = useTransform(scrollYProgress, [0, 1], [0, dimension.height - 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 1]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 0.8]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Initialize and destroy Lenis based on cartActive
    useEffect(() => {
        const initializeLenis = () => {
            const lenis = new Lenis();
            lenisRef.current = lenis;

            const raf = (time: number) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };

            requestAnimationFrame(raf);
        };

        if (!cartActive) {
            initializeLenis();
        }

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, [cartActive]);

    return (
        <main>
            <div className={styles.spacer} />
            <div
                ref={gallery}
                className={styles.gallery}
            >
                <div className={`${styles.galleryWrapper} bg-secondary`}>
                    <Column images={[files[0], files[1], files[2]]} y={y} />
                    <Column images={[files[3], files[4], files[5]]} y={y2} />
                    <Column images={[files[6], files[7], files[8]]} y={y3} />
                    <Column images={[files[9], files[10], files[11]]} y={y4} />
                </div>
            </div>
            <div className={styles.spacer} />
        </main>
    );
};

export default ScrollingParallax;
