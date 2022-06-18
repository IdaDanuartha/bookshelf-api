const { 
    storeBook, 
    showAllBooks, 
    showDetailBook, 
    updateBook, 
    deleteBook 
} = require('../controllers/handler')

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: showAllBooks
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: showDetailBook
    },
    {
        method: 'POST',
        path: '/books',
        handler: storeBook
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }
]

module.exports = routes