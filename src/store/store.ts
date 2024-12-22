import create from 'zustand';
import { GlobalState } from './storeTypes';

const useGlobalStore = create<GlobalState>((set) => ({
    theme: 'light', // Default theme
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),
    cartActive: false,
    spinner: false,
    isLoggedIn: false,
    isAdmin: false,
    setCartOpen: () => { set({ cartActive: true }); },
    setCartClose: () => { set({ cartActive: false }); },
    setAdmin: () => { set({ isAdmin: true }); },
    setUser: () => { set({ isAdmin: false }); },
    setLogin: () => { set({ isLoggedIn: true }); },
    setLogout: () => { set({ isLoggedIn: false }); },
    showSpinner: () => { set({ spinner: true }); },
    hideSpinner: () => { set({ spinner: false }); },
    cart: false,
    totalCartValue: 0,
    setTotalCartValue: (value:number) => { set({ totalCartValue: value }); },
    // Corrected setCart method with no get
    setCart: () => {
        set((state) => ({ cart: !state.cart }));
    },
}));

export default useGlobalStore;
