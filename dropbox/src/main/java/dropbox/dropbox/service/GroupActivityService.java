package dropbox.dropbox.service;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.files;
import dropbox.dropbox.model.groups;
import dropbox.dropbox.repository.GroupActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupActivityService {
    @Autowired
    private GroupActivityRepository groupactivityRepository;
    ResponseModel model=new ResponseModel();

    public List<groups> findGroupMembers(String username){
        return groupactivityRepository.findAllByUsername(username);
    }

    public ResponseModel delete_group(String group_id){

        System.out.print("File: "+group_id);
        groups grp = groupactivityRepository.findOne(group_id);
        if(grp!=null) {
            groupactivityRepository.delete(grp);
            model.setResult("group updated");
            return model;
        }
        else
        {
            model.setResult("group not found");
            return model;
        }
    }

    public ResponseModel create_group(String groupname,String members) {

        //System.out.print("File: "+file);
        groups group = groupactivityRepository.findOne(groupname);
        if (group != null) {
            model.setResult("group already exists");
            return model;
        } else {


            String[] _members = members.split(",");
            String activity_unames = "";
            for (String item : _members) {
                activity_unames += item + ",";
            }
            groups newgroup = new groups();
            newgroup.setGroupname(groupname);
            newgroup.setMembers(_members);
            groupactivityRepository.save(newgroup);
            model.setResult("new group created");
            return model;
        }
    }
    }
