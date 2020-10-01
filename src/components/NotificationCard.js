import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {startMarkNotificationAsRead} from "../actions/notifications";
import Dialog from "./Dialog";


export class NotificationCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: props.notification.read,
        }
    }   
    onOpenClick = () => {
        this.setState({open: true});
        this.props.startMarkNotificationAsRead(this.props.uid, this.props.notification.id);
    };
    render() {    
        return (
            <div className="card card bg-light mb-3 custom-card">
             <div className="message-card">
            <div className="card-header custom-card-header">
            <div className="custom-card-header__envelop-and-header">
            {this.props.notification.type === "getStar" && <i className="envelop material-icons">
            star
            </i>}
            {this.props.notification.type === "newReview" && <i className="envelop material-icons">
            movie_filter
            </i>}
            <h3 >
            {this.props.notification.type === "getStar" &&
            (this.props.language === "English" ?
             "Star from " + this.props.notification.personName+ "!":
                "כוכב מ "+this.props.notification.personName+"!")}           
            </h3>     
            <h3 >
            {this.props.notification.type === "newReview" &&
            (this.props.language === "English" ?
             this.props.notification.personName+ " wrote a new review!":
                "ביקורת חדשה מאת  "+this.props.notification.personName+"!")}           
            </h3>        
            </div>
            <i onClick={() => this.props.onDelete(this.props.notification.id, this.props.uid)} className="trash delete-icon material-icons">
            delete
            </i>
            </div>
            </div>
            <div className="card-body custom-card-body">
            <div className="custom-card__card-content">
                 <p className="card-subtitle mb-2 text-muted">
                {this.props.language === "English"? 
                " Created at: "+ moment(this.props.notification.createdAt).format("MMMM D, YYYY"):
                 " נוצר בתאריך "+moment(this.props.notification.createdAt).format("MMMM D, YYYY")
                }
                </p>
                {!this.state.open && <button
                onClick={this.onOpenClick}
                className="btn button-movie btn-warning btn-lg"
                >
                {this.props.language === "English"? "Open!" : "פתח!"}
                </button>}

               {this.state.open && 
               <div> 
                {this.props.notification.type === "getStar" && (
                    this.props.language === "English"? (
                        <p>{this.props.notification.personName+ " gave you a star on your review for the movie " + this.props.notification.movieName}</p>
                    ) :(
                        <p>{this.props.notification.personName+" נתנו לך כוכב על הביקורת שלך עבור הסרט " + this.props.notification.movieName}</p>
                    )
                )        
                }
                {this.props.notification.type === "newReview" && (
                    this.props.language === "English"? (
                        <p>{this.props.notification.personName+ " wrote a review for the movie " + this.props.notification.movieName}</p>
                    ) :(
                        <p>{this.props.notification.personName+" כתבו ביקורת עבור הסרט " + this.props.notification.movieName}</p>
                    )
                )        
                }
                 {this.props.movie && <Dialog  movie={this.props.movie}/>}
               </div>
               }
            </div>
            </div>
            </div>
        );
    };
};
    

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    language: state.auth.language,
});


const mapDispatchToProps = (dispatch) => ({
    startMarkNotificationAsRead: (userId, id) => dispatch(startMarkNotificationAsRead(userId, id))
 });



export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard);





