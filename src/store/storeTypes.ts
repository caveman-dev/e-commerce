export interface GlobalState {
    theme: Theme;
    toggleTheme: () => void;
    spinner: boolean,
    showSpinner: () => void,
    hideSpinner: () => void,
    isLoggedIn:boolean,
    setLogin:()=>void,
    setLogout:()=>void,
    isAdmin:boolean,
    setAdmin:()=>void,
    setUser:()=>void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cart:boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCart:()=>void,
    cartActive:boolean,
    setCartOpen:()=>void,
    setCartClose:()=>void,
    totalCartValue:number,
    setTotalCartValue:(value:number)=>void
}

export type Theme = 'light' | 'dark';
export const a = 0;
