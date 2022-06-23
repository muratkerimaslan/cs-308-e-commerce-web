
import { setGlobalWishlistAddBook,setGlobalWishlistRemoveBook,useGlobalState } from "../../auth/global_state";
import { useEffect, useState } from "react";
import axios from "axios";
const AddToWishlistButton =  ({book , init_is_in_wishlist = false}) => {


    const [{user_id}] = useGlobalState('user');

    const [isInWishlist,setIsInWishlist] = useState(init_is_in_wishlist);
    const [msg, setMsg] = useState('');
    // const [wishlist] = useGlobalState('wishlist');


    useEffect( () => {
        console.log('USefecct called 2')
        setIsInWishlist(init_is_in_wishlist);
        if ( init_is_in_wishlist){
            console.log('wlist = ' + init_is_in_wishlist);
            setMsg('Remove from Wishlist')
        }
        else{
            setMsg('Add to Wishlist')
        }
       
    },[init_is_in_wishlist] ) // to update after props change, you need this or give a key while callign this component in the parent 
   
    
    // path('addWishlistItem/<str:pk>', views.addWishlistItem),
    // pk = user.id
    const handleDBAddToWishlist = (bookId) => { 
        axios.post('http://localhost:8000/addWishlistItem/'+user_id, {
          book_id: bookId,
        })
        .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
            console.log("handleDBAddWishlistResponsse =");
            console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }
      
    //  path('deleteWishlistItem/<str:b_pk>/<str:u_pk>', views.deleteWishlistItem),

    const handleDBDeleteFromWishlist = (bookId) => { 
        axios.delete('http://localhost:8000/deleteWishlistItem/' + bookId + '/' + user_id )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // console.log(book.book_id);
    

    const addToOrRemoveFromWishlist = (e) => { // if item doesn't exist, add directly, else remove then add
        e.preventDefault();
        console.log("wishlist book = =");
        console.log(book);
        if (user_id !== ''){ // only add to databse if the user is logged in
            // now to check if item exists in cart;
            if ( isInWishlist === true ){ // checkingg if book_id already exists in cart 
                handleDBDeleteFromWishlist(book.book_id);
                setGlobalWishlistRemoveBook(book.book_id); // only the id is needed to remove
                // setIsInWishlist(false); // won't be needed probably
                // setMsg('Add to Wishlist');
                alert('removed from wishlist');
            }
            else{
                handleDBAddToWishlist(book.book_id);
                setGlobalWishlistAddBook(book);
                // setIsInWishlist(true); // won't be needed probably
                // setMsg('Remove from Wishlist')
                alert('added to wishlist');

               
            }
        }
        else {
            alert('you must be logged in to use wishlist')
        }
        
    }

 
    return(
    <> 
        {
           
            <button type="submit" onClick={addToOrRemoveFromWishlist}> 
                {msg}
            </button>

       
        }
    </>
    )

}



export default AddToWishlistButton;



// use addtocart function