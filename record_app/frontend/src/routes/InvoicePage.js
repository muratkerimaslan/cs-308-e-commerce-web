
// import { useEffect,useState } from "react";
// import { useGlobalState,setGlobalCartRemoveBook } from "../auth/global_state";
// import HeaderBar from "../components/HeaderBar";



// const InvoicePage = () => {
//     const [cart] = useGlobalState('cart');

//     const [invoiceCart, setInvoiceCart] = useState({});
//     const [loaded,setLoaded] = useState(false);
//     useEffect( () => {
//         setInvoiceCart(JSON.parse(JSON.stringify(cart)));
//         console.log('shouldnt happen much');
//         // for (const [cur_key, cur_value] of Object.entries(cart.Items_Id)) {
//         //     console.log("cur_item");
//         //     console.log(cur_key);
//         //     // console.log(cur_value);
//         //     setGlobalCartRemoveBook(cur_key); // chec
//         // }

//         console.log('ınvoice = ');
//         console.log(invoiceCart);
//         setLoaded(true);
//     },[])

//     const InvoiceItems = () => {
//     if (loaded === true) 
//     {
//     return (Array.from(invoiceCart.Items.entries()).map((entry) => {
//         const [key , val] = entry; // key = bookId, val = {book object , qty : 2}
//         return(
//             <li key = {val.book.book_id}>
//                 <div className="my-cart-item">        
                
//                     <img
//                         alt = "URL not found"
//                         src = {val.book.image_link}   
//                         width="200"
//                         height="320"                
//                     />
//                     <h3 className="title">{val.book.title}</h3>            

//                 <div className="descriptions">
//                     {
                    
//                         (val.qty) > 1 ? <h3> total price : {val.book.price} * {val.qty} =  {parseInt(val.book.price) * parseInt(val.qty)}</h3>
//                         : <h3> total price : {val.book.price} </h3>
//                     }
//                     <h4>rating = {val.book.rating}</h4>
//                     <h4>{val.book.genre}</h4>
//                     <br/>
//                     {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    
//                 </div>
//                 </div>
//             </li>
//         )
// }
//     ))
// }
//     else
//     {
//         return(<>
//         <h2> invoice laoding;</h2>
//         </>)
//     }
// }


//     return(
//         <>  
        
//             <HeaderBar/>  

//             <h1> Here is the invoice of the purchase</h1>
            
//             <ul>
//                 {InvoiceItems()}  
//             </ul>
//         </>

//     )
   




// }



// export default InvoicePage;