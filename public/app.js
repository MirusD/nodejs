document.addEventListener('click', (event) => {
    const id = event.target.dataset?.id

    if (id) {
        const parent = event.target.closest('li')
        const btnsContainer = event.target.closest('span')
        const btns = btnsContainer.children

        function changeBtns(type) {
            switch (type) {
                case 'main':
                    btns[0].innerText = 'Обновить'
                    btns[0].dataset.type = 'update'
                    btns[1].innerText = '\u{00D7}'
                    btns[1].dataset.type = 'remove'
                    breake
                case 'update':
                    btns[0].innerText = 'Сохранить'
                    btns[0].dataset.type = 'edit'
                    btns[1].innerText = 'Отменить'
                    btns[1].dataset.type = 'cancel-update'
                    breake
            }
        }

        function toggleBtns(x) {
            switch (x) {
                case 'update': {
                    const title = parent.firstChild.textContent.trim()
                    const formEditTitle = document.createElement("input")
                    formEditTitle.type = "text"
                    formEditTitle.value = title
                    formEditTitle.dataset.value = title
                    parent.firstChild.remove()
                    parent.insertAdjacentElement('afterbegin', formEditTitle)
                    changeBtns('update')
                }
                    break
                case 'save': {
                    const title = parent.querySelector('input').value
                    parent.firstChild.remove()
                    parent.insertAdjacentHTML('afterbegin', `<span>${title}</span>`)
                    changeBtns('main')
                }
                    break
                case 'cancel': {
                    const title = parent.querySelector('input').dataset.value
                    parent.firstChild.remove()
                    parent.insertAdjacentHTML('afterbegin', `<span>${title}</span>`)
                    changeBtns('main')
                }
                    break
            }
        }

        switch (event.target.dataset.type) {
            case 'remove':
                remove(id).then(() => { event.target.closest('li').remove() })
                break
            case 'update':
                toggleBtns('update')
                break
            case 'edit':
                const input = parent.querySelector('input')
                const newTitle = input.value

                if (newTitle) {
                    edit(id, {title: newTitle})
                        .then(() => {
                            toggleBtns('save')
                            parent.firstChild.textContent = newTitle })
                }
                break
            case 'cancel-update':
                toggleBtns('cancel')
                break
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
