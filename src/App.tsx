import './App.css';
import { HashRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
// import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// eslint-disable-next-line max-len
// import PageLoadingAnimation from './components/animationComponent/pageLoadingAnimation/PageLoadingAnimation';
// import ErrorFallBackComponent from './components/ErrorHandlerComponent/ErrorFallBackComponent';
import { useEffect, useMemo } from 'react';
import Routes from './routes/Routes';
import ErrorHandlerComponent from './components/errorHandlerComponent/ErrorHandlerComponent';
import { getLoginState } from './utils/localStorage';
import { GlobalState } from './store/storeTypes';
import useGlobalStore from './store/store';
import { Roles } from './types/loginTypes';
// eslint-disable-next-line max-len
// import BackdropLoadingAnimation from './components/animationComponent/backdropLoadingAnimation/BackdropLoadingAnimation';

const App = () => {
    const { isLoggedIn, login } = useMemo(() => getLoginState(), []);

    const setLogin = useGlobalStore((state: GlobalState) => state.setLogin);
    const setAdmin = useGlobalStore((state: GlobalState) => state.setAdmin);

    useEffect(() => {
        if (isLoggedIn)setLogin();
        if (login?.role === Roles.ROLE_ADMIN)setAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, login?.role]);
    const value = {
        ripple: true,
    };
    return (
        <HashRouter>
            <PrimeReactProvider value={value}>
                <ErrorHandlerComponent>
                    <Routes />
                </ErrorHandlerComponent>
            </PrimeReactProvider>
        </HashRouter>
    );
};

export default App;
