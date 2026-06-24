package LinkiZ.Ynov.demo.payload.responses;

public class HomeResponse {
    public String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public HomeResponse() {}

    public HomeResponse(String value) {
        this.value = value;
    }    
}
