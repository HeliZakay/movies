import React from "react";
import { connect } from "react-redux";

export class MoviesCarousel extends React.Component {
    render() {
        return (
            <p>MoviesCarousel</p>
        );
    }
}

const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps)(MoviesCarousel);