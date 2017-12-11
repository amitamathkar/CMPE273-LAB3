package dropbox.dropbox;

import dropbox.dropbox.controller.LoginController;
import dropbox.dropbox.controller.SignUpController;
import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.users;
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

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(value = SignUpController.class, secure = false)
public class SignUpControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userservice;

    ResponseModel model=new ResponseModel("User added","200");
    String exampleCourseJson = "{\"username\":\"JUNIT\",\"email_id\":\"junit@gmail.com\",\"password\":\"123456\"}";
    @Test
    public  void addUserTest() throws Exception
    {
        Mockito.when(userservice.addUser(Mockito.any(users.class))).thenReturn(model);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/signUp")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.ACCEPTED.value(), response.getStatus());
    }

    @Test
    public  void checkUser_existsTest() throws Exception
    {
        boolean flag=false;
        Mockito.when(userservice.checkUserExists(Mockito.anyString())).thenReturn(flag);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/signUp")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.ACCEPTED.value(), response.getStatus());
    }
}
