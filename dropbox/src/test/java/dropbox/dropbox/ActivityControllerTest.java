package dropbox.dropbox;

import dropbox.dropbox.controller.LoginController;
import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.users;
import dropbox.dropbox.service.ActivityService;
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
public class ActivityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ActivityService activityservice;

    @MockBean
    private UserService userservice;

    List<activity> _activity=new ArrayList<activity>() ;

    @Test
    public  void get_activityTest() throws Exception
    {
        Mockito.when(activityservice.findUserActivities(Mockito.anyString())).thenReturn(_activity);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("http://localhost:8080/api/getActivity");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}
