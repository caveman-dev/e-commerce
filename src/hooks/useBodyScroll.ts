import { useEffect } from 'react';

const useBodyScrollLock = (isOpen: boolean) => {
    useEffect(() => {
        const { scrollY } = window; // Capture the current scroll position
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY); // Restore the scroll position
        }

        return () => {
            // Cleanup on unmount or when the effect re-runs
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY); // Restore scroll position on cleanup
        };
    }, [isOpen]);
};

export default useBodyScrollLock;
