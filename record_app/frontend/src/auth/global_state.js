import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  user: {
    username: "",
    email: "",
    user_id: "",
    recently_logged_in: true // if they have just logged in, to load cart from backend
  },
  cart :{
    numCartItems: 0, // total amount
    Items_Id: {
      //book_id : amount (qty)
      // a dictionary of book Id's as keys 
      // and amounts of them in the cart as value
    },
    // it will only make things complicated;
     Items : new Map() //{ // to show fields in frotnedn 
     // key : id , value : book object + qty field
      // book object : amount
      // author_id: 3
      // book_id: 1
      // description: "leonardo dicaprio plays in the film adaptation"
      // genre: "Fiction"
      // in_stock: true
      // price: "20.00"
      // publisher: "Scribner Book Company"
      // publisher_year: 2004
      // rating: "4.0"
      // stock_amount: 5
      // title: "The Great Gatsby"
    // }
  //},
  // cartItems2:{
  //   "323" : 2,
  // },
  // cartNumItems2: 0,
  // count: 0,
},
wishlist : {
  numWishlistItems : 0,
  Items_Id : { // it could be an array, but I used this format so that it is same as cart;
    //book_id : 1 if exists;
    // book_id doesn't exist if it isn't in wishlist
  },
  Items : new Map() //{ // to show fields in frotnedn 
     // key : id , value : book object
      // author_id: 3
      // book_id: 1
      // description: "leonardo dicaprio plays in the film adaptation"
      // genre: "Fiction"
      // in_stock: true
      // price: "20.00"
      // publisher: "Scribner Book Company"
      // publisher_year: 2004
      // rating: "4.0"
      // stock_amount: 5
      // title: "The Great Gatsby"
},
invoice:{
  
}
});



 // v = previous state;
export const setGlobalUsername = (username) => {
  setGlobalState('user', (v) => ({ ...v, username }));
};

export const setGlobalUserEmail = (email) => {
  setGlobalState('user', (v) => ({ ...v, email }));
};

export const setGlobalUserId = (user_id) => {
  setGlobalState('user', (v) => ({...v, user_id}));
}

export const setGlobalUserRecentlyLoggedIn = (recently_logged_in) => {
  
  setGlobalState('user' , (v) => ( { ...v, recently_logged_in}  ));
}

// export const setCartItems2New = ( _id,new_qty,old_qty ) => {
//   setGlobalState('cartItems2' , (v) => ( Object.assign({}, v, { [_id] : new_qty}) ) );
//   // setGlobalState('cartNumItems2', (v) => (v + new_qty - old_qty));
// }

export const setGlobalCartNewQty = (book, new_qty) => {
  if (book.in_stock === false) // added this chek
  {
    return;
  }
  setGlobalState('cart' ,  (v) => {
    let prev_qty = 0;
    if (v.Items_Id.hasOwnProperty(book.book_id))
    {
      prev_qty = parseInt(v.Items_Id[book.book_id]);
    }
    v.numCartItems = v.numCartItems + new_qty - prev_qty;
    v.Items_Id = Object.assign({}, v.Items_Id, { [book.book_id] : new_qty});
    v.Items.set(book.book_id, {book, qty:new_qty });
    return (Object.assign({},v)); // need object.assign beause global hook library doesn't understand the valeu is changed on "return v";
    });
} 


export const setGlobalCartRemoveBook = (book_id) => {

  setGlobalState('cart', (v) => {
    
    if (v.Items_Id.hasOwnProperty(book_id))
    {
      let item_qty = v.Items_Id[book_id];
      v.numCartItems -= item_qty;
      delete v.Items_Id[book_id];
      // console.log("type of bookid = ");
      // console.log(typeof book_id);
      v.Items.delete(parseInt(book_id)); // need to parseInt so that book_id is int
    }
    
    return (Object.assign({},v));
  }
  
  );

}



// export const setGlobalWishlistAdd = () => {
//   setGlobalState('wishlist', (v) => {
    
//       v.numWishlistItems = v.numWishlistItems + 1;
    
//     return (Object.assign({},v));
//   }
//   )
  
// };
// export const setGlobalWishlistRemove = () => {
//   setGlobalState('wishlist', (v) => {
//     v.numWishlistItems = v.numWishlistItems -1 ;
//     return ( Object.assign({},v));
//   });
// };

export const setGlobalWishlistRemoveBook = (book_id) => {

  setGlobalState('wishlist', (v) => {
    console.log('a>')
    if (v.Items_Id.hasOwnProperty(book_id))
    {
      
      if (v.Items.get(book_id).discount_rate < 1)
      {
        v.numWishlistItems -= 1;
      }
      
      delete v.Items_Id[book_id];
      // console.log("type of bookid = ");
      // console.log(typeof book_id);
      v.Items.delete(parseInt(book_id)); // need to parseInt so that book_id is int
      console.log('new wishlist after delete');
      console.log(v);
    }
    console.log('new wishlist delete call');
      console.log(v);
    return (Object.assign({},v));
  }
  
  );

}

export const setGlobalWishlistAddBook = (book) => {
 
  setGlobalState('wishlist' ,  (v) => {
    if (v.Items_Id.hasOwnProperty(book.book_id))
    {
      console.log('new wishlist add call');
      console.log(v);
      return (Object.assign({},v));
    }
    
    

    v.Items_Id = Object.assign({}, v.Items_Id, { [book.book_id] : 1});
    v.Items.set(book.book_id, book);
   
    if (v.Items.get(book.book_id).discount_rate < 1)
      {
        console.log('hhhh');
        v.numWishlistItems += 1;
      }
    console.log('new wishlist after add');
    console.log(v);
    return (Object.assign({},v)); // need object.assign beause global hook library doesn't understand the valeu is changed on "return v";
    });
} 

// export const setCartNew = (_id, new_qty) => {
//   setGlobalState('cart' ,  (v) => {
//     let prev_qty = 0;
//     if (v.Items.hasOwnProperty(_id))
//     {
//       prev_qty = v.Items[_id];
//     }
//     v.numItems = v.numItems + new_qty - prev_qty;
//     v.Items = Object.assign({}, v.Items, { [_id] : new_qty});
//     return (Object.assign({},v)); // need object.assign beause global hook library doesn't understand the valeu is changed on "return v";
//     });
// } 


export { useGlobalState };