const data = [
    { name: 'Vlad', age: 30, date: '2023-10-20' },
    { name: 'Vova', age: 25, date: '2023-10-22' },
];

function generateRandomData()
{
    const names = ['Vasil', 'Petro', 'Sieben', 'Katya', 'Igor'];
    const randName = names[Math.floor(Math.random() * names.length)];
    const randAge = Math.floor(Math.random() * 40) + 18;
    const year = 2023;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const randDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return { name: randName, age: randAge, date: randDate };
}

for (let i = 0; i < 20; i++)
{
    const randd = generateRandomData();
    data.push(randd);
}

function renderData()
{
    $('#data').empty();
    data.forEach(i =>
    {
        const div = $('<div>');
        div.text(`Im'ya: ${i.name}, Age: ${i.age}, Date: ${i.date}`);
        $('#data').append(div);
    });
}

$(document).ready(function ()
{
    renderData();

    $('#btn1').on('click', function ()
    {
        const mod = _.map(data, obj => ({ ...obj, age: obj.age + 1 }));
        updAndRender(mod);
    });

    $('#btn2').on('click', function ()
    {
        const mod = _.sortBy(data, 'age');
        updAndRender(mod);
    });

    $('#btn3').on('click', function ()
    {
        const mod = _.shuffle(data);
        updAndRender(mod);
    });

    $('#btn4').on('click', function ()
    {
        const mod = _.filter(data, obj => obj.age > 25);
        updAndRender(mod);
    });

    $('#btn5').on('click', function ()
    {
        const mod = _.orderBy(data, ['name'], ['asc']);
        updAndRender(mod);
    });

    $('#btn6').on('click', function ()
    {
        const mod = _.groupBy(data, 'age');
        const flat = _.flatMap(mod);
        updAndRender(flat);
    });

    $('#btn7').on('click', function ()
    {
        const mod = _.uniqBy(data, 'name');
        updAndRender(mod);
    });

    $('#btn8').on('click', function ()
    {
        const mod = _.sampleSize(data, 2);
        updAndRender(mod);
    });

    $('#btn9').on('click', function ()
    {
        const mod = _.reverse(data.slice());
        updAndRender(mod);
    });

    $('#btn10').on('click', function ()
    {
        const mod = _.take(data, 1);
        updAndRender(mod);
    });

    function updAndRender(mod)
    {
        data.length = 0;
        data.push(...mod);
        renderData();
    }
});
