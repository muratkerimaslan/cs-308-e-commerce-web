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
            <li key = {val.book_id}>
                <div className="my-cart-item">        
                
                    <img
                        alt = "URL not found"
                        src = {val.image_link}   
                        width="200"
                        height="320"                
                    />
                    <h3 className="title">{val.title}</h3>            

                <div className="descriptions">
                    <h3 style={{display:'inline-block'}}> price :</h3>

                    {   

                    
                        (parseFloat(val.discount_rate)) > 0 ? <h3 style={{ display:'inline-block', textDecoration:'line-through', 
                                textDecorationThickness:'2px', textDecorationColor:'red'}} > {val.original_price} $</h3>
                        :
                        <>
                        </>
                      
                    }
                    <h3 style={{display:'inline-block',paddingLeft:'8px'}}> {val.price} $ </h3>
                    <h4>rating = {val.rating}</h4>
                    <h4>{val.genre}</h4>
                    <br/>
                    <AddToCartButton book={val} msg={"update quantity"} init_qty={val.qty} />
                    <AddToWishlistButton  book = {val} init_is_in_wishlist={true} />
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