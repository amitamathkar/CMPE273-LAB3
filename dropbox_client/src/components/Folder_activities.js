import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetFiledetails,uploadDocumentRequest,GetFolderFiles,logOut,GetFiles,make_star,getUserDetails,createDirectory,delete_file,download_file,share_file,create_group} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'



class Folder_activities extends Component {
	constructor(props) {
  super(props);
  this.state = {
    file_id:this.props.location.state.message,
    file_name:this.props.location.state.folder_name,
    username:this.props.location.state.username

  };
} 

componentWillMount() {
      console.log('Home Component WILL MOUNT!' +this.state.file_id)
      this.props.GetFolderFiles(this.state.file_id);
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
          this.props.all_files.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.filetype==="file"?<i className="fa fa-file"></i>:<i className="fa fa-folder"></i>}

              </td>
              <td>{item.filename}</td>
              <td>{item.starred==="no"?<i className="fa fa-star-o" onClick={() => {
                                this.props.make_star(item._id,"yes",this.state.user_name,item.filename)
                            }}></i>:<i className="fa fa-star" onClick={() => {
                                this.props.make_star(item._id,"no",this.state.user_name,item.filename)
                            }}></i>}

              </td>
              <td>
              <i className="fa fa-trash col-md-2" onClick={() => {
                                this.props.delete_file(item._id,item.filename)
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

<h1 className="text-center">Files</h1>


<div className="col-md-8">
        <div className="row pull-left">Recent files</div><br/> <br/>
        <div className="row"></div>  

      <div className="row">
      
<table  className="table table-hover">
<tbody>      {files}      </tbody>
</table>
      </div>            
      </div>
<div>
 <input type="file" className="inputfile" name="upload" id="upload" onChange={(event) => {
                                    this.props.uploadDocumentRequest(event.target.files[0],this.state.file_id,this.state.file_name,true)
                                    }} />
                                    <label className="btn btn-info" for="upload">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upload File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><br/><br/>
  <input type="submit" value="Create New Folder" className="btn btn-info" name="create_dir" id="create_dir" data-toggle="modal" data-target="#myModal"/><br/><br/>
  
  <input type="submit" value="Create New Group" className="btn btn-info" name="create_grp" id="create_grp" data-toggle="modal" data-target="#mygrpModal"/>

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
      
       Enter folder name:<input className="form form-control" type="text" id="foldername"/ >
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
        enter user name: <input type="text" className="form form-control" id="usernames"/ >
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

<div className="modal fade" id="mygrpModal" tabindex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Group Name</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        enter group name: <input type="text" id="groupname"/ ><br/>
        enter group member names: <input type="text" id="member_names"/ ><br/>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-info" onClick={() => {
                                    this.props.create_group(document.getElementById('groupname').value,document.getElementById('member_names').value)
                                    }}>Create Group</button>
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
        all_files:state.reducer2.all_files,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        uploadDocumentRequest : (file,filename,folder_name,parent_available) => dispatch(uploadDocumentRequest(file,filename,folder_name,parent_available)),
        GetFiledetails:(file_id)=>dispatch(GetFiledetails(file_id)),
        GetFolderFiles:(file_id)=>dispatch(GetFolderFiles(file_id)),
                delete_file:(_id,filename)=>dispatch(delete_file(_id,filename)),
        download_file:(_id,filename)=>dispatch(download_file(_id,filename)),
        share_file:(_id,usernames)=>dispatch(share_file(_id,usernames)),
        create_group:(groupname,member_names)=>dispatch(create_group(groupname,member_names)),
        createDirectory:(directory_name)=>dispatch(createDirectory(directory_name)),


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Folder_activities);

