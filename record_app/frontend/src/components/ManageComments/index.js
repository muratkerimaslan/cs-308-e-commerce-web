import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { setGlobalUsername, setGlobalUserEmail, setGlobalUserId } from "../../auth/global_state";
import "./ManageComments.css"


const ManageComments = () => {
    const [comments, setComments] = useState([]);
    const [checked, setCheck] = useState([]);

    useEffect(() => { // for comments;
        const handleDB = () => {
            axios.get('http://localhost:8000/comments/') // invisible comments
            .then(function (response) {
                setComments(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        handleDB();
    }, []);


    const useComments = comments.map((comment) => {
        return(
            <div> 
                <li>                      
                    <p id="comment-p">context: {comment.comment} --- rating: {comment.rating} </p>    
                    <input type="checkbox" onChange={e => setCheck((prev) => [...prev, comment.comment_id]) }/>     
                </li>
            </div>
        )
    })

    const onSubmitCheck = (e) => {
        e.preventDefault()
        console.log(comments);
        console.log("submit clicked");
        console.log(checked);

        for (const ch of checked) { 
            axios.put('http://localhost:8000/comments/update/' + ch + '/') // invisible comments
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });                      
        }

        
      }
    
    return (
        <>
            <ul className="comment-list">
                {useComments}
            </ul>
            <button type="submit" onClick={onSubmitCheck}>Submit</button>
        </>
    )



}

export default ManageComments;