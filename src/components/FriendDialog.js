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
import FriendPickCheckbox from "./FriendPickCheckbox";
import {startAddMessageToFriend, startAddRecommendation} from "../actions/messages";
import moment from "moment";
import {getFriendById} from "../selectors/friends";


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
const sendRecommendation =() => {
  if(friendsChosen.length > 0) {
    friendsChosen.forEach((friendId) => {
      const friend = getFriendById(props.friends, friendId);
      props.startAddMessageToFriend({
        recommender: props.user,
        friend :{
            username: friend.username,
            email: friend.email,
            uid: friendId
        },
        movie: props.movie,
        createdAt: moment(),
        content: content,
        cardNum: "-1",
        prevMessageData: {}
    });
    props.startAddRecommendation({
        friendId: friend.userId,
        movieId: props.movie.id
    });  
    });
    handleClose();
    } 
}

  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = (friendsChosen) => {
    setFriendsChosen(friendsChosen)
  }

  return (
    <div>
      <a onClick={handleClickOpen}>
      <span 
      className="material-icons"
      data-toggle="tooltip" 
      data-placement="top" 
      title={props.language === "English"? "Send Movie To Friend!": "המליצו על הסרט לחברים!"}
      >
      face
      </span>
      </a>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.language === "English"?
           "Which friends do you recommend the movie "+props.movieName +"?":
            "לאילו חברים תרצה להמליץ על הסרט "+ props.movieName+ "?"}
        </DialogTitle>
        <DialogContent dividers>
            <div className="friend-dialog__content">
            <FriendPickCheckbox 
            handleChange={handleChange} 
            movie={props.movie}/>
            <textarea className="textarea recommendation"
            placeholder={props.language === "English"? "Write a private message (optional)": " (כתבו הודעה אישית (אופציונאלי" }    
            onChange={onContentChange}>
            </textarea>  
            <div className="friend-dialog__img-div">
            <img src={props.poster}></img>
        </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={sendRecommendation} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => ({
  language: state.auth.language,
  user: state.auth,
  friends: state.friends.friends
});
const mapDispatchToProps = (dispatch) => ({
  startAddMessageToFriend: (data) => dispatch(startAddMessageToFriend(data)),
  startAddRecommendation: (data) => dispatch(startAddRecommendation(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);