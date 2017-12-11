import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetActivities,uploadDocumentRequest,logOut,GetFiles,make_star,getUserDetails,createDirectory,delete_file,download_file,share_file,create_group} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class activity_report extends Component {
	constructor(props) {
  super(props);
} 

componentWillMount() {
      console.log('Home Component WILL MOUNT!')
      this.props.GetActivities();
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
      console.log('Component DID UPDATE!'+this.props.result)
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
    var files=
          this.props.activities.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.activity}</td>              
              </tr>)
          }
          );

    return (
      <div className="App col-md-12">
      <div className="col-md-2">
<Link to={{ pathname: '/Home', state: { message: this.props.result ,Username:this.props.uame},target:"_blank" }}><img src="dropbox.png" className="imgStyle"/></Link>
<div className="maestro-nav__feature-wrap">My Files</div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/SharedFiles', state: { Username:this.props.uame},target:"_blank" }}>Shared Files</Link></div>
<div className="maestro-nav__feature-wrap"><Link to={{ pathname: '/Groups', state: { Username:this.props.uame},target:'_blank' }}>Groups</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/UserInfo">User Account</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Details">User Info</Link></div>
<div className="maestro-nav__feature-wrap">
<input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
                                     </div>
      </div>
      <div className="col-md-10">
<div>
<h1 className="text-center">Activity Report</h1>
</div>


<div className="col-md-8">
        
        <div className="row"></div>  

      <div className="row">
<table  className="table table-hover table-bordered">
<tbody>
      {files}
      </tbody></table>
      </div>  

      </div>
            <div className="col-md-2">
      </div>
      </div>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        activities:state.reducer2.activities,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        uploadDocumentRequest : (file,filename,folder_name,parent_available) => dispatch(uploadDocumentRequest(file,filename,folder_name,parent_available)),
        logOut:()=>dispatch(logOut()),
        getUserDetails:()=>dispatch(getUserDetails()),
        createDirectory:(directory_name)=>dispatch(createDirectory(directory_name)),

        GetFiles:(user_name)=>dispatch(GetFiles(user_name)),
        make_star:(file_id,value,user_name,filename)=>dispatch(make_star(file_id,value,user_name,filename)),
        delete_file:(_id,filename)=>dispatch(delete_file(_id,filename)),
        download_file:(_id,filename)=>dispatch(download_file(_id,filename)),
        share_file:(_id,usernames)=>dispatch(share_file(_id,usernames)),
        create_group:(groupname,member_names)=>dispatch(create_group(groupname,member_names)),
        GetActivities:()=>dispatch(GetActivities())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(activity_report);

