const libraryTableBody = document.querySelector("table#myLibrary>tbody")
let myLibrary = []

function Book({title, author, pages, read}) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read || false
}

function addBookToLibrary(bookRecord) {
    const book = new Book(bookRecord)
    myLibrary.push(book)
}

function addBooksToLibrary(libraryArray) {
    libraryArray.forEach(book => {
        addBookToLibrary(book)
    })
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)
}

function createTestBooks() {
    const testLibrary = [
        {
            title: "20000 Leagues Under The Sea",
            author: "Jules Verne",
            pages: 264,
            read: true
        },
        {
            title: "Around The World in 80 Days",
            author: "Jules Verne",
            pages: 130,
            read: true
        },
        {
            title: "Art of War",
            author: "Sun Tzu",
            pages: 110,
            read: true
        }
    ]

    addBooksToLibrary(testLibrary)
}

function renderLibraryTable(libraryArray, targetEl) {
    targetEl.innerHTML = ""
    libraryArray.forEach((book, i) => {
        const row = targetEl.insertRow()
        row.insertCell(-1).textContent = book.title 
        row.insertCell(-1).textContent = book.author 
        row.insertCell(-1).textContent = book.pages 
        row.insertCell(-1).textContent = book.read
    })
}

function getDataFrom(form) {
    const bookData = {}
    bookData.title = form.title.value
    bookData.author = form.author.value
    bookData.pages = parseInt(form.pages.value)
    bookData.read = form.read.checked
    return bookData
}

function handleSubmitEvent(e) {
    e.preventDefault()
    const newBookData = getDataFrom(e.target)
    addBookToLibrary(newBookData)
    renderLibraryTable(myLibrary, libraryTableBody)
}

document.addEventListener("submit", (e) => {
    handleSubmitEvent(e)
})