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
import {getMovieById} from "../selectors/movies";
import MovieDialog from "./MovieDialog";

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

export function CustomizedDialogs(props) {
  const watchlist = props.watchlist.map((movieId)=> {
    return getMovieById(props.movies, movieId);
  })
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };


  return (
    
    <div>
     <button 
    onClick={handleClickOpen}
    className="btn button-friend--message btn-lg button-open-review">
    {props.language === "English"? "See Watchlist": "ראה את רשימת הצפיה"}
    </button>
      <Dialog
      className={String(props.language !== "English" && "align-right")} 
      onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.language === "English"?
           props.username+ " Watchlist":
           props.username+" רשימת הצפייה של "}
        </DialogTitle>
        <DialogContent dividers>

            <div className="friend-dialog__content">
           {watchlist.map((movie) => {
             if (movie) {
               return <div key={movie.id}>
               <p>{props.language === "English" || !movie.hname? movie.movieName: movie.hname}</p>
               {movie.imdbData && !movie.imdbData.Error && <MovieDialog isInMessage={true} movie={movie}/>}
               </div>
             }
           })}
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => ({
  language: state.auth.language,
  movies: state.movies
});
export default connect(mapStateToProps)(CustomizedDialogs);