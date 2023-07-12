import React from "react";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';

interface MenuItemProps  {
    type: string,
    action:  () => void
}


export const MenuOption : React.FC<MenuItemProps> = (props) => {
    return <MenuItem onClick={props.action}>
        <Typography align="center">{props.type}</Typography>
    </MenuItem>
}