import { isArrayValidAndNotEmpty, isObjectValidAndNotEmpty, isValidFunction } from './nullChecks';

const callHandlers = <V>(
    newValue: V,
    name: string,
    handlers?: Array<string>,
    actionHandlers?: Record<string, (newValue: V, fieldName: string) => void>,
) => {
    if (
        isArrayValidAndNotEmpty(handlers) &&
        isObjectValidAndNotEmpty(actionHandlers)
    ) {
        handlers.forEach((action) => {
            const anActionHandlers = actionHandlers![action];
            if (isValidFunction(anActionHandlers)) {
                anActionHandlers(newValue, name);
            }
        });
    }
};

export default callHandlers;
