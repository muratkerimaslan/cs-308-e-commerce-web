import { useEffect, useState } from "react";
import axios from "axios";
import "./ListView.css";
const ListView = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const handleDB = () => {
            const res = axios.get('http://localhost:8000/books')
            .then(function (response) {
              setBooks(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, []);

    const useBooks = books.map((book) => {
        return(
            <li>
                <div>        
                    <a className="anchor-container" href = '#' onClick={console.log("alo")}> 
                        <img
                        alt = "URL not found"
                        src = "https://upload.wikimedia.org/wikipedia/commons/9/92/Open_book_nae_02.svg"                   
                        />
                        <h3 className="title">{book.title}</h3>            
                    </a>
                                 
                    <h4>{book.genre}</h4>
                    <p>{book.publisher}</p>
                </div>
            </li>
        )
    })

    console.log(books);

    return(
    <>
        <ul className="book-container">
            {useBooks} 
        </ul>
            
    </>
    );

}

export default ListView;