import React from "react";
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import FriendCardShanaTova from "./FriendCardShanaTova";

export class ShanaTova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showImages: true,
           showFriends: false,
           cardNum: "1"
        }
    }
    onCardChoose = (cardNum) => {
        this.setState({showImages: false, showFriends: true, cardNum: cardNum});
    }
    onFinishSend = () => {
        this.setState({showImages: true, showFriends: false, cardNum: "1"})
    }
    render() {
        return (
            <div className="shana-tova">
            {this.state.showImages && <div>
                <h1 className="shana-tova__heading">!בחרו כרטיס שנה טובה ושלחו לחבר/ה אהובים</h1>
            <div className="shana-tova__images">
           <div>
           <a onClick={() => this.onCardChoose("1")}>
           <img className="shana-tove__card" src='/images/shana-tova1.png'></img>
           </a>
           
           </div>
           <div>
           <a onClick={() => this.onCardChoose("2")}>
           <img className="shana-tove__card" src='/images/shana-tova2.png'></img>
           </a>
           </div>
           <div>
           <a onClick={() => this.onCardChoose("3")}>
           <img className="shana-tove__card" src='/images/shana-tova3.png'></img>
           </a>
           </div>
           <div>
           <a onClick={() => this.onCardChoose("4")}>
           <img className="shana-tove__card" src='/images/shana-tova4.png'></img>
           </a>
           </div>
           <div>
           <a onClick={() => this.onCardChoose("5")}>
           <img className="shana-tove__card" src='/images/shana-tova5.png'></img>
           </a>
           </div>
            </div>
            </div>}
            {this.state.showFriends && <div>

        <h1 className="shana-tova__heading">בחרו את החבר/ה אליהם תרצו לשלוח</h1>
        <div className="finish-send">
<button onClick={this.onFinishSend}
className="btn button-movie btn-warning btn-lg " 
> סיימתי לשלוח או שאני רוצה לבחור כרטיס אחר
</button>
</div>
        {this.props.friends.length ===0 ? 
              <p className="friends__message">
              {this.props.language === "English"? " Add a friend!": "!הוסיפו חברים"}
              
              </p>
              : 
                  <div className="row">
                  {this.props.friends.map((friendObject) => 
                  <div key={friendObject.userId} className=" col-sm-12 col-md-6 col-lg-4">
                    <FriendCardShanaTova cardNum={this.state.cardNum} friendObj = {friendObject}/>
                    </div>
                )
              }
              </div>
        }

<div className="finish-send">
<button onClick={this.onFinishSend}
className="btn button-movie btn-warning btn-lg " 
>סיימתי לשלוח או שאני רוצה לבחור כרטיס אחר</button>
</div>

     </div>}
     </div>
            );
    }
   
}

const mapStateToProps = (state) => ({
    friends: state.friends.friends
    
});


export default connect(mapStateToProps)(ShanaTova);

