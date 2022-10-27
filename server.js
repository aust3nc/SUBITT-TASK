if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/notes', notesRouter);

app.get('/', async (req, res) => {
    const notes = await Note.find().sort({ 
        date: 'desc' })
    res.render('notes/index', { notes: notes })
}); 

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT || 3000);
    console.log(`Listening on port ${process.env.PORT || 3000}`);
}).catch((err) => {
    console.log(err);
});

