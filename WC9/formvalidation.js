document.addEventListener('DOMContentLoaded', function()
{
    const f = document.getElementById('f');
    const r = document.getElementById('r');

    f.addEventListener('submit', function(event)
    {
        event.preventDefault();

        const t = document.getElementById('t').value;
        const n = document.getElementById('n').value;
        const rg = document.getElementById('rg').value;
        const d = document.getElementById('d').value;
        const e = document.getElementById('e').value;
        const p1 = document.getElementById('p1').value;
        const p2 = document.getElementById('p2').value;
        const radio = document.querySelectorAll('input[name="r"]');
        let radioval = null;

        for (const opt of radio)
        {
            if (opt.checked)
            {
                radioval = opt.value;
                break;
            }
        }

        let v = true;
        const err = [];

        if (t.trim() === '')
        {
            v = false;
            err.push('text empty');
        }

        if (isNaN(n))
        {
            v = false;
            err.push('only digits');
        }

        if (rg < 1 || rg > 100)
        {
            v = false;
            err.push('invalid range (1-100)');
        }

        if (!Date.parse(d))
        {
            v = false;
            err.push('invalid date');
        }

        if (!/^\S+@\S+\.\S+$/.test(e))
        {
            v = false;
            err.push('invalid email');
        }

        if (!p1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/))
        {
            v = false;
            err.push('pass error: 3 char, 1 upper, 1 lower, 1 digit, 1 special');
        }

        if (p1 !== p2)
        {
            v = false;
            err.push('passwords dont match');
        }

        if (!radioval)
        {
            v = false;
            err.push('radio empty');
        }

        if (v)
        {
            r.textContent = 'data: ' + JSON.stringify({
                t, n, rg, d, e, radio: radioval
            });
        }
        else
        {
            r.innerHTML = '<strong>form invalid</strong><ul>' +
                err.map(e => `<li>${e}</li>`).join('') +
                '</ul>';
        }
    });
});


