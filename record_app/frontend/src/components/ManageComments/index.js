import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { setGlobalUsername, setGlobalUserEmail, setGlobalUserId } from "../../auth/global_state";
import "./ManageComments.css"


const ManageComments = () => {
    const [comments, setComments] = useState([]);
    const [checked, setChecked] = useState([]);
    console.log('checked = ');
    console.log(checked);
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
    }, [checked]);


    const useComments = comments.map((comment) => {
        console.log("USecommmenntns");
        return(
            <div> 
                <li>                      
                    <p id="comment-p">context: {comment.comment} --- rating: {comment.rating} </p>    
                    <input type="checkbox" onChange={e => setChecked((prev) => {
                        if (prev.includes(comment.comment_id))
                        {
                            prev = prev.filter(item => item !== comment.comment_id)
                        }
                        else {
                           prev = [...prev, comment.comment_id]
                        }
                        return prev;
                        
                        }) }/>     
                </li>
            </div>
        )
    })

    const onSubmitCheck = (e) => {
        e.preventDefault()
        console.log(comments);
        console.log("submit clicked");
        console.log(checked);

        for (var index = checked.length -1; index >=0; index--) { 
            axios.put('http://localhost:8000/comments/update/' + checked[index] + '/') // invisible comments
            .then(function (response) {
                console.log(response.data);
                setChecked( checked.splice(index,1) );
            })
            .catch(function (error) {
              console.log(error);
            });                      
        }
        // for (var i = Auction.auctions.length - 1; i >= 0; i--) {
        //     Auction.auctions[i].seconds--;
        //     if (Auction.auctions[i].seconds < 0) { 
        //         Auction.auctions.splice(i, 1);
        //     }
        // }
        
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