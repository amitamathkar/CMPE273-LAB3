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

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(value = LoginController.class, secure = false)
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userservice;

    ResponseModel model=new ResponseModel("Valid User","200");
    String exampleCourseJson = "{\"username\":\"file_test\",\"password\":\"123456\"}";

    List<users> _users=new ArrayList<users>() ;

    @Test
    public  void loginTest() throws Exception
    {
        Mockito.when(userservice.login(Mockito.anyString(),Mockito.anyString())).thenReturn(_users);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/login")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public  void logoutTest() throws Exception
    {
        //Mockito.when(userservice.(Mockito.anyString(),Mockito.anyString())).thenReturn(_users);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/logout");

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}
