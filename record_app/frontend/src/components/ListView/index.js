import { useEffect, useState } from "react";
import axios from "axios";
import "./ListView.css";
import AddToCartButton from "../AddToCartButton";
import { Link } from "react-router-dom";
const ListView = ({Lgenre_target, Lsearch_term ='' }) => {
    //console.log("listgenre ) ");
    //console.log(Lgenre_target);
    //console.log("Lsearch_term");
    //console.log(Lsearch_term);
    const [books, setBooks] = useState([]);
    let db_adress = 'http://localhost:8000/books'

    if (Lgenre_target !== 'All') { //  getBooksByGenre/Fiction
        db_adress = 'http://localhost:8000/getBooksByGenre/'+Lgenre_target;
    }
    if (Lsearch_term !== '' )
    { //    path('searchBooks', views.searchBooks),
        db_adress = 'http://localhost:8000/searchBooks/' + Lsearch_term;
    }
    useEffect(() => {
        const handleDB = () => {
            axios.get(db_adress)
            .then(function (response) {
              setBooks(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [db_adress,Lgenre_target,Lsearch_term]);

    const useBooks = books.map((book) => {
        //console.log(book);
        const book_adress = '/Book/'+ book.book_id;
        return(
            <li key = {book.book_id}>
                <div>        
                <Link to = {book_adress}  > 
                    <img
                        alt = "URL not found"
                        src = {book.image_link}   
                        width="200"
                        height="200"                
                    />
                    <h3 className="title">{book.title}</h3>            

                </Link> 
                    <h3>{book.price} $</h3>
                    <h3>rating = {book.rating}</h3>
                    <h4>{book.genre}</h4>
                    <p>{book.publisher}</p>
                   
                    <AddToCartButton book = {book}  />
                </div>
            </li>
        )
    })

    //console.log(books);

    return(
    <>
        <ul className="book-container">
            {useBooks} 
        </ul>
            
    </>
    );

}

export default ListView;


/* <a className="anchor-container" href = 'http://localhost:3000/Book/1' onClick={console.log("alo")}> 
<img
alt = "URL not found"
src = {book.image_link}                   
/>
<h3 className="title">{book.title}</h3>            
</a> */