import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {getUserDetails,logOut} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class UserData extends Component {
  constructor(props) {
  super(props);
} 

componentWillMount() {
      console.log('Home Component WILL MOUNT!')
      this.props.getUserDetails();
      console.log("all files displayed:"+this.props.all_files);
   }

   componentDidMount() {
      console.log('Home Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Home Component WILL RECIEVE PROPS!')

   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');

   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!');
      //this.props.GetFiles("amitam");
      if(this.props.isAuthenticated===false)
        {
          console.log("called logout");
          this.props.history.push("/");
        }

   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }


  render() {
    return (
      <div className="App col-md-12">
      <div className="col-md-2">
<Link to={{ pathname: '/Home', state: { message: this.props.result ,Username:this.props.uame},target:"_blank" }}><img src="dropbox.png" className="imgStyle"/></Link>
<div className="maestro-nav__feature-wrap">My Files</div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/SharedFiles', state: { Username:this.props.uame},target:"_blank" }}>Shared Files</Link></div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/Groups', state: { Username:this.props.uame},target:'_blank' }}>Groups</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/UserInfo">User Account</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Details">User Info</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Activities">Activity Report</Link></div>

<div className="maestro-nav__feature-wrap">
<input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
                                     </div>
      </div>
      <div className="col-md-10">
      <h3 className=" pull-left">User Details</h3>
      <table className="table table-hover">
      <tbody>
      <tr>
      <td>FirstName</td>
      <td>{this.props.fname}</td>
      </tr>
      <tr>
      <td>Lastname</td>
      <td>{this.props.lname}</td>
      </tr>
      <tr>
      <td>
      Email id</td><td>{this.props.email}</td></tr>
       <tr><td>
      overview</td><td>{this.props.overview}</td></tr>
       <tr><td>
      Experiance</td><td>{this.props.Experiance}</td></tr>
       <tr><td>
      Education</td><td>{this.props.Education}</td></tr>
       <tr><td>
      Contact</td><td>{this.props.Contact}</td></tr>
       <tr><td>
      Hobbies</td><td>{this.props.Hobbies}</td></tr>
      <tr><td>
      Achievement</td><td>{this.props.Achievement}</td></tr>
      
      </tbody>
      </table>
      </div>
</div>
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        fname:state.reducer.FirstName,
        lname:state.reducer.LastName,
        email:state.reducer.email_id,
        isAuthenticated:state.reducer.isAuthenticated,
        overview:state.reducer.overview,
        Experiance:state.reducer.Experiance,
        Education:state.reducer.Education,
        Contact:state.reducer.Contact,
        Hobbies:state.reducer.Hobbies,
        Achievement:state.reducer.Achievement
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        getUserDetails:()=>dispatch(getUserDetails()),
        logOut:()=>dispatch(logOut()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserData);

