// eslint-disable-next-line import/prefer-default-export
export const NumberOf = (value: unknown) => {
    let numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
        numberValue = 0;
    }
    return numberValue;
};
