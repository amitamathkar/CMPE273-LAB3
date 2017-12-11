package dropbox.dropbox.controller;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.groups;
import dropbox.dropbox.service.GroupActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@SessionAttributes("name")
public class GroupActivityController {
    @Autowired
    private GroupActivityService groupactivityService;
    ResponseModel model=new ResponseModel();

    @RequestMapping(path = "/delete_group_member",method = RequestMethod.DELETE)
    public ResponseEntity<groups> delete_group_member(@RequestParam("group_mid") String group_mid,
                                                      @RequestParam("m_groupname") String m_groupname,
                                                      @RequestParam("groupname") String groupname,
                                                      ModelMap mode) {
        if(mode.get("name")==null)
        {
            System.out.print("session timout: "+mode.get("name"));
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            System.out.print((String)mode.get("name"));
            model= groupactivityService.delete_group(group_mid);
            List<groups> groups=groupactivityService.findGroupMembers("hkbhatia");
            return new ResponseEntity(groups,HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/create_group",method = RequestMethod.PUT)
    public ResponseEntity<groups> create_group(
                                                @RequestBody String group_info,
                                                //@RequestParam("groupname") String groupname,
                                                //@RequestParam("members") String members,
                                                HttpSession session) {
        if(session.getAttribute("name")==null)
        {
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            //model= groupactivityService.delete_group(group_mid);
            List<groups> groups=groupactivityService.findGroupMembers("hkbhatia");
            return new ResponseEntity(groups,HttpStatus.OK);
        }
    }
}