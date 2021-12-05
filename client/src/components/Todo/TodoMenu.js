import * as React from "react";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import Cloud from "@mui/icons-material/Cloud";

export default function TodoMenu(props) {
  const { anchorEl, open, handleClose, setEditValue } = props;

  const handleClick = (event) => {
    if (event.target.innerText === "Edit Task") {
      setEditValue(1);
    } else {
      setEditValue(2);
    }
    handleClose();
  };
  return (
    <Menu sx={{ width: 320, maxWidth: "100%" }} anchorEl={anchorEl} open={open}>
      <MenuList sx={{ p: 0 }}>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Task</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <SpeakerNotesIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Note</ListItemText>
        </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Go to Notehub</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
