package dropbox.dropbox.service;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.files;
import dropbox.dropbox.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    ResponseModel model=new ResponseModel();

    private String dir = System.getProperty("user.dir");
    private  String FILENAME = dir+"\\Activity\\";

    public List<files> findFiles(String username){
        return fileRepository.findAllByParent_id(username);
    }

    public ResponseModel make_star(files file) throws IOException {

        System.out.print("File: "+file);
        files filestest = fileRepository.findOne(file.get_id());
       if(filestest!=null) {
           filestest.setStarred(file.getStarred());
           fileRepository.save(filestest);

           File activity_file = new File(FILENAME+file.getParent_id()+"_activity.txt");
           FileWriter writer = new FileWriter(activity_file,true);
           writer.write("File starred, Filename: "+file.getFilename()+" in on date: "+new Date().toString());
           writer.write("\r\n");
           writer.close();

           model.setResult("File updated");
           return model;
       }
       else
       {
           model.setResult("File not found");
           return model;
       }
    }

    public ResponseModel add_File(files file)
    {
        fileRepository.save(file);
        model.setResult("Folder Created");
        return  model;
    }

    public List<files> share_File(String fileid,String members,String username)
    {
        System.out.print("File: "+fileid);
        files filestest = fileRepository.findOne(fileid);
        if(filestest!=null) {
            filestest.setShared_with(members.split(","));
            fileRepository.save(filestest);
            model.setResult("File updated");
            return findFiles(username);
        }
        else
        {
            model.setResult("File not found");
            return new ArrayList<>();
        }
    }

    public List<files> findSharedFiles(String username){
        return fileRepository.findAllByShared_with(username);
    }
}
