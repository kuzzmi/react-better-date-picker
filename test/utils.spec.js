import {
    getMomentOrNull,
    makeInterval,
    getYearsInterval
} from '../src/utils.js';

describe('A suite', function() {
    it('contains spec with an expectation', function() {
        expect(true).toBe(true);
    });
});

describe('utils.js', () => {
    describe('getMomentOrNull', () => {
        it('is defined', () => {
            expect(getMomentOrNull).toBeDefined();
        });

        it('returns null if it cannot be parsed as a moment object', () => {
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
        it('is defined', () => {
            expect(makeInterval).toBeDefined();
        });

        it('returns empty array if the length is invalid', () => {
            expect(makeInterval()).toEqual([]);
            expect(makeInterval('aaa')).toEqual([]);
            expect(makeInterval(-20)).toEqual([]);
            expect(makeInterval(NaN)).toEqual([]);
            expect(makeInterval(null)).toEqual([]);
            expect(makeInterval({})).toEqual([]);
            expect(makeInterval(undefined)).toEqual([]);
        });

        it('returns an array of a given length', () => {
            expect(makeInterval(0).length).toEqual(0);
            expect(makeInterval(5).length).toEqual(5);
            expect(makeInterval(10).length).toEqual(10);
            expect(makeInterval(12).length).toEqual(12);
        });
    });

    describe('getYearsInterval', () => {
        it('is defined', () => {
            expect(getYearsInterval).toBeDefined();
        });

        it('returns result with nulls if the date is incorrect', () => {
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

        xit('returns result with correct dates if the date and interval are correct', () => {
            const year = new Date('01-01-2010');

            const expectedResult1 = {
                yearsFrom: new Date('01-01-2005'),
                yearsTo: new Date('01-01-2015')
            };

            // const expectedResult2 = {
            //     yearsFrom: new Date('01-01-2009'),
            //     yearsTo: new Date('01-01-2011')
            // };

            expect(getYearsInterval(year, 5).yearsFrom.getTime()).toEqual(expectedResult1.yearsFrom.getTime());
            // expect(getYearsInterval('asdasd', 1)).toEqual(expectedResult);
            // expect(getYearsInterval(undefined, 1)).toEqual(expectedResult);
            // expect(getYearsInterval({}, 1)).toEqual(expectedResult);
        });
    })
});
