package LinkiZ.Ynov.demo.payload.requests;

public class HomeRequest {
    public String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public HomeRequest() {}

    public HomeRequest(String value) {
        this.value = value;
    }    
}