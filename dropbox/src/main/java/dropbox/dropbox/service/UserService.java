package dropbox.dropbox.service;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.users;
import dropbox.dropbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.*;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    ResponseModel model=new ResponseModel();
    private String dir = System.getProperty("user.dir");
    private  String FILENAME = dir+"\\Activity\\";

    BufferedWriter bw = null;
    FileWriter fw = null;

    public ResponseModel addUser(users users) throws IOException {
        if(checkUserExists(users.getUsername())) {
            model.setResult("User Exists");
            return model;
        }
        else
        {
            userRepository.save(users);
            model.setResult("User added");


            FILENAME=FILENAME+users.getUsername()+"_activity.txt";
            String content = "This is the content to write into file\n";

            fw = new FileWriter(FILENAME);
            bw = new BufferedWriter(fw);
            bw.write("");

            return model;
        }
    }

    public List<users> login(String username, String password) throws IOException {
        List<users> user= new ArrayList<>();
         user= userRepository.findAllByUsername(username);
        if(BCrypt.checkpw(password,user.get(0).getPassword()))
        {
            File activity_file = new File(FILENAME+username+"_activity.txt");
            FileWriter writer = new FileWriter(activity_file,true);
            writer.write("User Logged in on date: "+new Date().toString());
            writer.write("\r\n");
            writer.close();

            return user;
        }
        else {
            return new ArrayList<>();
        }
    }

    public boolean checkUserExists(String username)
    {
        boolean flag=false;
        List<users> users= userRepository.findByUsername(username);

        if(users.size()>=1)
        {
            flag=true;
        }
        else {
            flag = false;
        }
        return flag;
    }
}
