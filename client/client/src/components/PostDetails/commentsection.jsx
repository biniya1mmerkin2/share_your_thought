import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {commentPost} from '../../action/posts'
import { Style } from "./styles";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user=JSON.parse(localStorage.getItem('profi'));
  const dispatch=useDispatch();

  const handleClick = async () => {
    const finalComment=`${user.result.name}:${comment}`;
   const newComments= await dispatch(commentPost(finalComment ,post._id));
   setComments(newComments)
   setComment('')
  };
  return (
    <Stack>
      <Stack>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.map((c, i) => (
          <Typography gutterBottom key={i} variant="subtitle2">
            {" "}
           <strong>{c.split(':')[0]}</strong>:
           {c.split(':')[1]}
          </Typography>
        ))}
      </Stack>
      {user?.result?.name &&(
      <Stack>
        <Typography gutterBottom variant="h6">
          {" "}
          Write a comment
        </Typography>
        <TextField
          fullWidth
          rows={4}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          style={{ marginTop: 10 }}
          fullWidth
          disabled={!comment}
          variant="contained"
          onClick={handleClick}
        >
          Comment
        </Button>
      </Stack>
      )}
    </Stack>
  );
};

export default CommentSection;
