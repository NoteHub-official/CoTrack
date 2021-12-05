import React from "react";
import CommentItem from "./CommentItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

const CommentList = (props) => {
  const { comments } = props;
  return (
    <Box>
      <List sx={{ width: 800, py: 0 }}>
        {comments.map((commentElement, index) => (
          <CommentItem
            key={index}
            comment={commentElement.comment}
            rating={commentElement.rating}
          />
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
