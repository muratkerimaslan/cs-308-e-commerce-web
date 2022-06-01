import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { setGlobalUsername, setGlobalUserEmail, setGlobalUserId } from "../../auth/global_state";


const ManageProducts = () => {
    const [books, setBooks] = useState([]);
    const [submissionCount,setSubmissionCount] = useState(0);
    const [newStocks, setNewStocks] = useState(); // {bookid : new_stock}
    useEffect(() => { // for comments;
        const handleDB = () => {
            axios.get('http://localhost:8000/books/') // invisible comments
            .then(function (response) {
                setBooks(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [submissionCount]);

    const RemoveBook = (e,book) => {
        e.preventDefault()
        axios.delete('http://localhost:8000/books/' + String(book.book_id) + '/delete') // invisible comments
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        
    }
    

    const useBooks = books.map((book) => {
        
        //console.log(book);
        const book_adress = '/Book/'+ book.book_id;
        return(
            <li key = {book.book_id} style = {{padding:"20px"}}>
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

                   
                    <h3>
                        Stock = {book.stock_amount}
                    </h3>
                    <form>
                        <label>
                        <p>Enter new stock amount</p>
                        <input type="number"  value={book.stock_amount} style={{background: 'rgb(158, 215, 125)' }} onChange={e => setNewStocks( { ...newStocks, [book.book_id] : e.target.value })} />
                        </label>
                       
                        <div>
                        <button type="submit" onClick={(e) => {
                            e.preventDefault();
                            console.log(newStocks);
                        }}>Set stock</button>
                        </div>
                    </form>
                    <button style={{}} onClick={(e) => RemoveBook(e,book)}>
                        Remove this Book
                    </button>
                    <br/>
                    
                </div>
            </li>

        )
    })

    // const onSubmitCheck = (e) => {
    //     e.preventDefault()
    //     console.log(comments);
    //     console.log("submit clicked");
    //     console.log(checked);

    //     for (var index = checked.length -1; index >=0; index--) { 
    //         axios.put('http://localhost:8000/comments/update/' + checked[index] + '/') // invisible comments
    //         .then(function (response) {
    //             console.log(response.data);
    //             setChecked( checked.splice(index,1) );
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });                      
    //     }
    //     // for (var i = Auction.auctions.length - 1; i >= 0; i--) {
    //     //     Auction.auctions[i].seconds--;
    //     //     if (Auction.auctions[i].seconds < 0) { 
    //     //         Auction.auctions.splice(i, 1);
    //     //     }
    //     // }
        
    //   }
    
    return (
        <>
            <ul className="comment-list">
                {useBooks}
            </ul>
            {
                (books.length != 0 )?
                <> </>
                :
                <p> Can't read books from the database</p>
            }
            
        </>
    )



}

export default ManageProducts;