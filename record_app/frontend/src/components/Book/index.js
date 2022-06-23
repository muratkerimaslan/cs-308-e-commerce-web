


// import { Link } from "react-router-dom";
// import { useGlobalState } from "../../auth/global_state";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCartButton from "../AddToCartButton";
import axios from "axios";
import CommentView from "../CommentView";
import "./Book.css"

const Book = () => {
    
    // qty  = quantity
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);

    // const [qty,setQty] = useState(1); // default quantity to add to cart

    useEffect(() => {
        const handleDB = () => { // getbooks
            axios.get('http://localhost:8000/books/' + bookId)
            .then(function (response) {
              setBook(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [bookId]);
    // console.log(book);

    useEffect(() => { // for comments;
        const handleDB = () => {
            axios.get('http://localhost:8000/comments/' + bookId) // comments
            .then(function (response) {
                setComments(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [bookId]);

    const useComments = comments.map((comment) => {
        return(
            <div> 
                <li>                      
                    <p id="comment-p">{comment.comment} rating: {comment.rating} </p>                        
                </li>
            </div>

        )
    })

  
    
    return(
        <>
            <h1>
                book Page of id : {bookId} 
            </h1>
            
            <div >        
                <img height={250}
                    width={200}
                alt = "URL not found"
                src = {book.image_link}                    
                />
                <h2 >{book.title}</h2>            
                                 
                    <h4>Genre : {book.genre}</h4>
                    <p> Publisher : {book.publisher}</p>
                    <p> Price : {book.price} $</p>
                    <p> Description: {book.description}</p>
                    <p> Year : {book.publisher_year}</p>
                    {/* <p> Rating : {book.rating}</p> */}
                    <p> Remaining stock : {book.stock_amount}</p>

            </div>


        {/* {book_comments_item} */}

        <AddToCartButton book={book} />
        <CommentView bookID = {bookId} />
        <ul className="comment-container">
            {useComments}
        </ul>
        
           
        
        </>
    )

}

export default Book;


{/* <form>
<label >quantity</label>
    <select
        value={qty}
        onChange={e => setQty(e.target.value) }> 
            {qtyOptions(book.stock_amount)}
            // list of  <option value={i}>{i}</option> 
    </select>
    <button type="submit" onClick={addToCartAmount}> 
        add to cart
    </button>
</form> */}

    // const [my_cartItems2] = useGlobalState('cartItems2');
    // const [cartNumItems2] = useGlobalState('cartNumItems2');
    // const [c] = useGlobalState('count');
    // console.log(cartNumItems2);
    // console.log("cartitems2 = ");
    // console.log(my_cartItems2);
    // setCartItems2New(456,5);
    // setCartItems2New(123,3);
    // console.log(my_cartItems2);


     // function my_button (e){
    //     // e.preventDefault();
    //     // setCartItems2New(8988,2);
    //     countUp();
    //     console.log(my_cartItems2);
    // }

     // const listItems = Object.entries(my_cartItems2).map( ([key,val]) =>
    // (
    //     <li>
    //         id : {key} qty: {val}
    //     </li>
    // )
    // )

    //   {/* id = 
    //             {Object.keys(my_cartItems2)[0]}
    //             <br/>
    //             num =
    //             {my_cartItems2[323]}
    //             <br/> */}



