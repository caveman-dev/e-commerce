import { useEffect } from 'react';
import axios from 'axios';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';

type Props = {
    id:string;
};
const ReviewsProduct = ({ id }:Props) => {
    // const [relatedProducts, setRelatedProducts] = useState([]);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();

    useEffect(() => {
        const fetchSimilarproducts = async () => {
            const fetchPromise = axios.get(`${api.REVIEWS.GET}${id}`);
            const [response] = await resolvePromise(fetchPromise, commonHandlers);
            console.log('response: 45234123123', response);
        };
        fetchSimilarproducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <div>ReviewsProduct</div>
    );
};

export default ReviewsProduct;
