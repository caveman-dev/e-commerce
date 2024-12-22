import { Chip } from 'primereact/chip';
import { DataView } from 'primereact/dataview';
// import { Paginator } from 'primereact/paginator';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
// eslint-disable-next-line max-len
// import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_ROWS_PER_PAGE_OPTIONS } from '../../utils/constants';
import api from '../../utils/api';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import resolvePromise from '../../utils/resolvePromise';
import { isArrayValidAndNotEmpty } from '../../utils/nullChecks';

const WishlistContainer = () => {
    console.log();
    const [wishList, setWishlist] = useState([]);
    // const [first, setFirst] = useState(DEFAULT_PAGE_NUMBER); // Pagination state
    // const [rows, setRows] = useState(DEFAULT_PAGE_SIZE);

    const commonHandlers = useCommonMessageAndSpinnerHandlers();

    useEffect(() => {
        const fetchwishlist = async () => {
            const wishListPromise = axios.get(api.WISHLIST.LIST);
            const [response] = await resolvePromise(wishListPromise, commonHandlers);
            console.log('response:23244523423 ', response);
            if (isArrayValidAndNotEmpty(response)) {
                // @ts-ignore
                setWishlist(response);
            }
        };
        fetchwishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const header = (
        <div className="text-xl font-bold" style={{ backgroundColor: 'transparent!important' }}>Wishlist</div>
    );
    // @ts-ignore
    const itemTemplate = (product, index) => (
        <div className="col-12" key={product.id}>
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.mainImageUrl} alt={product.title} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.title}</div>
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                {/* <i className="pi pi-list" /> */}
                                <span className="font-semibold">{product.category.topLevelCategory.name}</span>
                                <i className="pi pi-angle-right" />
                                <span className="font-semibold">{product.category.secondLevelCategory.name}</span>
                                <i className="pi pi-angle-right" />
                                <span className="font-semibold">{product.category.name}</span>
                                {/* <i className="pi pi-angle-right" /> */}
                            </span>
                            {/* <Tag value={product.inventoryStatus} } /> */}
                        </div>
                        {/* <div className="text-xl font-medium te/xt-700">{product.brand}</div> */}
                        <div className="flex align-items-center gap-3">
                            {`Color: ${product.color}`}
                        </div>
                        <Tooltip target=".custom-target-icon" />

                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                {/* @ts-ignore  */}
                                {product.sizes?.map(({ name, sizeQuantity }) => (<Chip className="custom-target-icon" tooltip={sizeQuantity} tooltipOptions={{ position: 'top' }} key={name} label={name} />
                                ))}
                            </span>
                        </div>

                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                {product.labels?.map((labelName:string) => (<Chip key={labelName} label={labelName} icon="pi pi-tag" />
                                ))}
                            </span>
                        </div>

                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-4xl font-semibold">
                            ₹
                            {product.discountedPrice}
                        </span>
                        <span className="text-xl font-semibold ">
                            <span className="line-through">
                                ₹
                                {product.price}
                            &nbsp;
                            </span>
                            (
                            {product.discountPercent}
                            %
                            )
                        </span>
                        {/* eslint-disable-next-line max-len */}
                        {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} /> */}
                    </div>
                </div>
            </div>
        </div>
    );

    // @ts-ignore
    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        // @ts-ignore
        const list = items?.map((product, index) => itemTemplate(product, index));

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <Card style={{ minHeight: '92vh', backgroundColor: 'transparent' }}>
            <DataView
                // value={productList}
                value={wishList}
                // @ts-ignore
                listTemplate={listTemplate}
                header={header}
            />
            {/* <Paginator
                first={first}
                rows={rows}
                totalRecords={10}
                rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
                onPageChange={(e) => {
                    setFirst(e.first);
                    setRows(e.rows);
                }}
            /> */}
        </Card>
    );
};

export default WishlistContainer;
