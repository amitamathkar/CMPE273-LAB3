package dropbox.dropbox.controller;

import com.sun.media.sound.InvalidDataException;
import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.users;
import dropbox.dropbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class SignUpController {
    @Autowired
    private UserService userService;
    ResponseModel model=new ResponseModel();

    @RequestMapping(path = "/signUp",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@RequestBody users user) throws IOException {
           model=userService.addUser(user);
        return new ResponseEntity<ResponseModel>(model,HttpStatus.ACCEPTED);
    }
}