package dropbox.dropbox;

import dropbox.dropbox.controller.FileController;
import dropbox.dropbox.controller.GroupActivityController;
import dropbox.dropbox.model.ResponseModel;
import dropbox.dropbox.model.files;
import dropbox.dropbox.repository.GroupActivityRepository;
import dropbox.dropbox.service.ActivityService;
import dropbox.dropbox.service.FileService;
import dropbox.dropbox.service.GroupActivityService;
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
@WebMvcTest(value = GroupActivityController.class, secure = false)
public class GroupActivityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroupActivityService grpService;

    @MockBean
    private ActivityService activityService;

    ResponseModel model=new ResponseModel("File updated","200");

    List<files> _file=new ArrayList<files>() ;
    @Test
    public  void create_groupTest() throws Exception
    {
        String exampleCourseJson = "{\"groupname\":\"group1\",\"members\":\"user1,user2,user3\"}";
        Mockito.when(grpService.create_group(Mockito.anyString(),Mockito.anyString())).thenReturn(model);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("http://localhost:8080/api/create_group")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(exampleCourseJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatus());
    }
}
