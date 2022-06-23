import { useGlobalState } from "../auth/global_state";
import HeaderBar from "../components/HeaderBar";
import AddToCartButton from "../components/AddToCartButton";
import AddToWishlistButton from "../components/AddToWishlistButton";
//added the comment to test git push 2
const WishlistPage = () => {


    const [wishlist] = useGlobalState('wishlist');

    const wishlistItems = Array.from(wishlist.Items.entries()).map((entry) => {
        const [key , val] = entry; // key = bookId, val = {book object , qty : 2}
        console.log('')
        return(
            <li key = {val.book.book_id}>
                <div className="my-cart-item">        
                
                    <img
                        alt = "URL not found"
                        src = {val.book.image_link}   
                        width="200"
                        height="320"                
                    />
                    <h3 className="title">{val.book.title}</h3>            

                <div className="descriptions">
                    <h3 style={{display:'inline-block'}}> price :</h3>

                    {   

                    
                        (parseFloat(val.book.discount_rate)) > 0 ? <h3 style={{ display:'inline-block', textDecoration:'line-through', 
                                textDecorationThickness:'2px', textDecorationColor:'red'}} > {val.book.original_price} $</h3>
                        :
                        <>
                        </>
                      
                    }
                    <h3 style={{display:'inline-block',paddingLeft:'8px'}}> {val.book.price} $ </h3>
                    <h4>rating = {val.book.rating}</h4>
                    <h4>{val.book.genre}</h4>
                    <br/>
                    <AddToCartButton book={val.book} msg={"update quantity"} init_qty={val.qty} />
                    <AddToWishlistButton  book = {val.book} init_is_in_wishlist={true} />
                </div>
                </div>
            </li>
        )
})


    return(
        <>
            <HeaderBar/>
            {wishlistItems}

        </>
    )
}


export default WishlistPage;