import merge from 'lodash.merge';
import getProperty from 'lodash.get';

export const deepMergeObjects = <X, Y>(targetObject: X, sources: Y): X & Y => (
    merge(targetObject, sources)
);

export const getStringFromObject = (string: string, obj: object | undefined | null, defaultValue: unknown = '') => (
    getProperty(obj, string, defaultValue)
);
