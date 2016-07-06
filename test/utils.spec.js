import {
    getMomentOrNull,
    makeInterval,
    getYearsInterval,
    getTotalWeeksInMonth,
    getFirstDayOfFirstWeek
} from '../src/utils.js';

describe('A suite', function() {
    it('contains spec with an expectation', function() {
        expect(true).toBe(true);
    });
});

describe('utils.js', () => {
    describe('getMomentOrNull', () => {
        it('should be defined', () => {
            expect(getMomentOrNull).toBeDefined();
        });

        it('should return null if it cannot be parsed as a moment object', () => {
            expect(getMomentOrNull()).toBe(null);
            expect(getMomentOrNull('foobar')).toBe(null);
            expect(getMomentOrNull(null)).toBe(null);
            expect(getMomentOrNull(NaN)).toBe(null);
            expect(getMomentOrNull({})).toBe(null);
            expect(getMomentOrNull(4)).toBe(null);
            expect(getMomentOrNull(undefined)).toBe(null);
            expect(getMomentOrNull(new Date('foobar'))).toBe(null);
        });
    });

    describe('makeInterval', () => {
        it('should be defined', () => {
            expect(makeInterval).toBeDefined();
        });

        it('should return empty array if the length is invalid', () => {
            expect(makeInterval()).toEqual([]);
            expect(makeInterval('aaa')).toEqual([]);
            expect(makeInterval(-20)).toEqual([]);
            expect(makeInterval(NaN)).toEqual([]);
            expect(makeInterval(null)).toEqual([]);
            expect(makeInterval({})).toEqual([]);
            expect(makeInterval(undefined)).toEqual([]);
        });

        it('should return an array of a given length', () => {
            expect(makeInterval(0).length).toEqual(0);
            expect(makeInterval(5).length).toEqual(5);
            expect(makeInterval(10).length).toEqual(10);
            expect(makeInterval(12).length).toEqual(12);
        });
    });

    describe('getYearsInterval', () => {
        it('should be defined', () => {
            expect(getYearsInterval).toBeDefined();
        });

        it('should return result with nulls if the date is incorrect', () => {
            const interval = 1;
            const expectedResult = {
                yearsFrom: null,
                yearsTo: null
            };

            expect(getYearsInterval(null, interval)).toEqual(expectedResult);
            expect(getYearsInterval(undefined, interval)).toEqual(expectedResult);
            expect(getYearsInterval('asdasd', interval)).toEqual(expectedResult);
            expect(getYearsInterval(NaN, interval)).toEqual(expectedResult);
            expect(getYearsInterval({}, interval)).toEqual(expectedResult);
        });

        it('should return result with nulls if the interval is incorrect', () => {
            const year = new Date('2010-01-01T00:00:00Z');
            const expectedResult = {
                yearsFrom: null,
                yearsTo: null
            };

            expect(getYearsInterval(year, null)).toEqual(expectedResult);
            expect(getYearsInterval(year, undefined)).toEqual(expectedResult);
            expect(getYearsInterval(year, -1)).toEqual(expectedResult);
            expect(getYearsInterval(year, {})).toEqual(expectedResult);
            expect(getYearsInterval(year, NaN)).toEqual(expectedResult);
            expect(getYearsInterval(year, 'sd')).toEqual(expectedResult);
            expect(getYearsInterval(year, '')).toEqual(expectedResult);
        });

        it('should return result with correct dates if the date and interval are correct', () => {
            const year = new Date('2010-01-01T00:00:00Z');

            const expectedResult1 = {
                yearsFrom: new Date('2005-01-01T00:00:00Z'),
                yearsTo: new Date('2015-01-01T00:00:00Z')
            };
            const actualResult1 = getYearsInterval(year, 5);

            const expectedResult2 = {
                yearsFrom: new Date('2008-01-01T00:00:00Z'),
                yearsTo: new Date('2012-01-01T00:00:00Z')
            };
            const actualResult2 = getYearsInterval(year, 2);

            const expectedResult3 = {
                yearsFrom: new Date('2009-01-01T00:00:00Z'),
                yearsTo: new Date('2011-01-01T00:00:00Z')
            };
            const actualResult3 = getYearsInterval(year, 1);

            const expectedResult4 = {
                yearsFrom: new Date('2010-01-01T00:00:00Z'),
                yearsTo: new Date('2010-01-01T00:00:00Z')
            };
            const actualResult4 = getYearsInterval(year, 0);

            expect(actualResult1.yearsFrom.toDate().getTime()).toEqual(expectedResult1.yearsFrom.getTime());
            expect(actualResult2.yearsFrom.toDate().getTime()).toEqual(expectedResult2.yearsFrom.getTime());
            expect(actualResult3.yearsFrom.toDate().getTime()).toEqual(expectedResult3.yearsFrom.getTime());
            expect(actualResult4.yearsFrom.toDate().getTime()).toEqual(expectedResult4.yearsFrom.getTime());

            expect(actualResult1.yearsTo.toDate().getTime()).toEqual(expectedResult1.yearsTo.getTime());
            expect(actualResult2.yearsTo.toDate().getTime()).toEqual(expectedResult2.yearsTo.getTime());
            expect(actualResult3.yearsTo.toDate().getTime()).toEqual(expectedResult3.yearsTo.getTime());
            expect(actualResult4.yearsTo.toDate().getTime()).toEqual(expectedResult4.yearsTo.getTime());
        });
    });

    describe('getTotalWeeksInMonth', () => {
        it('should be defined', () => {
            expect(getTotalWeeksInMonth).toBeDefined();
        });
    });

    describe('getFirstDayOfFirstWeek', () => {
        it('should be defined', () => {
            expect(getFirstDayOfFirstWeek).toBeDefined();
        });
    });
});
