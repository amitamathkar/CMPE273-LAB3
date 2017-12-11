package dropbox.dropbox;

import dropbox.dropbox.controller.FileController;
import dropbox.dropbox.controller.SignUpController;
import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.files;
import dropbox.dropbox.model.users;
import dropbox.dropbox.service.ActivityService;
import dropbox.dropbox.service.FileService;
import dropbox.dropbox.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(value = FileController.class, secure = false)
public class FileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FileService fileService;

    @MockBean
    private ActivityService activityService;

    ResponseModel model=new ResponseModel("File updated","200");
    String exampleCourseJson = "{\"_id\":\"5a08d8f086e7d0127860cc9b\",\"starred\":\"yes\",\"user_name\":\"amitam\",\"filename\":\"testing\"}";
    List<files> _file=new ArrayList<files>() ;
    @Test
    public  void make_starTest() throws Exception
    {
        Mockito.when(fileService.make_star(Mockito.any(files.class))).thenReturn(model);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("http://localhost:8080/api/make_star")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public  void file_listTest() throws Exception
    {
        String exampleCourseJson = "{\"parent_id\":\"amitam\"}";
        Mockito.when(fileService.findFiles(Mockito.anyString())).thenReturn(_file);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/listFiles")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public  void share_fileTest() throws Exception
    {
        String exampleCourseJson = "{\"file_id\":\"5a08d8f086e7d0127860cc9b\",\"usernames\":\"user1,user2,user3\"}";
        Mockito.when(fileService.share_File(Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(_file);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("http://localhost:8080/api/share_file")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatus());
    }

    @Test
    public  void create_directoryTest() throws Exception
    {
        String exampleCourseJson = "{\"directory_name\":\"test_directory\"}";
        Mockito.when(fileService.add_File(Mockito.any(files.class))).thenReturn(model);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/createDirectory")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public  void sharedfiles_listTest() throws Exception
    {
        String exampleCourseJson = "{\"username\":\"amitam\"}";
        Mockito.when(fileService.findSharedFiles(Mockito.anyString())).thenReturn(_file);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/getSharedFiles")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}
