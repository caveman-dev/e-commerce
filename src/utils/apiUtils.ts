import { AxiosError, AxiosResponse } from 'axios';
import { isObjectValidAndNotEmpty } from './nullChecks';
import { ErrorType } from '../types/commonTypes';
import { getStringFromObject } from './lodash';

export const userNotLoggedInMessage = 'User not logged in..';

export const getErrorMessage = (error: AxiosError<ErrorType>) => {
    const { response } = error;
    let errorMessage = 'Api Call Failed';
    if (isObjectValidAndNotEmpty<AxiosResponse<ErrorType, unknown>>(response)) {
        errorMessage = response.data?.exception || response.data?.message || errorMessage;
    }
    return errorMessage;
};

export const didApiCallFailDueToUnauthorizedUser = (error: AxiosError<ErrorType>) => (
    error &&
    (error.status === 401 ||
        (error.response && error.response.status === 401) ||
        (error.response && getStringFromObject('response.message', error) === userNotLoggedInMessage) ||
        (error.response && error.response.data &&
            error.response.data.exception === userNotLoggedInMessage
        )
    )
);
export const a = 0;
