import { Link } from 'react-router-dom';
import { getJsonPath, PAGE_ROUTES } from '../../utils/constants';

const UnAuthorizedContainer = () => (
    <div className="width-full h-100 flex-column justify-content-center align-item-center overflow-hidden">
        <div className="w-12 ">
            <img
                src={getJsonPath('/error/unauthorised.svg')}
                style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '60vh',
                }}
                alt="error"
            />
        </div>
        <div className="text-5xl font-italic font-semibold text-primary text-center">Error 404 - Page Not Found</div>
        <div className="text-xl font-italic font-medium p-2 text-center">Oops! It looks like the page you’re trying to reach doesn’t exist or is unavailable.</div>
        <div className="text-xl font-italic font-medium p-2 text-center mb-2">
            <span>
                You might want to check the URL or
                return to the &nbsp;
            </span>
            <Link
                className="text-primary text-xl hover:text-color-secondary"
                to={PAGE_ROUTES.BASE_ROUTE}
            >
                homepage
            </Link>
            <span>
                &nbsp;
                to find what you’re looking for.
            </span>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
);

export default UnAuthorizedContainer;
