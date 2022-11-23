document.addEventListener('click', (event) => {
    const id = event.target.dataset?.id

    if (event.target.dataset.type === 'remove') {
        remove(id)
            .then(() => { event.target.closest('li').remove() })
    } else if (event.target.dataset.type === 'edit') {
        const newTitle = prompt('Введите новое название')
        if (newTitle) {
            edit(id, {title: newTitle})
                .then(() => { event.target.closest('li').firstChild.textContent = newTitle })
        }
    }
})


async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, data) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
