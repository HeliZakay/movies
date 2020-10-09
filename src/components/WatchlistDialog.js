import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import FriendPickCheckboxWatchlist from "./FriendPickCheckboxWatchlist";
import {startAddMessageToFriend} from "../actions/messages";
import {getFriendById} from "../selectors/friends";
import moment from "moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export function CustomizedDialogs(props) {

  const [open, setOpen] = React.useState(false);
  const [friendsChosen, setFriendsChosen] = useState([]); 
  const [content, setContent] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onContentChange = (event) => {
    const content = event.target.value;
    setContent(content);
}

  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = (friendsChosen) => {
    setFriendsChosen(friendsChosen)
  }
  const sendWatchlist = () => {
      friendsChosen.forEach((friendId) => {
        const friend = getFriendById(props.friends, friendId);
        props.startAddMessageToFriend({
            recommender: props.user,
            friend: {
                username: friend.username,
                email: friend.email,
                uid: friendId
            },
            movie: {},
            createdAt: moment(),
            content: content,
            cardNum: "-1",
            prevMessageData: {},
            watchlist: props.watchlist
        });
      });
      handleClose();
  }

  return (
    <div>
     <Button onClick={handleClickOpen} variant="outlined" size="medium" color="primary">
        <span 
        className="material-icons share-watchlist-icon">
        face
        </span>
        {props.language === "English"? "Share My Watchlist": "שתף את רשימת הצפייה שלי"}
        </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.language === "English"?
           "Which friends do you like to share your watchlist with?":
            "עם אילו חברים תרצו לשתף את רשימת הצפייה?"}
        </DialogTitle>
        <DialogContent dividers>

            <div className="friend-dialog__content">
            <FriendPickCheckboxWatchlist 
            handleChange={handleChange} 
            />

            <textarea className="textarea recommendation"
            placeholder={props.language === "English"? "Write a private message (optional)": " (כתבו הודעה אישית (אופציונאלי" }    
            onChange={onContentChange}>
            </textarea>  
        </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={sendWatchlist} color="primary">
            {props.language === "English"? "Send": "שלח"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => ({
  language: state.auth.language,
  user: state.auth,
  friends: state.friends.friends,
  watchlist: state.watchList
});
const mapDispatchToProps = (dispatch) => ({
  startAddMessageToFriend: (data) => dispatch(startAddMessageToFriend(data)),
 
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);