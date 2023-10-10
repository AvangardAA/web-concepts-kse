function getFactorial(n)
{
    if (isNaN(n) || n < 0)
    {
        return 'not valid';
    }
    if (n === 0 || n === 1)
    {
        return 1;
    }
    return n * getFactorial(n - 1);
}

function multiply(x)
{
    let res = x;

    function multiplyNext(y)
    {
        res *= y;
        return multiplyNext;
    }

    multiplyNext.valueOf = function ()
    {
        return res;
    };

    return multiplyNext;
}
// console.log(multiply(2)(3)(10).valueOf());

module.exports = { getFactorial, multiply };