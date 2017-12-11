package dropbox.dropbox.model;

public class ResponseModel {

    public ResponseModel(){}
    public ResponseModel(String result,String status){
        this.result=result;
        this.status=status;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    private String result;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;

}
