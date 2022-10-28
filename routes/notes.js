const express = require('express')
const Note = require('./../models/note')
const router = express.Router()

router.get('/new', (req, res) => {
  try {
    res.render('notes/new', { note: new Note() })
    res.status(200)
  } catch (e) {
    res.redirect('/')
    res.status(500).send('Status: Internal Server Error');
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.status(200)
    res.render('notes/edit', { note: note })
  } catch (e) {
    res.redirect('/')
    res.status(404).send('Status: Not Found');
  }
})

router.get('/replace/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.status(200)
    res.render('notes/replace', { note: note })
  } catch (e) {
    res.redirect('/')
    res.status(404).send('Status: Not Found');
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const note = await Note.findOne({ slug: req.params.slug })
    res.status(200)
    res.render('notes/show', { note: note })
  } catch (e) {
    res.redirect('/')
    res.status(404).send('Status: Not Found');
  }
})

router.post('/', async (req, res, next) => {
  try {
    req.note = new Note()
    next()
  } catch (e) {
    res.redirect('/')
    res.status(500).send('Status: Internal Server Error');
  }
}, saveNoteAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  try {
    req.note = await Note.findById(req.params.id)
    res.status(201)
    next()
  }
  catch (e) {
    res.redirect('/')
    res.status(500).send('Status: Internal Server Error');
  }
}, saveNoteAndRedirect('edit'))

router.put('/:id', async (req, res, next) => {
  try {
    req.note = await Note.findById(req.params.id)
    res.status(201)
    next()
  } catch (e) {
    res.redirect('/')
    res.status(500).send('Status: Internal Server Error');
  }
}, saveNoteAndRedirect('replace'))

router.delete('/:id', async (req, res) => {
  try { 
    await Note.findByIdAndRemove(req.params.id)
    res.status(201)
    res.redirect('/')
  } catch (e) {
    res.redirect('/')
    res.status(500).send('Status: Internal Server Error');
  }
}) 

function saveNoteAndRedirect(path) {
  return async (req, res) => {
    let note = new Note({
      title: req.body.title,
      description: req.body.description,
      text: req.body.text
    })
    try {
      note = await note.save()
      res.status(201)
      res.redirect(`/notes/${note.slug}`)
    } catch (e) {
      res.render(`notes/${path}`, { note: note })
    }
  }
}

module.exports = router
