import { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
import './CommentView.css';
import axios from 'axios';
import { useGlobalState } from "../../auth/global_state";


const CommentView = (bookID) => {
const [comment, setComment] = useState();
const [rating, setRating] = useState();
//const { bookID } = useParams();
const [{user_id}] = useGlobalState('user');

//console.log(bookID);

const handleDB = (comment, rating, user_id) => {
    console.log(bookID.bookID);
    axios.post('http://localhost:8000/comments/create', {
      book_id: bookID.bookID,
      user_id: user_id,
      comment: comment,
      rating: rating,
      //is_visible: true
    })
    .then(function (response) {
        console.log(response.data)
        alert("Comment Sent");
        setComment('');
        setRating('');
    })
    .catch(function (error) {
      console.log(error);
      alert("Create comment error");
    });
    
  }


const onSubmitComment = (e) => {
    e.preventDefault();
    if (!user_id)
        alert("You must be logged in to make a comment");
    else
        handleDB(comment, rating, user_id);
}


return (

        <form>
            <label>
            <input value={comment} type="text" placeholder = "Type to add a comment" onChange={e => setComment(e.target.value)} />
            </label>
            <label>
            <div/>
            <input value={rating} type="number" placeholder = "Enter rating " onChange={e => setRating(e.target.value)} />
            </label>
            <div>
            <button type="submit" onClick={onSubmitComment}>Submit</button>
            </div>
        </form>

    )

}

export default CommentView;