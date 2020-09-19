import React from 'react';
import {connect} from "react-redux";

export  class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false
        }
    }
    readMore = () => {
        this.setState({readMore: !this.state.readMore});
    }
    shortenContent = (content) => {
        if(content.length< 150) {
            return <p>"{content}"</p>;
        }
        else {
            return <div>
            {!this.state.readMore ?
            <p>
            "{content.slice(0,150)}..."
            <a onClick={this.readMore}>
            {this.props.language === "English"?  "Read More" : "קרא עוד "}
            </a>
            </p>:
            <p>
            "{content}"
            <a onClick={this.readMore}>
            {this.props.language === "English"?  "Read Less" : "קרא פחות "}
            </a>
            </p>
            }
            </div>;
        }
    }
    render() {
        return (
            <div className="content">
             {this.props.content && <div className="card-text"> {this.shortenContent(this.props.content)}</div>}           
            </div>
        );
    }
};



const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(Content);
   