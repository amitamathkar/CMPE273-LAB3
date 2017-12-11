package dropbox.dropbox.service;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.users;
import dropbox.dropbox.repository.ActivityRepository;
import dropbox.dropbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;
    ResponseModel model=new ResponseModel();
    private String dir = System.getProperty("user.dir");
    private  String fileName = dir+"\\Activity\\";

    String line = null;

    public List<activity> findActivities(String username){
        return activityRepository.findAllByUsername(username);
    }

    public ResponseModel addActivity(activity activity){
            activityRepository.save(activity);
            model.setResult("activity added");
            return model;
    }

    public List<activity> findUserActivities(String username) throws IOException {
        fileName = fileName + username + "_activity.txt";
        FileReader fileReader =
                new FileReader(fileName);

        // Always wrap FileReader in BufferedReader.
        BufferedReader bufferedReader =
                new BufferedReader(fileReader);

        int count=0;
        List<activity> _activity = new ArrayList<>();

        while ((line = bufferedReader.readLine()) != null) {
            activity activity = new activity();
            activity.setActivity(line);
            count++;
            activity.set_id(""+count);
            _activity.add(activity);
        }
        // Always close files.
        bufferedReader.close();
        return _activity;

    }
}
