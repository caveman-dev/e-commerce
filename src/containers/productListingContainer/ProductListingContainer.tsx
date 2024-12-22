import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {
    Paginator, PaginatorCurrentPageReportOptions,
    PaginatorPageChangeEvent, PaginatorRowsPerPageDropdownOptions,
} from 'primereact/paginator';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import { isArrayValidAndNotEmpty } from '../../utils/nullChecks';
import useFetchProducts from './useFetchProducts';
import {
    DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_ROWS_PER_PAGE_OPTIONS, PAGE_ROUTES,
} from '../../utils/constants';
import { ProductUi } from '../productsContainer/productTypes';

const ProductListingContainer = () => {
    const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
    const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
    const [productCatgeories, setProductCatgeories] = useState<{ label:string }[]>([]);
    const home = { icon: 'pi pi-home', url: '/' };
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const history = useHistory();
    const { hash } = window.location;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const queryParams = new URLSearchParams(queryString);
    const category = queryParams.get('thirdLevelCategory');

    const { data: productData } = useFetchProducts(page, size, category ?? '');

    const productList:ProductUi[] = productData?.content ?? [];
    const totalRows = productData?.totalElements;
    useEffect(() => {
        const fetchCategory = async () => {
            const categoryPromise = axios.get(`${api.CATEGORIES.SEARCH}?id=${category} `);
            const [response] = await resolvePromise(categoryPromise, commonHandlers);
            if (isArrayValidAndNotEmpty(response?.content)) {
                const categoryMap = [];
                const data = response?.content[0];
                categoryMap.push({ label: data.topLevelCategory.name });
                categoryMap.push({ label: data.secondLevelCategory.name });
                categoryMap.push({ label: data.name });
                setProductCatgeories(categoryMap);
            }
        };
        fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const template2 = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        // eslint-disable-next-line react/no-unstable-nested-components
        RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
            const dropdownOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS;
            const { value, onChange } = options;
            return (
                <>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                        Items per page:
                        {' '}
                    </span>
                    <Dropdown
                        value={value}
                        options={dropdownOptions}
                        onChange={onChange}
                    />
                </>
            );
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        CurrentPageReport: (
            { first: firstReport, last, totalRecords }: PaginatorCurrentPageReportOptions,
        ) => (
            <span style={{
                color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center',
            }}
            >
                {firstReport}
                {' '}
                -
                {last}
                {' '}
                of
                {totalRecords}
            </span>
        ),
    };
    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPage(Number(event?.page));
        setSize(event.rows);
    };

    const handleRouteToProductDetails = (product:number | undefined) => {
        history.push(`${PAGE_ROUTES.PRODUCT}?id=${product}`);
    };
    return (
        <div className="p-2">
            <BreadCrumb style={{ backgroundColor: 'transparent' }} model={productCatgeories} home={home} className="m-2 w-6 " />
            <div className="flex justify-content-end align-items-center pr-7 ">
                <Button className="m-1 hover:bg-primary hover:text-primary-reverse" icon="pi pi-sort-alt" label="Sort" outlined />
                <Button className="m-1 hover:bg-primary hover:text-primary-reverse" icon="pi pi-filter" label="Filter" outlined />
            </div>
            <div className="w-full mt-2  p-2 flex flex-wrap">
                {productList.map((product) => (
                    <div key={product.id} className="  w-3 flex justify-content-center mb-4  ">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                         jsx-a11y/no-static-element-interactions */}
                        <div
                            className="p-2  w-9 cursor-pointer hover-enlarge "
                            onClick={() => handleRouteToProductDetails(product?.id)}
                        >
                            <div className="w-full relative">

                                <div className="w-full">
                                    <img
                                        src={product.mainImageUrl}
                                        alt="PRODUCT"
                                        className="w-full bg-gray-200 h-25rem shadow-2 border-round-lg  border-2 border-primary-reverse mx-auto "
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="w-full flex justify-content-between align-items-center absolute bottom-0">
                                    <div className="bg-gray-700 border-black-800 border-1  flex w-8 m-2 border-round-lg justify-content-center ">
                                        <div className="p-1 text-primary">
                                            {product.averageRating}
                                        </div>
                                        <div className="p-1">
                                            <i className="pi pi-star-fill text-primary" />
                                        </div>
                                        <div className="p-1 text-primary">
                                            |&nbsp;
                                            {product.numRatings}
                                        </div>
                                    </div>
                                    <div className="w-full  flex justify-content-end align-items-center  pr-2 pb-3 text-primary text-4xl">
                                        <i className={product.wishlist ? ' text-red-500 pi pi-heart-fill cursor-pointer border-primary p-3 hover:bg-primary   border-circle' : 'pi pi-heart p-3 cursor-pointer hover:bg-primary  border-circle'} style={{ fontSize: '2rem' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-2 text-xl">{product.title}</div>
                            <div className="flex justify-content-between">
                                <div className=" p-2">
                                    ₹
                                    {product.price}
                                </div>
                                <div className="p-2  ">
                                    <span className="text-red-600">
                                        {product.discountPercent}
                                        %
                                        {' '}
                                    </span>
                                    <span>
                                        ₹
                                        {product.discountedPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Paginator
                style={{
                    backgroundColor: 'transparent',
                }}
                template={template2}
                first={page * size}
                rows={size}
                totalRecords={totalRows}
                onPageChange={onPageChange}
                className="justify-content-end"
            />
        </div>
    );
};

export default ProductListingContainer;
