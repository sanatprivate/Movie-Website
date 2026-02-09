const bcrypt = require('bcryptjs');

const users = [
    {
        username: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
    },
    {
        username: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
    },
    {
        username: 'Jane Smith',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
    },
];

module.exports = users;
