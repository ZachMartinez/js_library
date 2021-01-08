const libraryTableBody = document.querySelector("table#myLibrary>tbody")
let myLibrary = []

function Book({title, author, pages, read}) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read || false
}

function addBookToLibrary(bookRecord) {
    const newBook = new Book(bookRecord)
    myLibrary.push(newBook)
}

function removeBookFromLibrary(i) {
    myLibrary.splice(i, 1)
}

function createTestBooks() {
    addBookToLibrary({
        title: "War and Peace",
        author: "Leo Tolstoy",
        pages: 1400,
        read: false
    })

    addBookToLibrary({
        title: "20000 Leagues Under The Sea",
        author: "Jules Verne",
        pages: 250,
        read: false
    })

    addBookToLibrary({
        title: "Hitchker's Guide to The Galaxy",
        author: "Douglas Adams",
        pages: 224,
        read: false
    })
}

function renderLibrary(libraryArray, targetEl) {
    targetEl.innerHTML = ""
    libraryArray.forEach((book, i) => {
        const row = targetEl.insertRow()
        row.setAttribute("data-index", i)
        row.insertCell(-1).textContent = book.title
        row.insertCell(-1).textContent = book.author
        row.insertCell(-1).textContent = book.pages
        row.insertCell(-1).textContent = book.read
        row.insertCell(-1).innerHTML = `<button class="deleteBtn">Delete</button>`
    })
}

function getBookDataFrom(form) {
    const newBookData = {}
    newBookData.title = form.title.value
    newBookData.author = form.author.value
    newBookData.pages = parseInt(form.pages.value)
    newBookData.read =  form.read.checked
    return newBookData
}

function handleDeleteButtonClick(targetEl) {
    const index = targetEl.closest("tr").dataset.index
    removeBookFromLibrary(index)
    renderLibrary(myLibrary, libraryTableBody)
}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    const newBookData = getBookDataFrom(e.target)
    addBookToLibrary(newBookData)
    renderLibrary(myLibrary, libraryTableBody)
})

document.addEventListener("click", (e) => {
    switch (e.target.classList.value) {
        case "deleteBtn":
            handleDeleteButtonClick(e.target)
            break
        default:
            break
    }
})