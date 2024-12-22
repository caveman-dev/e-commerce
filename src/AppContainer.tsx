import { AxiosError } from 'axios';
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
import CartOverlay from './containers/cartContainer/CartOverlay';
import useGlobalStore from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import {
    getLoginState, getTheme,
    setTheme,
} from './utils/localStorage';
import { GlobalState } from './store/storeTypes';
import { Roles } from './types/loginTypes';
import { PAGE_ROUTES } from './utils/constants';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { isTextValidAndNotEmpty } from './utils/nullChecks';
import { isNightTime } from './utils/DateUtils';

type Props = {
    children: React.ReactNode,
};

const AppContainerWithoutProviders = (props: Props) => {
    const { children } = props;
    const { isAdmin } = useGlobalStore();
    const childNode = children;
    const { isLoggedIn, login } = useMemo(() => getLoginState(), []);
    const location = useLocation();
    const isLoginPage = location.pathname !== PAGE_ROUTES.LOGIN;
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
        if (isTextValidAndNotEmpty(localTheme) && theme !== localTheme) {
            toggleTheme();
        } else if (isNightTime() && theme !== 'dark' && !getTheme()) {
            toggleTheme();
            setTheme('dark');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTheme(theme);
    }, [theme]);
    const toggleCheck = theme === 'light';

    return (
        <>
            <BackdropLoadingAnimation />
            <ToastContainer />
            <ConfirmDialog />
            <>
                {(!isAdmin && isLoginPage) && <CartOverlay />}
                <div
                    className=""
                    style={{
                        minHeight: '100vh',
                        background: toggleCheck ? 'linear-gradient(60deg, rgb(59,130,246,1) 0%, rgba(255,255,255,1) 100%)' : 'linear-gradient(60deg, rgb(59,130,246,1) 0%, rgba(0,0,0,1) 64%)',
                    }}
                >
                    <NavigationContainer />
                    {(childNode)}
                </div>
            </>
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
