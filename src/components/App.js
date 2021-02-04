import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Books from "./Books";


function App() {
  const [listBooks, setListBooks] =  useState([]);
    const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
          `https://stark-spire-22280.herokuapp.com/api/books`
      );
      const json = await response.json();
      console.log("books", json);
      setListBooks(json.data);
      return json;
    };
    fetchBooks();
  }, []);

  return (
      <>
        <div style={{ textAlign: 'center'}}>
            <h1>LISTA DE LIBROS</h1>
        </div>
          <Books listBooks={listBooks} page={setPage}/>
      </>
  );
}

export default App;
