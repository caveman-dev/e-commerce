import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PAGE_ROUTES } from '../utils/constants';
import PageLoadingAnimation from '../components/animationComponent/pageLoadingAnimation/PageLoadingAnimation';
import AppContainer from '../AppContainer';
import useGlobalStore from '../store/store';
import FooterContainer from '../containers/homeContainer/FooterContainer';

const AdminDashBoardPage = React.lazy(() => import('../pages/AdminDashBoardPage'));
const ProductsPage = React.lazy(() => import('../pages/ProductsPage'));
const CategoriesPage = React.lazy(() => import('../pages/CategoriesPage'));
const AdminOrdersPage = React.lazy(() => import('../pages/AdminOrdersPage'));
const OrdersPage = React.lazy(() => import('../pages/OrdersPage'));
const CustomersPage = React.lazy(() => import('../pages/CustomersPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const AdminMenuPage = React.lazy(() => import('../pages/AdminMenuPage'));
const UnAuthorisedPage = React.lazy(() => import('../pages/UnAuthorisedPage'));
const ProductPage = React.lazy(() => import('../pages/ProductPage'));
const ProductListingPage = React.lazy(() => import('../pages/ProductListingPage'));
const CheckoutPage = React.lazy(() => import('../pages/CheckoutPage'));
const ContactUsPage = React.lazy(() => import('../pages/ContactUsPage'));
const WishlistPage = React.lazy(() => import('../pages/WishlistPage'));

type PrivateRouteProps = object & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
};

const PrivateRoute = (privateRouteProps: PrivateRouteProps) => {
    const { component: Component, ...rest } = privateRouteProps;
    const { isLoggedIn, isAdmin } = useGlobalStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
    }));

    return (
        <Route
            {...rest}
            render={(props) => (isLoggedIn && isAdmin ? (
                <Component {...props} />
            ) : (
                <Redirect to={PAGE_ROUTES.UNAUTHORIZED} />
            ))}
        />
    );
};

const AdminRoutes = () => (
    <AdminMenuPage>
        <Suspense fallback={<PageLoadingAnimation />}>
            <Switch>
                <PrivateRoute
                    exact
                    path={PAGE_ROUTES.ADMIN_DASHBOARD}
                    component={AdminDashBoardPage}
                />
                <PrivateRoute
                    path={PAGE_ROUTES.PRODUCTS}
                    component={ProductsPage}
                />
                <PrivateRoute
                    path={PAGE_ROUTES.CATEGORIES}
                    component={CategoriesPage}
                />
                <PrivateRoute
                    path={PAGE_ROUTES.ADMIN_ORDERS}
                    component={AdminOrdersPage}
                />
                <PrivateRoute
                    path={PAGE_ROUTES.CUSTOMERS}
                    component={CustomersPage}
                />
            </Switch>
        </Suspense>
    </AdminMenuPage>
);

const WithFooterRoutes = () => (
    <FooterContainer>
        <Suspense fallback={<PageLoadingAnimation />}>
            <Switch>
                <Route exact path={PAGE_ROUTES.BASE_ROUTE} component={HomePage} />
                <Route path={PAGE_ROUTES.PRODUCT} component={ProductPage} />
                <Route path={PAGE_ROUTES.PRODUCT_LISTING} component={ProductListingPage} />
                <Route path={PAGE_ROUTES.CHECKOUT} component={CheckoutPage} />
                <Route path={PAGE_ROUTES.ORDERS} component={OrdersPage} />
                <Route path={PAGE_ROUTES.ORDERS} component={OrdersPage} />
                <Route path={PAGE_ROUTES.CONTACT_US} component={ContactUsPage} />
            </Switch>
        </Suspense>
    </FooterContainer>
);

const Routes = () => (
    <AppContainer>
        <Suspense fallback={<PageLoadingAnimation />}>
            <Switch>
                {/* Public Routes */}

                <Route exact path={PAGE_ROUTES.BASE_ROUTE} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.LOGIN} component={LoginPage} />
                <Route path={PAGE_ROUTES.LOGIN} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.PRODUCT} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.PRODUCT_LISTING} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.CHECKOUT} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.ORDERS} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.CONTACT_US} component={WithFooterRoutes} />
                <Route path={PAGE_ROUTES.UNAUTHORIZED} component={UnAuthorisedPage} />
                <Route path={PAGE_ROUTES.WISHLIST} component={WishlistPage} />

                {/* Admin Routes */}
                <Route path={PAGE_ROUTES.ADMIN_DASHBOARD} component={AdminRoutes} />
                <Route path={PAGE_ROUTES.PRODUCTS} component={AdminRoutes} />
                <Route path={PAGE_ROUTES.CATEGORIES} component={AdminRoutes} />
                <Route path={PAGE_ROUTES.ADMIN_ORDERS} component={AdminRoutes} />
                <Route path={PAGE_ROUTES.CUSTOMERS} component={AdminRoutes} />
                <Route path="*">
                    <Redirect to={PAGE_ROUTES.UNAUTHORIZED} />
                </Route>
            </Switch>
        </Suspense>
    </AppContainer>
);

export default Routes;
