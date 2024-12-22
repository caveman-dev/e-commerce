import {
    format, isAfter, parseISO, set,
} from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const isNightTime = () => {
    const now = new Date();
    const sixPM = set(new Date(), {
        hours: 18, minutes: 0, seconds: 0, milliseconds: 0,
    });
    return isAfter(now, sixPM);
};

export const converToStringDate = (dateString: string): string => {
    // Parse the ISO date string
    const parsedDate = parseISO(dateString);

    // Format the date
    return format(parsedDate, "'On' EEE, dd MMM, yyyy");
};
