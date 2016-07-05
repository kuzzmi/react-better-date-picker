import {
    getMomentOrNull
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
            expect(getMomentOrNull(4)).toBe(null);
            expect(getMomentOrNull(undefined)).toBe(null);
            expect(getMomentOrNull(new Date('foobar'))).toBe(null);
        })
    });
});
