import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchAppBar from './Navbar';

function App() {
  
  const client = axios.create({
    baseURL: "http://localhost:8080/api/v1/books" 
  });
  
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(author, title, image);
  };

  const addBook = (author, title, image) => {
    client
      .post('', {
          author: author,
          title: title,
          image: image,
        })
        .then((response) => {
          setBooks([response.data, ...books]);
        });
    setAuthor('');
    setTitle('');
    setImage('')
  };

  useEffect(() => {
    client.get().then((response) => {
        setBooks(response.data);
    });
    return() => {}
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
      <SearchAppBar />
      <h2>All Books</h2>
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" name="author" placeholder="author" value={author}
          onChange={(e) => setAuthor(e.target.value)}></input><br />
        <input className="input-field" type="text" name="title" placeholder="title" value={title}
          onChange={(e) => setTitle(e.target.value)}></input><br />
        <input className="input-field" type="text" name="Image" placeholder="Image_url" value={image}
          onChange={(e) => setImage(e.target.value)}></input><br />
        <button className="btn btn-primary" type="submit">add book</button>
      </form>
      {books.map((book) => {
      return (
        <div className="book-list" key={book.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={book.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.title}
                </Typography>
              </CardContent>
              <CardActions className='card_action'>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
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
