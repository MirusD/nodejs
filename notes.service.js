const fs = require('fs/promises')
const path = require('path')

const db = path.join(__dirname, 'db.json')

async function getNotes() {
    const notes = await fs.readFile(db, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function writeNotes(notes) {
    await fs.writeFile(db, JSON.stringify(notes))
}

module.exports = {
    getNotes,
    writeNotes
}
