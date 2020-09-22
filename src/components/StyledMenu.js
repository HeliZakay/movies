import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import GroupIcon from '@material-ui/icons/Group';
import MovieIcon from '@material-ui/icons/Movie';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, NavLink } from 'react-router-dom';
import {startLogout} from "../actions/auth";
import {connect} from "react-redux";


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export const  CustomizedMenus = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout= () => {
    props.startLogout();
  }
 

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {props.language === "English"? "Menu": "תפריט"}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       <NavLink  className="styled-menu__item" to="/homePage">
        <StyledMenuItem>
          <ListItemIcon>
            <MovieIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={props.language === "English"? "Movies": "דף הבית"} />
        </StyledMenuItem>
        </NavLink>

        <NavLink  className="styled-menu__item" to="/messages">
        <StyledMenuItem>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={props.language === "English"? "Messages": "הודעות"} />
        </StyledMenuItem>
        </NavLink>

        <NavLink  className="styled-menu__item" to="/friends">
        <StyledMenuItem>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={props.language === "English"? "Friends": "חברים"}  />
        </StyledMenuItem>
        </NavLink>
        
        <StyledMenuItem onClick={onLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={props.language === "English"? "Logout": "התנתק"} />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
  });

export default connect(undefined, mapDispatchToProps)(CustomizedMenus);