import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import Content from "./Content";

export class Review extends React.Component {
    render() {
        return (
            <div className="review">
            <p className="card-title">{this.props.language === "English"?("Recommender: "+ this.props.personName): ( this.props.personName +" ממליץ: ")}</p>
            <p className="card-title"> {this.props.language === "English"?("Score: "+ this.props.score): ("ציון: "+ this.props.score)}</p>
            <Content content={this.props.content}/> 
            <p className="card-subtitle mb-2 text-muted">
            {this.props.language === "English"? ("Created At: " + moment(this.props.createdAt).format("MMMM D, YYYY")) : (" נוצר בתאריך: " +moment(this.props.createdAt).format("MMMM D, YYYY"))  }
            </p>    
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(Review);
   




