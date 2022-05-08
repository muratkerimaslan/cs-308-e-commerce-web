
import { setGlobalCartNewQty,useGlobalState } from "../../auth/global_state";
import { useState } from "react";
import axios from "axios";
const AddToCartButton =  ({book, msg = "add to cart", init_qty = 1}) => {


    const [{user_id}] = useGlobalState('user');
    const [cart] = useGlobalState('cart');
    const [qty,setQty] = useState(init_qty);

    
    // path('addCartItem/<str:pk>', views.addCartItem),
    // pk = user.id
    const handleDBAddToCart = (bookId,quantity) => { 
        axios.post('http://localhost:8000/addCartItem/'+user_id, {
          amount: quantity ,
          book_id: bookId,
        })
        .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
            console.log("handleDBAddToCartResponsse =");
            console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }

    const handleDBDeleteFromCart = (bookId) => { 
        axios.delete('http://localhost:8000/deleteCartItem/' + bookId + '/' + user_id )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // console.log(book.book_id);
    const qtyOptions = (stock) => {
        const row = [];
        let max_qty = 12;
        if (stock < max_qty)
        {
            max_qty = stock;
        }
        for (var i = 1; i <= max_qty;i++)
        {
            row.push( <option value={i}>{i}</option>);
        }
        return row;
    }

    
    const addToCartAmount = (e) => { // if item doesn't exist, add directly, else remove then add
        e.preventDefault();
        console.log("book = =");
        console.log(book);
        console.log("book id = ");
        console.log(book.book_id);
        console.log(qty);
        setGlobalCartNewQty(book,parseInt(qty));

        if (user_id !== ''){ // only add to databse if the user is logged in
            // now to check if item exists in cart;
            if (cart.Items_Id.hasOwnProperty(book.book_id) ){ // checkingg if book_id already exists in cart 
                // delete if exists
                console.log("deleting book to update book name :" + book.title);
                handleDBDeleteFromCart(book.book_id);
            }
            handleDBAddToCart(book.book_id,parseInt(qty));
        }
        
    }


    return(
    <form>
    <label >quantity</label>
        <select
            value={qty}
            onChange={e => setQty(e.target.value) }> 
                {qtyOptions(book.stock_amount)}
                {/* list of  <option value={i}>{i}</option> */} 
        </select>
        <button type="submit" onClick={addToCartAmount}> 
            {msg}
        </button>
    </form>
    )

}



export default AddToCartButton;



// use addtocart function