const chalk = require('chalk')
const { getNotes, writeNotes } = require('./notes.service')

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await writeNotes(notes)
    console.log(chalk.bgGreen('Note was added!'))
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    const newNotes = notes.filter(note => note.id !== id)
    await writeNotes(newNotes)
    console.log(chalk.bgGreen('Note was removed!'))
}

module.exports = {
    addNote, printNotes, removeNote
}
