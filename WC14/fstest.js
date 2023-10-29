const http = require('http');
const fs = require('fs');

const fp = __dirname + '/file.txt';

const server = http.createServer((req, res) =>
{
    if (req.url === '/getSync')
    {
        const data = fs.readFileSync(fp, 'utf8');
        res.end(data);
    }
    else if (req.url === '/getAsync')
    {
        fs.readFile(fp, 'utf8', (err, data) =>
        {
            if (err)
            {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            else
            {
                res.end(data);
            }
        });
    }
    else
    {
        res.statusCode = 404;
        res.end('error not found');
    }
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`hello kse`);
});
