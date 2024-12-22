import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from 'primereact/rating';
import api from '../../utils/api';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import resolvePromise from '../../utils/resolvePromise';
import { getLoginState } from '../../utils/localStorage';
import { isArrayValidAndNotEmpty } from '../../utils/nullChecks';

type Props = {
    id:string;
};
const SimilarProducts = ({ id }:Props) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    // @ts-ignore
    const { login: { userId } } = getLoginState();
    useEffect(() => {
        const fetchSimilarproducts = async () => {
            const fetchPromise = axios.get(`${api.PRODUCTS.RELATED}${id}?userId=${userId}`);
            const [response] = await resolvePromise(fetchPromise, commonHandlers);
            setRelatedProducts(response ?? []);
        };
        fetchSimilarproducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    console.log();
    return (
        <div className="w-full ">
            <div className="text-2xl text-right p-2 text font-italic font-semibold">
                Products related to this item
            </div>
            {
                !isArrayValidAndNotEmpty(relatedProducts) && (
                    <div className="flex justify-content-end p-4 ">
                        <div className="text-xl w-5 text-center">
                            No related products found.
                        </div>
                    </div>
                )
            }
            {
                isArrayValidAndNotEmpty(relatedProducts) && (
                    <div className="flex justify-content-end ">
                        <div className="w-10 ">
                            {relatedProducts.map((product) => (
                                <div
                                // @ts-ignore
                                    key={product.productId}
                                    className="p-3 flex justify-content-around border-3
                                border-primary border-round-lg p-2 bg-secodary-reverse-100
                                hover-enlarge p-shadow-3 m-2"
                                >
                                    <div className="w-12rem h-15rem  ">
                                        <img
                                            // @ts-ignore
                                            src={product.mainImageUrl}
                                            alt="PRODUCT"
                                            className="w-full bg-gray-200 h-full border-round-lg
                                            p-shadow-5 hover-card p-1 border-2 border-primary
                                            box  fadein animation-duration-500"
                                            style={{
                                                objectFit: 'cover',
                                                // display: imagesLoaded ? 'block' : 'none',
                                            }}
                                        />
                                    </div>
                                    <div className="w-7  p-2 ">
                                        <div className=" p-2 font-bold
                                     text-xl"
                                        >
                                            {/* @ts-ignore */}
                                            {product.title}
                                        </div>
                                        <div className=" p-2 flex">
                                            <Rating
                                            // @ts-ignore
                                                value={product?.averageRating ?? 0}
                                                readOnly
                                                cancel={false}
                                            />
                                            <div>
&nbsp;
                                                {' '}
                                                {/* @ts-ignore */}
                                                {product?.numRatings ?? 0}
                                            </div>
                                        </div>
                                        <div className="p-2 text-3xl ">
                                            <span className="text-red-600">
                                                {/* @ts-ignore */}
                                                {product.discountPercent}
                                                %
                                                {' '}
                                            </span>
                                            {' '}
                                            {/* @ts-ignore */}
                                            <span>{product.discountedPrice}</span>
                                        </div>
                                        <div className="flex w-full justify-content-center m-2">
                                            <div className="p-2 bg-primary text-primary-reverse
                                         text-medium border-round-lg w-10 font-bold
                                         text-center"
                                            >
                                                {' '}
                                                LIMITED TIME DEAL
                                            </div>
                                        </div>
                                        <div className=" p-2 text-2xl line-through   ">
                                            ₹
                                            {' '}
                                            {/* @ts-ignore */}
                                            {product.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default SimilarProducts;
