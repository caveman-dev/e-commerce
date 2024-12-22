import useGlobalStore from '../../../store/store';
import { GlobalState } from '../../../store/storeTypes';
import Spinner from '../spinner/Spinner';

const BackdropLoadingAnimation = () => {
    const spinner = useGlobalStore((state: GlobalState) => state.spinner);
    if (!spinner) return null;
    return (
        <div className="fixed top-0 left-0 w-screen h-screen opacity-50 bg-black-alpha-50 flex justify-content-center align-items-center z-6">
            <Spinner />
        </div>
    );
};

export default BackdropLoadingAnimation;
