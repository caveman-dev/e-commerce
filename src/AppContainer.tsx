import { AxiosError } from 'axios';
// import {
//     QueryCache, QueryClient, QueryClientProvider,
// } from 'react-query';

import { ToastContainer } from 'react-toastify';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';
import BackdropLoadingAnimation from './components/animationComponent/backdropLoadingAnimation/BackdropLoadingAnimation';
import { getErrorMessage } from './utils/apiUtils';
import { useCommonMessageAndSpinnerHandlers } from './hooks/useCommonMessageAndSpinnerHandlers';
import { ErrorType } from './types/commonTypes';
import NavigationContainer from './containers/navigationContainer/NavigationContainer';
// import SmoothScoll from './components/animationComponent/smoothScroll/SmoothScoll';
import CartOverlay from './containers/cartContainer/CartOverlay';
import useGlobalStore from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import {
    getLoginState, getTheme,
    setTheme,
    // setTheme
} from './utils/localStorage';
import { GlobalState } from './store/storeTypes';
import { Roles } from './types/loginTypes';
import { PAGE_ROUTES } from './utils/constants';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { isTextValidAndNotEmpty } from './utils/nullChecks';
import { isNightTime } from './utils/DateUtils';
// import { isNightTime } from './utils/DateUtils';

type Props = {
    children: React.ReactNode,
};

const AppContainerWithoutProviders = (props: Props) => {
    const { children } = props;
    const { isAdmin } = useGlobalStore();
    const childNode = children;
    const { isLoggedIn, login } = useMemo(() => getLoginState(), []);
    const location = useLocation(); // Get the current location
    const isLoginPage = location.pathname !== PAGE_ROUTES.LOGIN;
    console.log('isLoginPage: ', isLoginPage);
    const setLogin = useGlobalStore((state: GlobalState) => state.setLogin);
    const setAdmin = useGlobalStore((state: GlobalState) => state.setAdmin);

    useEffect(() => {
        if (isLoggedIn)setLogin();
        if (login?.role === Roles.ROLE_ADMIN)setAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, login?.role]);
    const { theme, toggleTheme } = useThemeSwitcher();
    useEffect(() => {
        const localTheme = getTheme();
        console.log('localTheme:4234234 ', localTheme, theme);
        if (isTextValidAndNotEmpty(localTheme) && theme !== localTheme) {
            console.log('reached:32423432 ');
            toggleTheme();
        } else if (isNightTime() && theme !== 'dark') {
            toggleTheme();
            setTheme('dark');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTheme(theme);
    }, [theme]);
    const toggleCheck = theme === 'light';
    console.log('toggleCheck: ', toggleCheck);

    //     background: rgb(20,184,166);
    // background: linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(0,0,0,1) 45%);
    // background: rgb(20,184,166);
    // background: linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(0,0,0,1) 64%);

    //     background: rgb(20,184,166);
    // background: linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(255,255,255,1) 64%);
    //     background: rgb(20,184,166);
    // background: linear-gradient(74deg, rgba(20,184,166,1) 0%, rgba(255,255,255,1) 67%);

    return (
        <>
            <BackdropLoadingAnimation />
            <ToastContainer />
            <ConfirmDialog />
            {/* <SmoothScoll> */}
            <>
                {(!isAdmin && isLoginPage) && <CartOverlay />}
                <div
                    className=""
                    style={{
                        minHeight: '100vh',
                        // background: rgb(20,184,166);
                        // eslint-disable-next-line max-len
                        // background: 'linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(255,255,255,1) 45%)',
                        // eslint-disable-next-line max-len
                        // background: 'linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(0,0,0,1) 45%)',
                        // eslint-disable-next-line max-len
                        // background: 'linear-gradient(45deg, rgba(20,184,166,1) 0%, rgba(0,0,0,1) 64%)',
                        // eslint-disable-next-line max-len
                        background: toggleCheck ? 'linear-gradient(60deg, rgb(59,130,246,1) 0%, rgba(255,255,255,1) 100%)' : 'linear-gradient(60deg, rgb(59,130,246,1) 0%, rgba(0,0,0,1) 64%)',
                        // eslint-disable-next-line max-len
                        // background: 'linear-gradient(74deg, rgba(20,184,166,1) 0%, rgba(255,255,255,1) 67%)',
                    }}
                >
                    <NavigationContainer />
                    {(childNode)}
                </div>
            </>
            {/* </SmoothScoll> */}
        </>
    );
};

const AppContainerWithQueryClient = (props: Props) => {
    const { children } = props;
    const { errorMessage } = useCommonMessageAndSpinnerHandlers();
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
        queryCache: new QueryCache({
            onError: async (e: unknown) => {
                const error = e as AxiosError<ErrorType>;
                errorMessage(getErrorMessage(error));
            },
        }),
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AppContainerWithoutProviders>
                {children}
            </AppContainerWithoutProviders>
        </QueryClientProvider>
    );
};

const AppContainer = (props: Props) => {
    const { children } = props;

    return (
        <AppContainerWithQueryClient>
            {children}
        </AppContainerWithQueryClient>
    );
};

export default AppContainer;
