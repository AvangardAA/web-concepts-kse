const { expect } = require('chai');
const { getFactorial, multiply } = require('./functions');

describe('getFactorial', () =>
{
    it('return 120 for 5', () =>
    {
        expect(getFactorial(5)).to.equal(120);
    });

    it('return 720 for 6', () =>
    {
        expect(getFactorial('6')).to.equal(720);
    });

    it('return not valid', () =>
    {
        expect(getFactorial('hello')).to.equal('not valid');
    });
});

describe('multiply', () =>
{
    it('return 60 for (2)(3)(10)', () =>
    {
        expect(multiply(2)(3)(10).valueOf()).to.equal(60);
    });

    it('return -769072 for (-1)(677)(568)(2)', () =>
    {
        expect(multiply(-1)(677)(568)(2).valueOf()).to.equal(-769072);
    });

    it('return 3 for (3)', () =>
    {
        expect(multiply(3).valueOf()).to.equal(3);
    });
});