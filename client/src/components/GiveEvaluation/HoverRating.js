import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

const labels = {
  1: "Useless",
  2: "Useless+",
  3: "Poor",
  4: "Poor+",
  5: "Ok",
  6: "Ok+",
  7: "Good",
  8: "Good+",
  9: "Excellent",
  10: "Excellent+",
};

export default function HoverRating(props) {
  const { rating, setRating } = props;
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    setValue(rating);
  }, [rating]);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        padding: 3,
      }}
    >
      {<Box sx={{ mb: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>}
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        max={10}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Grid>
  );
}
