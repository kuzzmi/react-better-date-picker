import moment from 'moment';

import defaults from './defaults.js';

export const getMomentOrNull = (date, format = defaults.format) => {
    if (moment.isMoment(date)) {
        return date;
    }

    if (moment.isDate(date) && !isNaN( date.getTime() )) {
        return moment(date);
    }

    if (typeof date === 'string' && date.length) {
        const result = moment(date, format, true);
        if (result.isValid()) {
            return result;
        }
    }

    return null;
};

export const makeInterval = length => {
    if (length === null || length === '' || isNaN(length) || +length <= 0) {
        return [];
    }

    return Array.apply(null, Array(length));
};

export const getYearsInterval = ( date, interval ) => {
    let yearsTo = null;
    let yearsFrom = null;

    if (interval === null || interval === '' || isNaN(interval) || +interval < 0) {
        return { yearsFrom, yearsTo };
    }

    yearsFrom = getMomentOrNull(date);
    yearsTo = getMomentOrNull(date);
    if (yearsFrom && yearsTo) {
        yearsFrom.add(-1 * interval, 'year');
        yearsTo.add(interval, 'year');
    }
    return { yearsFrom, yearsTo };
}

export const getTotalWeeksInMonth = date => {
    if (getMomentOrNull(date) === null) {
        return 0;
    }

    return moment(date).endOf('month').week() - moment(date).startOf('month').week() + 1;
}

export const getFirstDayOfFirstWeek = date => {
    const fdom = moment(date).startOf('month');
    const fdomWeekday = fdom.weekday();

    return fdom.add(-1 * fdomWeekday, 'day');
}

