import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { setGlobalUsername, setGlobalUserEmail, setGlobalUserId } from "../../auth/global_state";
import './ManageProducts.css';



const ManageProducts = () => {
    const [books, setBooks] = useState([]);
    const [submissionCount,setSubmissionCount] = useState(0);
    const [newStocks, setNewStocks] = useState({}); // {bookid : new_stock}
    const [newBook, setNewBook] = useState({});
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
            setSubmissionCount(prevSubmissionCount => prevSubmissionCount + 1);
            console.log(submissionCount);

        
    }
    const onNewStockSubmit = (e,book) => {
        e.preventDefault();
        axios.put('http://localhost:8000/books/update/'+ book.book_id, {
          stock_amount : newStocks[book.book_id]
        })
        .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
            console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        setSubmissionCount(prevSubmissionCount => prevSubmissionCount + 1);
    }
    
    const onSubmitBook = (e) => {
        e.preventDefault();
        // console.log('asdasd');
        axios.post('http://localhost:8000/books/create/', {
          title: newBook.title,
          author_id: newBook.author_id,
          image_link: newBook.image_link,
          publisher: newBook.publisher,
          publisher_year: newBook.publisher_year, 
          genre: newBook.genre,
          price: newBook.price,
          description: newBook.description,
          arrival_price: newBook.arrival_price,
          stock_amount: newBook.stock
        })
        .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
            console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        setSubmissionCount(prevSubmissionCount => prevSubmissionCount + 1);

    }

    const AddBookForm = () => {
        
        return (
            <li style={{float:'right'}}>
                
                <form>
                    <label>
                    <p>Title</p>
                    <input type="text" required   style={{background: 'rgb(158, 215, 125)'  }} onChange={(e) => setNewBook( { ...newBook, 'title' : e.target.value })} />
                    </label>
                    <label>
                    <p>Author ID</p> {/* author name */ }
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'author_id' : e.target.value })} />
                    </label>
                    <label>
                    <p>Image Link</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'image_link' : e.target.value })} />
                    </label>
                    <label>
                    <p>Genre</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'genre' : e.target.value })} />
                    </label>
                    <label>
                    <p>Publisher</p>
                    <input type="text" required  style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'publisher' : e.target.value })} />
                    </label>
                    <label>
                    <p>Publisher Year</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'publisher_year' : e.target.value })} />
                    </label>
                    <label>
                    <p>Description</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'description' : e.target.value })} />
                    </label>
                    <label>
                    <p>Price</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'price' : e.target.value })} />
                    </label>
                    <label>
                    <p>Arrival Price</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'arrival_price' : e.target.value })} />
                    </label>
                    <label>
                    <p>Stock amount</p>
                    <input type="text" required style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewBook( { ...newBook, 'stock' : e.target.value })} />
                    </label>
                    
                    
                    
                    <div>
                        <button type="submit" onClick={onSubmitBook}>Add book</button>
                    </div>
                </form> 

                
            </li>
        )
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
                        <p>Enter new stock amount:</p>
                        <input type="number"  placeholder={book.stock_amount} style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewStocks( { ...newStocks, [book.book_id] : e.target.value })} />
                        </label>
                       
                        <div>
                            <button type="submit" onClick={(e) => { console.log('click');onNewStockSubmit(e,book)}}
                            >Set stock</button>
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
    
    return ( // {<li style={{float:'right'}}> a </li>}
        <>
            <ul className="comment-list">
                 
                {AddBookForm()} 
                {useBooks}
            </ul>
            {
                (books.length !== 0 )?
                <> </>
                :
                <p> Can't read books from the database</p>
            }

        
            
        </>
    )



}

export default ManageProducts;