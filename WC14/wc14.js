const http = require('http');

const users = [
    {
        id: 1,
        firstName: 'KSE1',
        lastName: 'KSE1',
        status: 'Active',
        friends: [2, 3, 4, 9],
    },
    {
        id: 2,
        firstName: 'KSE2',
        lastName: 'KSE2',
        status: 'Active',
        friends: [1,2, 3, 5],
    },
    {
        id: 3,
        firstName: 'KSE3',
        lastName: 'KSE3',
        status: 'Active',
        friends: [2, 3, 1, 5, 4],
    },
    {
        id: 4,
        firstName: 'KSE4',
        lastName: 'KSE4',
        status: 'Active',
        friends: [2, 3, 1, 8],
    },
    {
        id: 5,
        firstName: 'KSE5',
        lastName: 'KSE5',
        status: 'Active',
        friends: [2, 3, 1, 4],
    },
    {
        id: 6,
        firstName: 'KSE6',
        lastName: 'KSE6',
        status: 'Active',
        friends: [2, 3, 10, 7],
    },
    {
        id: 7,
        firstName: 'KSE7',
        lastName: 'KSE7',
        status: 'Active',
        friends: [2, 3, 1, 6],
    },
    {
        id: 8,
        firstName: 'KSE8',
        lastName: 'KSE8',
        status: 'Active',
        friends: [2, 3, 8, 9],
    },
    {
        id: 9,
        firstName: 'KSE9',
        lastName: 'KSE9',
        status: 'Active',
        friends: [2, 3, 5, 7],
    },
    {
        id: 10,
        firstName: 'KSE10',
        lastName: 'KSE10',
        status: 'Active',
        friends: [2, 3, 4, 5],
    },
];

const server = http.createServer((req, res) =>
{
    if (req.method === 'GET' && req.url === '/getUserList')
    {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    }
    else if (req.method === 'GET' && req.url.startsWith('/getUserByID'))
    {
        const userId = parseInt(req.url.split('/').pop(), 10);
        const user = users.find((u) => u.id === userId);
        if (user)
        {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        }
        else
        {
            res.statusCode = 404;
            res.end('error not found');
        }
    }
    else if (req.method === 'POST' && req.url === '/updateUser')
    {
        let body = '';
        req.on('data', (c) => {
            body += c;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            const i = users.findIndex((u) => u.id === data.id);
            if (i !== -1) {
                users[i] = data;
                res.end(JSON.stringify(users));
            } else {
                res.statusCode = 404;
                res.end('error not found');
            }
        });
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/deleteUser'))
    {
        const userId = parseInt(req.url.split('/').pop(), 10);
        const i = users.findIndex((u) => u.id === userId);
        if (i !== -1)
        {
            users.splice(i, 1);
            users.forEach((u) =>
            {
                u.friends = u.friends.filter((friendId) => friendId !== userId);
            });
            res.end(JSON.stringify(users));
        }
        else
        {
            res.statusCode = 404;
            res.end('error not found');
        }
    }
    else if (req.method === 'POST' && req.url === '/createUser')
    {
        let body = '';
        req.on('data', (c) => {
            body += c;
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = users.length + 1;
            users.push(newUser);
            res.end(JSON.stringify(users));
        });
    }
    else
    {
        res.statusCode = 404;
        res.end('error on create user');
    }
});

const PORT = 3000;
server.listen(PORT, () =>
{
    console.log(`hello kse`);
});
