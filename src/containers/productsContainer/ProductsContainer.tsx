import { Button } from 'primereact/button';
import { useMemo, useRef, useState } from 'react';
import {
    Field,
    FieldArray, Formik, FormikHelpers, FormikProps, useFormikContext,
} from 'formik';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Chip } from 'primereact/chip';
import { Tooltip } from 'primereact/tooltip';
import { Paginator } from 'primereact/paginator';
import DialogComponent from '../../components/dialogComponent/DialogComponent';
import {
    ADD_PRODUCTS_FORM_VALIDATION, getInitialProductValues,
    mapProductDatatoPayload,
    productFormFieldLabel, productFormFields,
} from './productUtils';
import GenerateFormFields from '../../components/formik/generateFormFields/GenerateFormFields';
import { ProductFormValues, ProductUi } from './productTypes';
import FormikTextfield from '../../components/formik/fieldComponents/formikTextfield/FormikTextfield';
import FormikInputNumber from '../../components/formik/fieldComponents/formikInputNumber/FormikInputNumber';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_ROWS_PER_PAGE_OPTIONS } from '../../utils/constants';
import useFetchProducts from '../productListingContainer/useFetchProducts';

const ProductFields = () => {
    const {
        values,
        setFieldValue,
    } = useFormikContext<ProductFormValues>();
    const handleQuantityChangeHandler = (value:number, name:string) => {
        const match = name.match(/size\[(\d+)]/);
        const currentIndex = match ? parseInt(match[1], 10) : -1;
        const overAllQuantity = values.size.reduce((acc, size, index) => Number(acc) +
        (currentIndex === index ? value :
            Number(size.sizeQuantity)), 0);
        setFieldValue('quantity', overAllQuantity);
        setFieldValue(name, value);
    };

    return (
        <form>
            <div className="w-full grid flex align-items-center z-4" style={{ height: '100%' }}>
                <GenerateFormFields
                    fields={productFormFields}
                    formValues={values}
                />
                <Divider />
                <FieldArray name="size">
                    {({ push, remove }) => (
                        <div className="col-12">
                            {values.size.map((_, index) => (
                                <div
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                    className=" flex p-mb-2 col-12 align-items-center"
                                >
                                    <div className="p-col col-5">
                                        <Field
                                            component={FormikTextfield}
                                            name={`size[${index}].name`}
                                            className="w-full"
                                            placeholder="e.g. XS, S, M, L, XL,.."
                                            label={productFormFieldLabel.SIZE}
                                        />
                                    </div>
                                    <div className="p-col col-5">
                                        <Field
                                            component={FormikInputNumber}
                                            name={`size[${index}].sizeQuantity`}
                                            className="w-full"
                                            placeholder="e.g. 10"
                                            label={productFormFieldLabel.QUANTITY}
                                            onChangeHandlers={['onQuantityChange']}
                                            actionHandlers={
                                                { onQuantityChange: handleQuantityChangeHandler }
                                            }
                                        />
                                    </div>
                                    <div className="flex pt-3 ml-4">
                                        {
                                            values.size.length !== 1 && (
                                                <Button
                                                    type="button"
                                                    icon="pi pi-trash"
                                                    className="p-button-danger mr-4 "
                                                    onClick={() => remove(index)}
                                                />
                                            )
                                        }
                                        {
                                            index === values.size.length - 1 && (
                                                <div>
                                                    <Button
                                                        type="button"
                                                        icon="pi pi-plus"
                                                        className="p-button-success"
                                                        onClick={() => push({ name: '', sizeQuantity: 0 })}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}
                </FieldArray>
            </div>
        </form>
    );
};

const ProductsContainer = () => {
    const [addProduct, setAddProduct] = useState(false);
    const [page, setPage] = useState(DEFAULT_PAGE_NUMBER); // Pagination state
    const [rows, setRows] = useState(DEFAULT_PAGE_SIZE); // Number of items per page
    const [selectedProduct, setSelectedProduct] = useState<ProductUi | null>(null);
    const formikRef = useRef<FormikProps<ProductUi>>(null);
    const { data, refetch } = useFetchProducts(page, rows);
    const tableContent = data?.content ?? [];
    const totalRows = data?.totalElements;
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const handleOpenProductDialog = () => {
        setAddProduct(true);
    };

    const handleSelect = (product:ProductUi) => {
        setSelectedProduct(product);
        formikRef?.current?.resetForm({ values: product });
        handleOpenProductDialog();
    };

    const header = (
        <div className="text-xl font-bold">Products</div>
    );
    const itemTemplate = (product:ProductUi, index:number) => (
        <div className="col-12" key={product.id}>
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.mainImageUrl} alt={product.title} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.title}</div>
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                <span className="font-semibold">{product.category?.topLevelCategory.name}</span>
                                <i className="pi pi-angle-right" />
                                <span className="font-semibold">{product.category?.secondLevelCategory.name}</span>
                                <i className="pi pi-angle-right" />
                                <span className="font-semibold">{product.category?.name}</span>
                            </span>
                        </div>
                        <div className="flex align-items-center gap-3">
                            {`Color: ${product.color}`}
                        </div>
                        <Tooltip target=".custom-target-icon" />

                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                {product.size?.map(({ name }) => (<Chip className="custom-target-icon" key={name} label={name} />
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
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-rounded p-button-primary p-m-2"
                            onClick={() => handleSelect(product)}
                        />
                        <span className="text-2xl font-semibold line-through">
                            ₹
                            {product.price}
                        </span>
                        <span className="text-2xl font-semibold">
                            ₹
                            {product.discountedPrice}
                        </span>
                        <span className="text-2xl font-semibold">
                            {`Quantity: ${product.quantity}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
    const listTemplate = (items:ProductUi[]) => {
        if (!items || items.length === 0) return null;
        const list = items.map((product, index) => itemTemplate(product, index));

        return <div className="grid grid-nogutter">{list}</div>;
    };

    const handleCloseProductDialog = () => {
        setSelectedProduct(null);
        formikRef?.current?.resetForm();
        setPage(DEFAULT_PAGE_NUMBER);
        refetch();
        setAddProduct(false);
    };

    const initialValues = useMemo(
        () => getInitialProductValues(selectedProduct),
        [selectedProduct],
    );
    const handleSubmit = async (values:ProductUi, { resetForm }:FormikHelpers<ProductUi>) => {
        const payload = mapProductDatatoPayload(values);
        const addProductPromise = axios.post(api.PRODUCTS.CREATE, payload);
        const [promiseSuccess] = await resolvePromise(addProductPromise, commonHandlers, 'Product Added');
        if (isObjectValidAndNotEmpty(promiseSuccess)) {
            resetForm();
        }
        console.log();
    };

    const dialogFooter = (
        <div>
            <Button
                label="Add"
                onClick={() => {
                    console.log('formikRef.current?.errors: ', formikRef.current?.errors);
                    formikRef.current?.submitForm();
                }}
            />
        </div>
    );

    return (
        <div>
            <div className="flex w-full justify-content-end ">
                <Button type="button" label="Add Product" onClick={handleOpenProductDialog} icon="pi pi-plus" />
            </div>
            <DialogComponent
                open={addProduct}
                onClose={handleCloseProductDialog}
                header="Add Product"
                footer={dialogFooter}
                maximizable
                blockScroll
                keepInViewport
                draggable={false}
                style={{
                    width: '60vw',
                }}
            >
                <Formik
                // @ts-ignore
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={ADD_PRODUCTS_FORM_VALIDATION}
                    validateOnChange={false}
                    validateOnMount={false}
                    validateOnBlur
                    innerRef={formikRef}
                    enableReinitialize
                >
                    <ProductFields />
                </Formik>
            </DialogComponent>
            <div className="p-2">
                <DataView
                    value={tableContent}
                    // @ts-ignore
                    listTemplate={listTemplate}
                    header={header}
                />
                <Paginator
                    first={page}
                    rows={rows}
                    totalRecords={totalRows}
                    rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
                    onPageChange={(e) => {
                        setPage(e.first);
                        setRows(e.rows);
                    }}
                />
            </div>

        </div>
    );
};

export default ProductsContainer;
