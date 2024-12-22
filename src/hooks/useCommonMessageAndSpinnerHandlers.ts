import { useCallback } from 'react';
import { Slide, toast } from 'react-toastify';
import useStore from '../store/store';
// import { AlertBoxData } from '../Components/types';
import { GlobalState } from '../store/storeTypes';
import useThemeSwitcher from './useThemeSwitcher';

export interface CommonHandlers {
    errorMessage: (message: string) => void,
    successMessage: (message: string) => void,
    infoMessage: (message: string) => void,
    showSpinner: () => void,
    hideSpinner: () => void,
    // showAlertBox: (alertBoxData: AlertBoxData) => void,
}

export const useCommonMessageAndSpinnerHandlers = (): CommonHandlers => {
    const showSpinner = useStore((state: GlobalState) => state.showSpinner);
    const hideSpinner = useStore((state: GlobalState) => state.hideSpinner);
    const { theme } = useThemeSwitcher();
    const isLightTheme = theme === 'light';
    console.log('isLightTheme: ', isLightTheme);
    // const showAlertBox = useStore((state: GlobalState) => state.showAlertBox);
    const errorMessage = useCallback((message: string) => {
        toast.error(message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            transition: Slide,
            className: isLightTheme ? 'border-primary  border-3  text-black-alpha-90' : 'border-primary  border-3 bg-primary text-black-alpha-90',
            bodyClassName: isLightTheme ? 'text-primary font-bold' : ' text-black-alpha-90 font-bold',

        });
    }, [isLightTheme]);

    const successMessage = useCallback((message: string) => {
        toast.success(message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            transition: Slide,
            className: isLightTheme ? 'border-primary  border-3  text-black-alpha-90 z-6 ' : 'border-primary z-6 border-3 bg-primary text-black-alpha-90',
            bodyClassName: isLightTheme ? 'text-primary font-bold z-6 ' : ' text-black-alpha-90 font-bold z-6',
        });
    }, [isLightTheme]);

    const infoMessage = useCallback((message: string) => {
        toast.info(message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            transition: Slide,
            className: isLightTheme ? 'border-primary  border-3  text-black-alpha-90' : 'border-primary  border-3 bg-primary text-black-alpha-90',
            bodyClassName: isLightTheme ? 'text-primary font-bold' : ' text-black-alpha-90 font-bold',
        });
    }, [isLightTheme]);

    return {
        showSpinner,
        hideSpinner,
        // showAlertBox,
        errorMessage,
        successMessage,
        infoMessage,

    };
};
