function concatenate_string(text, maxLength)
{
    if (text.length <= maxLength)
    {
        return text.toUpperCase();
    }
    else
    {
        return text.slice(0, maxLength).toUpperCase() + '...';
    }
}

const result = concatenate_string('Longer than expected', 5);
console.log(result);

class Book
{
    constructor(title, author, numberOfPages, isRead, isFavorite)
    {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead()
    {
        this.isRead = true;
    }

    toggleFavorite()
    {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf
{
    constructor(books)
    {
        this.books = books;
    }

    addBook(book)
    {
        this.books.push(book);
    }

    removeBook(book)
    {
        const i = this.books.indexOf(book);
        if (i !== -1)
        {
            this.books.splice(i, 1);
        }
    }

    getUnreadBooks()
    {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks()
    {
        return this.books.filter(book => book.isFavorite);
    }
}

const book1 = new Book('LalaLend', 'Brown, Tim del Ray', 200, false, false);
const book2 = new Book("kse1", "kse1", "4", true, true);
const book3 = new Book("kse1", "kse1", "3", true, true);
const book4 = new Book("kse3", "kse3", "2", false, true);
const book5 = new Book("kse4", "kse4", "1", false, true);
const shelf = new Bookshelf([]);

shelf.addBook(book1);
shelf.addBook(book2);
shelf.addBook(book3);
shelf.addBook(book4);
shelf.addBook(book5);

console.log(shelf.getFavBooks());
