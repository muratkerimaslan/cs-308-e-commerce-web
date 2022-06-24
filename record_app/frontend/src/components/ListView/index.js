import { useEffect, useState } from "react";
import axios from "axios";
import "./ListView.css";
import AddToCartButton from "../AddToCartButton";
import AddToWishlistButton from "../AddToWishlistButton";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../auth/global_state";
const ListView = ({Lgenre_target, Lsearch_term ='',sortCriteria = '' , setHomeBookCount }) => {
    //console.log("listgenre ) ");
    //console.log(Lgenre_target);
    //console.log("Lsearch_term");
    //console.log(Lsearch_term);
    const [books, setBooks] = useState([]);
    const [wishlist] = useGlobalState('wishlist');
    useEffect( () => {
        console.log('useEffectcalled 1 ');
    } , [wishlist])
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
              setHomeBookCount(response.data.length);
            //   console.log('homebookcount =  '+ response.data.length);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [db_adress,Lgenre_target,Lsearch_term]);
    


    useEffect(() => {
        console.log('Sort criteria = ' + sortCriteria);
        if (sortCriteria === 'Price: Low to High')
        {
            let sorted_books = Array.from(books);

            sorted_books.sort( (a,b) => {
                // Compare the  ratings; sort result = ascending;
                let keyA = parseFloat(a.price);
                let keyB = parseFloat(b.price);

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            })
            console.log('sorted books = ');
            console.log(sorted_books)
            
            setBooks(sorted_books);

        }
        else if (sortCriteria === 'Price: High to Low'){
            let sorted_books = Array.from(books);
            sorted_books.sort( (a,b) => {
                // Compare the  ratings; sort result = descending;
                let keyA = parseFloat(a.price);
                let keyB = parseFloat(b.price);

                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            })
            console.log('sorted books = ');
            console.log(sorted_books)

            setBooks(sorted_books);

        }
        else if (sortCriteria === 'Avg. User Ratings'){
            let sorted_books = Array.from(books);

            sorted_books.sort( (a,b) => {
              // Compare the  ratings; sort result = descending;
              let keyA = parseFloat(a.rating);
              let keyB = parseFloat(b.rating);

              if (keyA > keyB) return -1;
              if (keyA < keyB) return 1;
              return 0;
            })
            console.log('sorted books = ');
            console.log(sorted_books)

            setBooks(sorted_books);

        }
       
    }, [sortCriteria]);

    const useBooks = books.map((book) => {
        if (book.genre !== Lgenre_target && Lgenre_target !== 'All') {
            return ( <></>)
        }
        let book_exists = false;
        if (wishlist.Items_Id.hasOwnProperty(book.book_id))
        {
            book_exists = true;
        }
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
                    {
                        (parseFloat(book.discount_rate) < 1) ? <h3 style={{textDecoration:'line-through', textDecorationThickness:'2px', textDecorationColor:'red'}}> {book.original_price} $</h3> 
                        
                        :
                        <>
                        <h3 style={{color:"rgb(207, 216, 195)"}}>50</h3>
                        </>
                    }
                    <h3>{book.price} $</h3>
                    <h3>rating = {book.rating}</h3>
                    <h4>{book.genre}</h4>
                    <p>{book.publisher}</p>
                   
                    <AddToCartButton book = {book} init_qty={1}  />
                    <AddToWishlistButton  book = {book} init_is_in_wishlist={book_exists} />
                </div>
            </li>
        )
    })

    //console.log(books);
    //style={{display:'inline-block'}}
    return(
    <>
       
        {/* grid view of books */}
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