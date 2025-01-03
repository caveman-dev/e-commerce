import { Button } from 'primereact/button';
import { getStringFromObject } from '../../utils/lodash';

type Props = {
    error: Error;
};
const ErrorFallBackComponent = (props: Props) => {
    const { error } = props;
    return (
        <div className="ErrorFallBack grid flex flex-column   align-items-center justify-content-center" style={{ width: '100%' }}>
            <div
                className="flex align-items-center justify-content-center col-6"
                style={{ width: '50%' }}
            >
                <img
                    height="600"
                    width="600"
                    src="/Error/bug.svg"
                    alt="error"
                />
            </div>
            <div
                className="col-6"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div>An Error Occurred</div>
                <Button
                    onClick={() => {
                        window.location.reload();
                    }}
                    tooltip={
                        (getStringFromObject('message', error) as string) || ''
                    }
                >
                    Click Here To Reload Page
                </Button>
            </div>
        </div>
    );
};

export default ErrorFallBackComponent;
