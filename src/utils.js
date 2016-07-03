import moment from 'moment';

export const getMomentOrNull = (date, format = defaults.format) => {
    if (moment.isMoment(date)) {
        return date;
    }

    if (moment.isDate(date)) {
        return moment(date);
    }

    if (typeof date === 'string' && date.length) {
        return moment(date, format);
    }

    return null;
};

export const makeInterval = length => Array.apply(null, Array(length));

export const getYearsInterval = ( date, interval ) => {
    const dist = interval;
    const yearsFrom = moment(date).add(-1 * dist, 'year');
    const yearsTo = moment(date).add(dist, 'year');
    return { yearsFrom, yearsTo };
}

export const getTotalWeeksInMonth = date => {

    // Unfortunately the moment's duration is buggy,
    // see #3274: https://github.com/moment/moment/issues/3274
    // Thus this is unrealistic:
    /*
        const endOf = moment(date).endOf('month');
        const startOf = moment(date).startOf('month')
        const duration = moment.duration(endOf - startOf);
        return ( duration.weeks() || 5 ) + 1;
    */

    // However, we can keep the size of calendar consistent,
    // and set the amount to constant 6
    return 6;
}

export const getFirstDayOfFirstWeek = date => {
    const fdom = moment(date).startOf('month');
    const fdomWeekday = fdom.weekday();

    return fdom.add(-1 * fdomWeekday, 'day');
}

