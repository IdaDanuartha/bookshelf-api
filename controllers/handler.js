const { nanoid } = require('nanoid')
const books = require('../data/books')

class APIHandler 
{
    static storeBook(request, h)
    {
        const { title, category, author, synopsis } = request.payload[0]
        const id = nanoid(16)
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt

        const newBook = {
            id,
            title,
            category,
            author,
            synopsis,
            createdAt,
            updatedAt
        }

        books.push(newBook)

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        // If success
        if(isSuccess) {
            const response = h.response({
                status: true,
                message: "New Book has been added",
                data: {
                    books
                }
            })

            response.code(201)
            return response
        }

        // If not success
        const response = h.response({
            status: false,
            message: "New book failed to added",
        })

        response.code(500)
        return response
    }

    static showAllBooks()
    {
        return {
            status: true,
            data: {
                books
            }
        }
    }

    static showDetailBook(request, h)
    {
        const { id } = request.params

        const book = books.filter((book) => book.id === id)[0]

        // If book not undefined
        if(book !== undefined) {
            return {
                status: true,
                data: {
                    book
                }
            }
        }

        const response = h.response({
            status: false,
            message: "The book not found"
        })
        response.code(404)
        return response
    }

    static updateBook(request, h)
    {
        const { id } = request.params
        const { title, category, author, synopsis } = request.payload[0]

        const updatedAt = new Date().toISOString()

        const bookIndex = books.findIndex((book) => book.id === id)

        // Check if book index not -1
        if(bookIndex !== -1)
        {
            books[bookIndex] = {
                ...books[bookIndex],
                title,
                category,
                author,
                synopsis,
                updatedAt
            }

            const response = h.response({
                status: true,
                message: "Book updated successfully",
                data: {
                    books: books[bookIndex]
                }
            })
            response.code(200)
            return response
        }

        const response = h.response({
            status: false,
            message: "Book failed to update"
        })
        response.code(404)
        return response
    }

    static deleteBook(req, h)
    {
        const { id } = req.params

        const bookIndex = books.findIndex((b) => b.id === id)

        // Check if book index not -1
        if(bookIndex !== -1) {
            books.splice(bookIndex, 1)
            
            const response = h.response({
                status: true,
                message: 'Book deleted successfully'
            })
            response.code(200)
            return response
        }

        const response = h.response({
            status: false,
            message: 'Book failed to delete'
        })
        response.code(404)
        return response
    }

}

module.exports = APIHandler