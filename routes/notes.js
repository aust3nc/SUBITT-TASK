const express = require('express')
const Note = require('./../models/note')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('notes/new', { note: new Note() })
})

router.get('/edit/:id', async (req, res) => {
  const note = await Note.findOneAndDelete(req.params.id)
  res.render('notes/edit', { note: note })
})

router.get('/replace/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id)
  res.render('notes/replace', { note: note })
})

router.get('/:slug', async (req, res) => {
  const note = await Note.findOne({ slug: req.params.slug })
  if (note == null) res.redirect('/')
  res.render('notes/show', { note: note })
})

router.post('/', async (req, res, next) => {
  req.note = new Note()
  next()
}, saveNoteAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.note = await Note.findById(req.params.id)
  next()
}, saveNoteAndRedirect('edit'))

router.put('/:id', async (req, res, next) => {
  req.note = await Note.findOneAndReplace(req.params.id)
  next()
}, saveNoteAndRedirect('replace'))

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.redirect('/')
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
      res.redirect(`/notes/${note.slug}`)
    } catch (e) {
      // console.log(e)
      res.render(`notes/${path}`, { note: note })
    }
  }
}

module.exports = router