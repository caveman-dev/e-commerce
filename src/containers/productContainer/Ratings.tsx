import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'primereact/progressbar';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

type Props = {
    id: string | null;
    overall:number
};

type RatingDistribution = Record<string, number>;

const Ratings = ({ id, overall }: Props) => {
    const [ratingDistribution, setRatingDistribution] = useState<RatingDistribution>({});
    const commonHandlers = useCommonMessageAndSpinnerHandlers();

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            if (id) {
                const fetchPromise = axios.get(`${api.REVIEWS.COUNT}${id}`);
                const [response] = await resolvePromise(fetchPromise, commonHandlers);
                setRatingDistribution(response);
                console.log('response: ', response);
            }
        };
        fetchSimilarProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const sum = useMemo(() => {
        console.log('Calculating sum...');
        if (!isObjectValidAndNotEmpty(ratingDistribution)) return 0;
        return Object.values(ratingDistribution)
            .reduce((acc: number, value: number) => acc + value, 0);
    }, [ratingDistribution]);

    const ratingMemoised = useMemo(() => {
        console.log('Calculating ratingMemoised...');
        const initialDistribution = [
            { rate: '5', progress: 0, count: 0 },
            { rate: '4', progress: 0, count: 0 },
            { rate: '3', progress: 0, count: 0 },
            { rate: '2', progress: 0, count: 0 },
            { rate: '1', progress: 0, count: 0 },
        ];

        if (!isObjectValidAndNotEmpty(ratingDistribution) || sum === 0) return initialDistribution;

        return Object.keys(ratingDistribution)
            .reverse()
            .map((rate) => ({
                rate,
                progress: (ratingDistribution[rate] / sum) * 100,
                count: ratingDistribution[rate],
            }));
    }, [ratingDistribution, sum]);

    return (
        <div className="flex w-full">
            <div className="text-8xl w-4 text-primary flex justify-content-center align-items-center">
                {' '}
                {overall.toFixed(1)}
            </div>
            <div className="w-8">
                {ratingMemoised.map((rating) => (
                    <div key={rating.rate} className="w-full flex justify-content-end p-2">
                        <div className="flex justify-content-end align-items-center w-full">
                            <span>{rating.rate}</span>
                            <i className="pi pi-star-fill text-primary" />
                            &nbsp;
                            <ProgressBar className="w-full" value={rating.progress} showValue={false} />
                            &nbsp;
                            <span>{rating.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ratings;
