package dropbox.dropbox.controller;

import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.files;
import dropbox.dropbox.service.ActivityService;
import dropbox.dropbox.service.FileService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class FileController {
    @Autowired
    private FileService fileService;

    @Autowired
    private ActivityService activityService;

    ResponseModel model=new ResponseModel();
    //Save the uploaded file to this folder
    private String dir = System.getProperty("user.dir");
    private  String UPLOADED_FOLDER = dir+"\\User Files\\";
    private  String FILENAME = dir+"\\Activity\\";

    @RequestMapping(path = "/listFiles",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<files> listFiles(@RequestBody String file, HttpSession session) throws JSONException {
        if(session==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            System.out.print("session in: "+session);
            JSONObject jsonObject;
            jsonObject = new JSONObject(file);
            System.out.print("parent_id: "+jsonObject.getString("parent_id"));
            List<files> files=fileService.findFiles(jsonObject.getString("parent_id"));
            return new ResponseEntity(files,HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/upload",method = RequestMethod.POST)
    public ResponseEntity<files> uploadFiles(@RequestParam("file") MultipartFile file,
                                             @RequestParam("name") String name,
                                             @RequestParam("folder_name") String folder_name,
                                             @RequestParam("parent_available") Boolean parent_available,
                                             HttpSession session) throws JSONException, IOException {
        System.out.print("upload called: ");
        //files _file=new files();

        if(session==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            if (file.isEmpty()) {
                System.out.print("message: Please select a file to upload");
                return new ResponseEntity(new ArrayList<>(),HttpStatus.OK);
            }
            else
            {
                files _file=new files();
                try {
                    // Get the file and save it somewhere
                    UPLOADED_FOLDER=UPLOADED_FOLDER.replace('\\','/');
                    byte[] bytes = file.getBytes();
                    Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
                    Files.write(path, bytes);
                    _file.setFilename(file.getOriginalFilename());
                    _file.setStarred("no");
                    _file.setFilepath(UPLOADED_FOLDER);
                    _file.setFiletype("file");
                    _file.setUser_name(""+ session.getAttribute("name"));
                    _file.setParent_id(""+ session.getAttribute("name"));
                    fileService.add_File(_file);

                    /*
                    activity _activity=new activity();
                    _activity.setActivity("New File Uploaded, Filename:"+file.getOriginalFilename());
                    _activity.setDate(new Date().toString());
                    _activity.setUsername(""+ session.getAttribute("name"));
                    activityService.addActivity(_activity);
*/

                    File activity_file = new File(FILENAME+session.getAttribute("name")+"_activity.txt");

//Create the file
                    if (activity_file.createNewFile()){
                        System.out.println("File is created!");
                    }else{
                        System.out.println("File already exists.");
                    }

//Write Content

                    FileWriter writer = new FileWriter(activity_file,true);
                    writer.write("New File Uploaded, Filename:"+file.getOriginalFilename()+" on date: "+new Date().toString());
                    writer.write("\r\n");
                    writer.close();

                    System.out.print("message: You successfully uploaded '" + file.getOriginalFilename() + "'");
                } catch (IOException e) {
                    e.printStackTrace();
                }
                List<files> files=fileService.findFiles(""+ session.getAttribute("name"));//to be changed
                return new ResponseEntity(files,HttpStatus.OK);
            }
        }
    }
    @RequestMapping(path = "/make_star",method = RequestMethod.PUT,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<files> make_star(@RequestBody files file_request, HttpSession session) throws JSONException, IOException {
        if(session==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            System.out.print("session in: "+session);
            model=fileService.make_star(file_request);
            List<files> files=fileService.findFiles(file_request.getUser_name());
            return new ResponseEntity(files,HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/createDirectory",method = RequestMethod.POST)
    public ResponseEntity<files> createDirectory(@RequestBody String directory_name, HttpSession session) throws JSONException {

        String folder_name=new JSONObject(directory_name).getString("directory_name");
        System.out.print("directory_name: "+ new JSONObject(directory_name).getString("directory_name") );
        if(session==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            files _file=new files();
            System.out.print("session in: "+session);

            File dir = new File(UPLOADED_FOLDER+"\\"+folder_name);

            boolean exists = dir.exists();
            System.out.println("Directory " + dir.getPath() + " exists: " + exists);

            if(!exists) {
                dir.mkdir();
                _file.setFilename(folder_name);
                _file.setStarred("no");
                _file.setFilepath(UPLOADED_FOLDER);
                _file.setFiletype("directory");
                _file.setUser_name(""+ session.getAttribute("name"));
                _file.setParent_id(""+ session.getAttribute("name"));

                model=fileService.add_File(_file);
            }
            else
            {
                model.setResult("Folder Already Exists");
            }
            List<files> files=fileService.findFiles(""+session.getAttribute("name"));
            return new ResponseEntity(files,HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/share_file",method = RequestMethod.PUT,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> share_file(@RequestBody String share_file_request, HttpSession session) throws JSONException {
        JSONObject jsonObject;
        jsonObject = new JSONObject(share_file_request);

        if(session.getAttribute("name")==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            List<files> files=fileService.share_File(jsonObject.getString("file_id"),jsonObject.getString("usernames"),(String) session.getAttribute("name"));
            return new ResponseEntity(files,HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/getSharedFiles",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<files> getSharedFiles(@RequestBody String file, HttpSession session) throws JSONException {
        System.out.print("session value: "+session.getAttribute("name"));
        System.out.println("current dir = " + UPLOADED_FOLDER);

        if(session==null)
        {
            System.out.print("session timout: "+session);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }
        else
        {
            System.out.print("session in: "+session);
            JSONObject jsonObject;
            jsonObject = new JSONObject(file);

            List<files> files=fileService.findSharedFiles(jsonObject.getString("username"));
            return new ResponseEntity(files,HttpStatus.OK);
        }
    }
}