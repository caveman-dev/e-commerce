import { Button } from 'primereact/button';
import {
    useMemo,
    useRef, useState,
} from 'react';
import {
    Formik, FormikProps, useFormikContext,
} from 'formik';
import axios from 'axios';
import { DataTable, DataTableSelectionSingleChangeEvent, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import DialogComponent from '../../components/dialogComponent/DialogComponent';
import {
    ADD_CATEGORIES_FORM_VALIDATION,
    categoryFormFields, getInitialCategoryValues,
} from './categoriesUtil';
import GenerateFormFields from '../../components/formik/generateFormFields/GenerateFormFields';
import { CategoryFormValues } from './categoryTypes';
import api from '../../utils/api';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_ROWS_PER_PAGE_OPTIONS } from '../../utils/constants';
import useFetchCatgeories from './useFetchCatgeories';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import resolvePromise from '../../utils/resolvePromise';

const CategoryFields = () => {
    const {
        values,
    } = useFormikContext<CategoryFormValues>();

    return (
        <div className="w-full grid flex align-items-center">
            <GenerateFormFields<CategoryFormValues>
                fields={categoryFormFields}
                formValues={values}
            />

        </div>
    );
};

const CategoriesContainer = () => {
    const [addCategory, setAddCategory] = useState(false);
    const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
    const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
    const [selectedCategory, setSelectedCategory] = useState<CategoryFormValues | null>(null);
    const { data, refetch } = useFetchCatgeories(page, size);

    const tableContent = data?.content ?? [];
    const totalRows = data?.totalElements;
    const formikRef = useRef<FormikProps<CategoryFormValues>>(null);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { errorMessage } = commonHandlers;
    const handleOpenCategoryDialog = () => {
        setAddCategory(true);
    };

    const handleCloseCategoryDialog = () => {
        setSelectedCategory(null);
        setPage(DEFAULT_PAGE_NUMBER);
        refetch();
        setAddCategory(false);
    };

    // @ts-ignore
    const mapToPayload = (values) => {
        const updatedPaylaod = { ...values };
        if (isObjectValidAndNotEmpty(values.topLevelCategory)) {
            updatedPaylaod.topLevelCategoryId = values.topLevelCategory.value;
        }
        if (isObjectValidAndNotEmpty(values.secondLevelCategory)) {
            updatedPaylaod.secondLevelCategoryId = values.secondLevelCategory.value;
        }
        return updatedPaylaod;
    };

    // @ts-ignore
    const handleSubmit = async (values, { resetForm }) => {
        const addCategoryPromise = axios.post(api.CATEGORIES.CREATE_CATEGORY, mapToPayload(values));
        const [promiseSuccess] = await resolvePromise(addCategoryPromise, commonHandlers, 'Category Added');
        if (isObjectValidAndNotEmpty(promiseSuccess)) {
            resetForm();
        }
    };

    const dialogFooter = (
        <div>
            <Button
                label="Add"
                onClick={() => {
                    formikRef.current?.submitForm();
                }}
            />
        </div>
    );

    // @ts-ignore
    const handleDeleteRow = async (rowValue) => {
        const deletePromise = axios.delete(`${api.CATEGORIES.DELETE}${rowValue.id}`);
        const [promiseSuccess] =
        await resolvePromise(deletePromise, commonHandlers, 'Successfully Deleted!');
        if (!isObjectValidAndNotEmpty(promiseSuccess)) {
            errorMessage('Something went wrong; the category could not be deleted.');
        }
    };
    // @ts-ignore
    const confirmDelete = (rowValue) => {
        confirmDialog({
            message: 'Are you sure you want to delete this category? Deleting it will also remove all its subcategories and the associated products.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => handleDeleteRow(rowValue),
        });
    };

    // @ts-ignore
    const deletButtonTemplate = (rowValue) => (
        <Button
            icon="pi pi-trash"
            className="w-6rem shadow-2 border-round m-0 p-1"
            label="Delete"
            onClick={() => confirmDelete(rowValue)}
        />
    );
    const onPageChange = (event: DataTableStateEvent) => {
        setPage(Number(event?.page));
        setSize(event.rows);
    };
    const handleSelect = (e:DataTableSelectionSingleChangeEvent<CategoryFormValues[]>) => {
        setSelectedCategory(e.value);
        // @ts-ignore
        formikRef?.current?.resetForm(e.value);
        handleOpenCategoryDialog();
    };
    const initialValues = useMemo(
        // @ts-ignore
        () => getInitialCategoryValues(selectedCategory),
        [selectedCategory],
    );

    return (
        <div>
            <div className="flex w-full justify-content-end ">
                <Button type="button" label="Add Category" onClick={handleOpenCategoryDialog} icon="pi pi-plus" />
            </div>
            {
                addCategory && (
                    <DialogComponent
                        open={addCategory}
                        onClose={handleCloseCategoryDialog}
                        header="Add Catgeory"
                        footer={dialogFooter}
                        style={{ width: '60vw' }}
                    >
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={ADD_CATEGORIES_FORM_VALIDATION}
                            validateOnChange={false}
                            validateOnMount={false}
                            validateOnBlur={false}
                            // @ts-ignore
                            innerRef={formikRef}
                            enableReinitialize
                        >
                            <CategoryFields />
                        </Formik>
                    </DialogComponent>
                )
            }
            <div className="w-full pt-4">
                <DataTable
                    value={tableContent}
                    stripedRows
                    size="small"
                    paginator
                    rows={size}
                    rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
                    lazy
                    first={page * size}
                    totalRecords={totalRows}
                    onPage={onPageChange}
                    selection={selectedCategory}
                    onSelectionChange={handleSelect}
                    selectionMode="single"
                >
                    <Column field="name" header="Name" />
                    <Column field="level" header="Level" />
                    <Column field="topLevelCategoryName" header="Top Level Category" />
                    <Column field="secondLevelCategoryName" header="Second Level Category" />
                    <Column field="action" header="Action" body={deletButtonTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default CategoriesContainer;
