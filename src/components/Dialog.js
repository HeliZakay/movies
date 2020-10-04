import React from 'react';
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
import MovieCard from "./MovieCard";


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
  }
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
    <div className="dialog__button-div">
      <button className="btn button-friend--message btn-lg button-open-review" onClick={handleClickOpen}>
       {props.language === "English"? "Open review": "פתח ביקורת"}
      </button>
      </div>
      <Dialog 
      className={String(props.language !== "English" && "align-right")}
      onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.language === "English" || !props.movie.hname?
          (props.movie.movieName ): (props.movie.hname)}
        </DialogTitle>
        <DialogContent dividers>
         
           <MovieCard 
                        className={String(props.language !== "English" && "align-right")}
                        reviews = {props.movie.reviews}
                        id={props.movie.id}
                        movieName={props.movie.movieName}
                        hname={props.movie.hname}
                        imdbData={props.movie.imdbData}
                        dialog={true}
                     />
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