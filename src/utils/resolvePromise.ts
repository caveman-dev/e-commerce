import { AxiosError, AxiosPromise } from 'axios';
import { isTextValidAndNotEmpty } from './nullChecks';
import {
    // didApiCallFailDueToUnauthorizedUser,
    // didApiCallFailDueToVersionMismatch,
    getErrorMessage,
} from './apiUtils';
import { CommonHandlers } from '../hooks/useCommonMessageAndSpinnerHandlers';
import { ErrorType } from '../types/commonTypes';

const resolvePromise = async <T>(
    aPromise: AxiosPromise<T>,
    commonHandlers: CommonHandlers,
    successMessageText?: string,
) => {
    const {
        showSpinner,
        hideSpinner,
        errorMessage,
        // setSessionTimeout,
        successMessage,
        // setAppVersionMismatch,
    } = commonHandlers;
    try {
        showSpinner();
        const response = await aPromise;
        const respData = response.data;
        if (isTextValidAndNotEmpty(successMessageText)) {
            successMessage(successMessageText);
        }
        return [respData, null];
    } catch (e) {
        const error = e as AxiosError<ErrorType>;
        errorMessage(getErrorMessage(error));
        return [null, error];
    } finally {
        hideSpinner();
    }
};

export default resolvePromise;
