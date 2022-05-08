import HeaderBar from "../components/HeaderBar";
import CartList from "../components/CartList"
//added the comment to test git push 2
const CartPage = () => {

    return(
        <>
            <HeaderBar/>
            <CartList isInCart={true}/>
        </>
    )
}


export default CartPage;