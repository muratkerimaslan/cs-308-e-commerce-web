
import { setGlobalCartNewQty,useGlobalState } from "../../auth/global_state";
import { useState } from "react";
import axios from "axios";
const AddToCartButton =  ({book, msg = "add to cart", init_qty = 1}) => {


    const [{user_id}] = useGlobalState('user');
    const [qty,setQty] = useState(init_qty);

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
    
    const addToCartAmount = (e) => {
        e.preventDefault();
        console.log("book = =");
        console.log(book);
        console.log("book id = ");
        console.log(book.book_id);
        console.log(qty);
        setGlobalCartNewQty(book,parseInt(qty));
        handleDBAddToCart(book.book_id,parseInt(qty));
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