import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {get_groups,get_members,delete_group_member,uploadDocumentRequest,logOut,GetSharedFiles,make_star,getUserDetails,createDirectory,delete_file,download_file,share_file} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class Groupmembers extends Component {
	constructor(props) {
  super(props);
  this.state = {
   //message:this.props.location.state.message,
    group_name:this.props.location.state.groupname,
    group_members:[],
    file_id:0
  };
} 

/*assign_fileid(value)
{
  this.props.file_id=value;
}*/

componentWillMount() {
      console.log('Shared Files Component WILL MOUNT!' +this.state.group_name)
      this.props.get_members(this.state.group_name);
      console.log("all group members displayed:"+this.props.all_files);
   }

   componentDidMount() {
      console.log('GetSharedFiles Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('share_file Component WILL RECIEVE PROPS!')

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
      /*if(this.props.isAuthenticated===false)
        {
          console.log("called logout");
          this.props.history.push("/");
        }
*/
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }


  render() {
    var groupmembers=
          this.props.group_members.map((item,key)=>{
            return(<tr key={key}>
              <td>
              <Link to={{ pathname: '/Groupmembers', state: { Username:this.props.uame},target:"_blank" }}>
              <i className="fa fa-user col-md-2"></i>
              {item.membername}

             
              </Link>
               </td>
              <td>
              <i className="fa fa-trash col-md-2" onClick={() => {
                                this.props.delete_group_member(item._id,item.membername,this.state.group_name)
                            }}></i>
              
              <i className="fa fa-download col-md-2" onClick={() => {
                                this.props.download_file(item._id,item.filename)
                            }}></i>

              <i className="fa fa-share-alt col-md-2" onClick={() => {
                      this.setState({
                                        file_id: item._id
                                    });
              }} data-toggle="modal" data-target="#shareModal"></i>             

              </td>
                            
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
<div className="maestro-nav__feature-wrap"><Link to="/Activities">Activity Report</Link></div>

<div className="maestro-nav__feature-wrap">
<input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
                                     </div>
      </div>
      <div className="col-md-10">
<div>
<h1 className="text-center">Group members</h1>
</div>


<div className="col-md-8">
        <div className="row pull-left"><h4>Group name: {this.state.group_name}</h4></div> <br/><br/>
        <div className="row"></div>  
<table  className="table table-hover">
<tbody>      {groupmembers}      </tbody>
</table>

      </div>
            <div className="col-md-2">

       
          
          
      </div>
      </div>

<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        enter folder name: <input type="text" id="foldername"/ >
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-info"  onClick={() => {
                                    this.props.createDirectory(document.getElementById('foldername').value)
                                    }}>Create Folder</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        enter user name: <input type="text" id="usernames"/ >
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-info" onClick={() => {
                                    this.props.share_file(this.state.file_id,document.getElementById('usernames').value)
                                    }}>Create Folder</button>
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
        group_members:state.reducer2.group_members,
        groupname:state.reducer2.groupname,
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

        GetSharedFiles:(user_name)=>dispatch(GetSharedFiles(user_name)),
        make_star:(file_id,value,user_name,filename)=>dispatch(make_star(file_id,value,user_name,filename)),
        delete_file:(_id,filename)=>dispatch(delete_file(_id,filename)),
        download_file:(_id,filename)=>dispatch(download_file(_id,filename)),
        share_file:(_id,usernames)=>dispatch(share_file(_id,usernames)),
        get_groups:(username)=>dispatch(get_groups(username)),
        get_members:(groupname)=>dispatch(get_members(groupname)),
        delete_group_member:(_id,member_name,groupname)=>dispatch(delete_group_member(_id,member_name,groupname))

        //get_members
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Groupmembers);

