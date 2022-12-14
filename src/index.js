const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const { readSync } = require('fs');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Template engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'view'));

route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
