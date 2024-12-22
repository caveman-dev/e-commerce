// eslint-disable-next-line @typescript-eslint/ban-types
export const isValidFunction = (aFunction?: unknown): aFunction is Function => <boolean>(
    aFunction && typeof aFunction === 'function'
);

export const isArrayValidAndNotEmpty = <T>(anArray: unknown): anArray is Array<T> => (
    Boolean(anArray) && Array.isArray(anArray) && anArray.length > 0
);

export const isSetValidAndNotEmpty = <T>(aSet: unknown): aSet is Set<T> => (
    Boolean(aSet) && aSet instanceof Set && aSet.size > 0
);

export const isObjectValidAndNotEmpty = <T>(
    anObject: unknown,
): anObject is T => (
    anObject && typeof anObject === 'object' && Object.keys(anObject).length > 0
) as boolean;

export const isTextValidAndNotEmpty = (aString: unknown): aString is string | number => (
    aString &&
    ((typeof aString === 'string' && aString.length > 0) ||
    (typeof aString === 'number'))
) as boolean;

export const isNumberValid = (aNumber: unknown): aNumber is number => (
    (aNumber || aNumber === 0) && typeof aNumber === 'number'
) as boolean;

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const isNotNullOrUndefined = (value:unknown) => value !== null && value !== undefined;
