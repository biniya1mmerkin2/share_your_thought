import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../action/posts";
import { Style } from "../style";
import { useLocation, useNavigate } from "react-router";

const Post = ({ post, setCurrentId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profi"));
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result?._id;

  // const hasliked = post.likes.find(
  //   (like) => like === (user?.result?.googleId || user?.result?._id)
  // );

  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleClick = async () => {
    dispatch(likePost(post._id));
    console.log("test click");
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
      console.log("this is filter" + likes);
    } else {
      setLikes([...post.likes, userId]);
      console.log(" this is not filter" + likes);
    }
  };

  // useEffect(() => {
  //   // navigate("/");
  // }, [likes]);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `you and ${likes.length - 1} others`
            : `${likes.length} ${likes.length > 1 ? "like" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAlt fontSize="small" />
          &nbsp;{likes.length}
          {likes.length === 1 ? "like" : "like"}{" "}
        </>
      );
    }

    return (
      <>
        <ThumbUpOffAlt fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card style={Style.card} raised elevation={6}>
      <ButtonBase style={Style.cardAction} onClick={openPost}>
        <CardMedia
          style={Style.cardMedia}
          image={post.selectedFile}
          title={post.title}
        />
        <div style={Style.divpost}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <div style={Style.divpost2}>
            <Button
              style={Style.button}
              size="small"
              onClick={() => setCurrentId(post._id)}
            />
            <MoreHoriz fontSize="default" />
          </div>
        )}

        <div>
          <Typography style={Style.typo1} variant="body">
            {post.tags.map((tag) => `#${tag}`)}
          </Typography>
        </div>
        <CardContent>
          <Typography style={Style.typo2} variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography style={Style.typo3} variant="body" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions style={Style.cardActions}>
        <Button
          size="small"
          disabled={!user?.result}
          color="primary"
          onClick={handleClick}
        >
          <Likes />

          {post.likeCount}
        </Button>
        {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="error"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
