import React, { Component } from 'react';
import logo from './logo.svg';
import './template.css';
import {setUsername,setPassword,validateUser} from "./actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class Template extends Component {   
  render() {
      console.log('Component WILL Render!'+this.props.result)
    return (
      <div className="col-md-12">
     

     <div className="row logo">
<img src="dropbox.png" className="imgStyle"/>Dropbox
     </div>
     
    
     <div className="row">
     <div className="col-md-2 division">
     <Link to={{ pathname: '/Home', state: { message: this.props.result ,Username:this.props.uame},target:"_blank" }}><img src="dropbox.png" className="imgStyle"/></Link>
<div className="maestro-nav__feature-wrap">My Files</div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/SharedFiles', state: { Username:this.props.uame},target:"_blank" }}>Shared Files</Link></div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/Groups', state: { Username:this.props.uame},target:'_blank' }}>Groups</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/UserInfo">User Account</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Details">User Info</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Activities">Activity Report</Link></div>
     </div>
     <div className="col-md-10">
     <div className="row">
     <div className="col-md-8"><h1>Home</h1></div>
     <div className="col-md-4">div2</div>   

     </div>
  
    <div className="row">
     <div className="col-md-8"></div>
     <div className="col-md-4">
     <input type="file" className="inputfile" name="upload" id="upload" onChange={(event) => {
                                    this.props.uploadDocumentRequest(event.target.files[0],this.state.user_name,'',false)
                                    }} />
                                    <label className="btn btn-info" for="upload">Upload File</label><br/>
  <input type="submit" value="New Folder" className="btn btn-info" name="create_dir" id="create_dir" data-toggle="modal" data-target="#myModal"/><br/>
  <input type="submit" value="New Group" className="btn btn-info" name="create_grp" id="create_grp" data-toggle="modal" data-target="#mygrpModal"/><br/>
</div>   

     </div>

     </div>
     </div>
        </div>

    );
  }
}


const mapStateToProps=(state)=> {
    return {
        uame:state.reducer.Username,
        pass:state.reducer.Password,
        result:state.reducer.result
    };
};

const mapDispatchToProps=(dispatch)=> {
    let actions={setUsername,setPassword}
    return {
        validateUser : (uname,pass) => dispatch(validateUser(uname,pass)),
        ...actions,dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Template);

