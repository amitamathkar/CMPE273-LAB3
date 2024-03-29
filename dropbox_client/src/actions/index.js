import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { post } from 'axios';
import jwt from 'jsonwebtoken';
var fileDownload = require('react-file-download');
let base64 = require('base-64');
export function setUsername(uname) {
    return {
        type : "USERNAME",
        payload:uname
    }
}
export function setPassword(pass) {
    return {
        type : "PASSWORD",
        payload:pass
    }
}

export function setFname(fname) {
    return {
        type : "FIRST",
        payload:fname
    }
}

export function setLname(lname) {
    return {
        type : "LAST",
        payload:lname
    }
}

export function setEmail(email) {
    return {
        type : "EMAIL",
        payload:email
    }
}

export function setOverview(overview) {
    return {
        type : "OVERVIEW",
        payload:overview
    }
}

export function setExperience(Experiance) {
    return {
        type : "EXP",
        payload:Experiance
    }
}

export function setEducation(Education) {
    return {
        type : "EDUCATION",
        payload:Education
    }
}

export function setContact(Contact) {
    return {
        type : "CONTACT",
        payload:Contact
    }
}

export function setHobbies(Hobbies) {
    return {
        type : "HOBBIES",
        payload:Hobbies
    }
}

export function setAchievement(Achievement) {
    return {
        type : "ACHIEVEMENT",
        payload:Achievement
    }
}

export function setCurrentUser(user) {
    console.log("setting");
    return {
        type : "SET_CURRENT_USER",
        payload:user
    }
}

export function validateUser(uname,pass) {
    console.log("uname"+uname);
    let username = 'user';
    let password = '6d895a57-061a-4305-9e44-108f03618b06';

    let headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic dXNlcjo2ZDg5NWE1Ny0wNjFhLTQzMDUtOWU0NC0xMDhmMDM2MThiMDY=');


    return function(dispatch){
        fetch("http://localhost:8080/api/login",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        credentials:'include',
        body: JSON.stringify({

            username:uname,password:pass})
            
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "LOGIN",
                   payload: data.result
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function signUpUser(fname,lname,uname,pass,email) {
    console.log("fname:"+fname);
    console.log("lname:"+lname);
    console.log("uname:"+uname);
    console.log("email:"+email);
    console.log("pass:"+pass);

    return function(dispatch){

        fetch("http://localhost:8080/api/signUp",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify({

                username:uname,email_id:email,password:pass})

        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "SIGNUP",
                    payload: data.result
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function uploadDocumentRequest(file, file_id,folder_name,flag ) {  
  console.log("name:"+file_id)
  console.log("file:"+folder_name)
  var data = new FormData();
  data.append('file', file);
  data.append('name', file_id);
  data.append('parent_available', flag);
  data.append('folder_name', folder_name);

   return function(dispatch) {
    fetch('http://localhost:8080/api/upload',{
        mode: 'no-cors',
     method:"POST",
            headers: {
            'Accept': 'application/json'
        },
        credentials:'include',
        body: data})
     .then(res => res.json())
        .then(data => 

            dispatch({
                   type: "UPLOAD_DOCUMENT_SUCCESS",
                   payload: data
            })

        )
        .catch(function(err){
            console.log(err);
        });
  }
}

export function logOut(file, name ) {  
    return function(dispatch){
        fetch("http://localhost:8080/api/logout",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'    
        })
        //.then(res => res.json())
        .then(data => 
            dispatch({
                   type: "LOGOUT",
                   payload: data.result
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export function GetFiles(uname) {
    console.log("uname:"+uname);

    return function(dispatch){
        fetch("http://localhost:8080/api/listFiles",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({parent_id:uname})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function make_star(file_id,value,user_name,Filename) {
    console.log("file_id:"+file_id+"   value: "+value);

    return function(dispatch){
        fetch("http://localhost:8080/api/make_star",{

            method:"PUT",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({_id:file_id,starred:value,user_name:user_name,filename:Filename})
        })
        .then(res => res.json())
        .then(data => 

            dispatch({
                   type: "STARRED",
                   payload: data
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function insertUserAccount(overview,Experiance,Education,Contact,Hobbies,Achievement) {
        console.log("overview:"+overview);
    console.log("Experiance:"+Experiance);
    console.log("Education:"+Education);
    console.log("Contact:"+Contact);
    console.log("Hobbies:"+Hobbies);
    console.log("Achievement:"+Achievement);

    return function(dispatch){
        fetch("http://localhost:5001/api/insertUserAccount",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({overview:overview,Experiance:Experiance,Education:Education,Contact:Contact,Hobbies:Hobbies,Achievement:Achievement})
        })
        .then(res => res.json())
        .then(data => 
            
            dispatch({
                   type: "USER_ACCOUNT",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function getUserDetails() {  
    console.log('user details called');
    return function(dispatch){
        fetch("http://localhost:5001/api/getDetails",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'    
        })
        .then(res => res.json())
        .then(data => 
            dispatch({
                   type: "DETAILS",
                   payload: data.details
            })
        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function createDirectory(directory_name) {  
    console.log('createDirectory called');
    return function(dispatch){
        fetch("http://localhost:8080/api/createDirectory",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include' ,
        body:JSON.stringify({directory_name:directory_name})   
        })
        .then(res => res.json())
        .then(data => 
            dispatch({
                   type: "CREATE_DIR",
                   payload: data
            })
        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetFiledetails(file_id) {
    console.log("uname:"+file_id);

    return function(dispatch){
        fetch("http://localhost:5001/api/getFiledetails",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function delete_file(file_id,Filename) {
    console.log("file_id:"+file_id+"   value: "+Filename);

    return function(dispatch){
        fetch("http://localhost:5001/api/delete_file",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,Filename:Filename})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "DELETE",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function download_file(file_id,Filename) {
    console.log("file_id:"+file_id+"   value: "+Filename);

    return function(dispatch){
        fetch("http://localhost:5001/api/download_file",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,Filename:Filename})
        })
        .then(res => {
            fileDownload(res.data, Filename),
            res.json()})
        .then(data => 

            
            dispatch({
                   type: "DELETE",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetFolderFiles(file_id) {
    console.log("uname:"+file_id);

    return function(dispatch){
        fetch("http://localhost:5001/api/getAllFiles",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({parent_id:file_id})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function share_file(file_id,usernames) {
    console.log("file_id:"+file_id+"   value: "+usernames);

    return function(dispatch){
        fetch("http://localhost:8080/api/share_file",{
            method:"PUT",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,usernames:usernames})
        })
        .then(res => res.json())
        .then(data => 
        
        dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetSharedFiles(uname) {
    console.log("uname:"+uname);

    return function(dispatch){
        fetch("http://localhost:8080/api/getSharedFiles",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({username:uname})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function create_group(groupname,members) {
    console.log("uname:"+groupname);
    console.log("members:"+members);


    return function(dispatch){
        fetch("http://localhost:5001/api/create_group",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({groupname:groupname,members:members})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function add_member(groupname,members) {
    console.log("uname:"+groupname);
    console.log("members:"+members);


    return function(dispatch){
        fetch("http://localhost:5001/api/add_group_member",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({groupname:groupname,members:members})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function get_members(groupname) {
    console.log("uname:"+groupname);
    

    return function(dispatch){
        fetch("http://localhost:5001/api/getGroupMembers",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({groupname:groupname})
        })
        .then(res => res.json())
        .then(data =>             
            dispatch({
                   type: "GROUPMEMBERS",
                   payload: {groupname:groupname,group_members:data.members}
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function get_groups(username) {
    console.log("uname:"+username);
    
    return function(dispatch){
        fetch("http://localhost:5001/api/getGroups",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({username:username})
        })
        .then(res => res.json())
        .then(data =>             
            dispatch({
                   type: "ALLGROUPS",
                   payload: data.members
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function delete_group(group_id,groupname) {
    console.log("file_id:"+group_id+"   value: "+groupname);

    return function(dispatch){
        fetch("http://localhost:5001/api/delete_group",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({group_id:group_id,groupname:groupname})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLGROUPS",
                   payload: data.members
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function delete_group_member(group_mid,m_groupname,groupname) {
    console.log("file_id:"+group_mid+"   value: "+m_groupname);

    return function(dispatch){
        fetch("http://localhost:8080/api/delete_group_member",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({group_mid:group_mid,m_groupname:m_groupname,groupname:groupname})
        })
        .then(res => res.json())
        .then(data =>             
            dispatch({
                   type: "GROUPMEMBERS",
                   payload: {groupname:groupname,group_members:data.members}
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetActivities() {
    
    return function(dispatch){
        fetch("http://localhost:8080/api/getActivity",{
            method:"GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'
        //,            body:    JSON.stringify({parent_id:uname})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ACTIVITIES",
                   payload: data
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}