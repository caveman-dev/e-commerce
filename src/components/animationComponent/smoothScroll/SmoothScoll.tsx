import Lenis from 'lenis';
import React, { useEffect } from 'react';

type Props = {
    children:React.ReactNode
};

const SmoothScoll = ({ children }:Props) => {
    useEffect(() => {
        const lenis = new Lenis();
        lenis.on('scroll', () => {
            console.log();
        });

        function raf(time:number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);
    return (
        <div>
            {children}
        </div>
    );
};

export default SmoothScoll;
