import React from "react";
import CommentItem from "./CommentItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

const CommentList = ({ comments }) => {
  return (
    <Box>
      <List sx={{ width: 800, py: 0 }}>
        {comments.map((commentElement, index) =>
          commentElement.completed ? (
            <CommentItem
              key={index}
              comment={commentElement.content}
              rating={commentElement.rating}
            />
          ) : null
        )}
      </List>
    </Box>
  );
};

export default CommentList;
