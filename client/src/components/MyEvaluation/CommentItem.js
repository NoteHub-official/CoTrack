import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const commentItem = (props) => {
  const { rating, comment } = props;
  return (
    <Grid sx={{ width: "100%", height: "auto" }}>
      <ListItem>
        <Grid container direction="column">
          <Grid item>
            <ListItemIcon>
              <Rating max={10} value={rating} readOnly size="small" />
            </ListItemIcon>
          </Grid>
          <Grid item>
            <ListItemButton sx={{ maxWidth: "100%" }}>
              <ListItemText component={Button} primary={comment} />{" "}
            </ListItemButton>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </Grid>
  );
};

export default commentItem;
