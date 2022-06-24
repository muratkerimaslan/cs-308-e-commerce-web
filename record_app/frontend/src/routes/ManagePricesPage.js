import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Link } from "react-router-dom";


const ManagePricesPage = () => {

    const [books, setBooks] = useState([]);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [newPrices, setNewPrices] = useState({}); // book_id : price
    const [newDiscounts , setNewDiscounts] = useState({}); // book_id : price
    //    path('getOrder30/', views.getOrder30),

    useEffect(() => {
        const handleDB = () => {
            axios.get('http://localhost:8000/books/')
            .then(function (response) {
              setBooks(response.data);
              console.log(response.data);   
            //   console.log('homebookcount =  '+ response.data.length);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, [submissionCount]);

    const onSubmitNewPriceOrDiscountSubmit = (e,book) => {
        e.preventDefault();
        let new_original_price = book.original_price;
        let new_discount_rate = book.discount_rate;
        if (newPrices.hasOwnProperty(book.book_id)){
            new_original_price = newPrices[book.book_id];
        }
        if (newDiscounts.hasOwnProperty(book.book_id)){
            new_discount_rate = newDiscounts[book.book_id];
        }
        axios.put('http://localhost:8000/books/update/'+ book.book_id, {
          original_price : new_original_price,
          discount_rate : new_discount_rate
        })
        .then(function (response) { // probably response.data[0] = {is_authenticated and user_id};
            console.log('response = ');
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        setSubmissionCount(prevSubmissionCount => prevSubmissionCount + 1);
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
                        <p>Enter new orignal price:</p>
                        <input type="number"  placeholder={book.original_price} style={{background: 'rgb(158, 215, 125)' , color:'red' }} onChange={e => setNewPrices( { ...newPrices, [book.book_id] : e.target.value })} />
                        </label>
                        <label>
                        <p>Enter new discount_rate between 0 and 1 ( 1 = no discount , 0 = 100% discount):</p>
                        <input type="number"  placeholder={book.discount_rate} style={{background: 'rgb(158, 215, 125)'  }} onChange={e => setNewDiscounts( { ...newDiscounts, [book.book_id] : e.target.value })} />
                        </label>
                       
                        <div>
                            <button type="submit" onClick={(e) => { onSubmitNewPriceOrDiscountSubmit(e,book)}}
                            >Update Price and Discount</button>
                        </div>
                    </form>
                    
                    <br/>
                    
                </div>
            </li>

        )
    })
    

    

    return(
        <>
            <HeaderBar/>
            {useBooks}
        </>

    )
}


export default ManagePricesPage;