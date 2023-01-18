import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {
  
const client = axios.create({
  baseURL: "http://localhost:8080/books" 
});
  
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(author, title);
  };

  const addBook = (author, title) => {
    client
      .post('', {
          author: author,
          title: title,
        })
        .then((response) => {
          setBooks([response.data, ...books]);
        });
    setAuthor('');
    setTitle('');
  };

  useEffect(() => {
    client.get().then((response) => {
        setBooks(response.data);
      });
  }, []);

  const deleteBook = (id) => {
    client.delete(`${id}`)
    setBooks(
      books.filter((book) => {
        return book.id !== id;
      })
    )
  }

  return (
    <div className="App">
      <h2>All Books</h2>
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" name="author" placeholder="author" value={author}
          onChange={(e) => setAuthor(e.target.value)}></input><br />
        <input className="input-field" type="text" name="title" placeholder="title" value={title}
          onChange={(e) => setTitle(e.target.value)}></input><br />
        <button className="btn btn-primary" type="submit">add a book</button>
      </form>
      {books.map((book) => {
      return (
        <div className="book-list" key={book.id}>
            <h2>{book.author}</h2>
            <p>{book.title}</p>
            <p>
              <button className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</button>
            </p>
          </div>
      );
    })}
    </div>
  )
}

export default App
