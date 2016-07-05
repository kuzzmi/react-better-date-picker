import {
    getMomentOrNull,
    makeInterval
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
            expect(getMomentOrNull(4)).toBe(null);
            expect(getMomentOrNull(undefined)).toBe(null);
            expect(getMomentOrNull(new Date('foobar'))).toBe(null);
        })
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
            expect(makeInterval(undefined)).toEqual([]);
        });

        it('returns an array of a given length', () => {
            expect(makeInterval(0).length).toEqual(0);
            expect(makeInterval(5).length).toEqual(5);
            expect(makeInterval(10).length).toEqual(10);
            expect(makeInterval(12).length).toEqual(12);
        });
    });
});
