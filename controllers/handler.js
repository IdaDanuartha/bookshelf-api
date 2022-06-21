const { nanoid } = require('nanoid')
const books = require('../data/books')

class APIHandler {
  static storeBook (request, h) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    }

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })

      response.code(400)
      return response
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })

      response.code(400)
      return response
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    // If success
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })

      response.code(201)
      return response
    }

    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan'
    })

    response.code(500)
    return response
  }

  static showAllBooks (request) {
    const { reading, finished } = request.query

    if (reading !== undefined) {
      const findBookByReading = books.filter((book) => book.reading === (reading === 1)).map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })

      return {
        status: 'success',
        data: {
          books: findBookByReading
        }
      }
    }

    if (finished !== undefined) {
      const findBookByReading = books.filter((book) => book.finished === (finished == 1)).map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })

      return {
        status: 'success',
        data: {
          books: findBookByReading
        }
      }
    }
    const mappingBooks = books.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
    return {
      status: 'success',
      data: {
        books: mappingBooks
      }
    }
  }

  static showDetailBook (request, h) {
    const { id } = request.params

    const book = books.filter((book) => book.id === id)

    if (book != '') {
      const response = h.response({
        status: 'success',
        data: {
          book: book[0]
        }
      })

      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }

  static updateBook (request, h) {
    const { id } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    const updatedAt = new Date().toISOString()

    const bookIndex = books.findIndex((book) => book.id === id)

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })

      response.code(400)
      return response
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })

      response.code(400)
      return response
    }

    if (bookIndex !== -1) {
      books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
      }

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: {
          books: books[bookIndex]
        }
      })
      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  static deleteBook (req, h) {
    const { id } = req.params

    const bookIndex = books.findIndex((b) => b.id === id)

    if (bookIndex !== -1) {
      books.splice(bookIndex, 1)
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      })
      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

module.exports = APIHandler