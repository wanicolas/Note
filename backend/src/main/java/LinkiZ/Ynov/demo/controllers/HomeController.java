package LinkiZ.Ynov.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import LinkiZ.Ynov.demo.payload.requests.HomeRequest;
import LinkiZ.Ynov.demo.payload.responses.HomeResponse;

@RestController
public class HomeController {
    @GetMapping("/")
    HomeResponse homeResponse() {
        return new HomeResponse("Hello World");
    }
    @GetMapping("/HelloWorld")
    public String home() {
        return homeResponse().getValue();
    }

    @PostMapping("/")
    public HomeResponse postMethodName(@RequestBody String param) {
        return new HomeResponse(param);
    }

        @PostMapping("/HomeRequest")
    public HomeResponse homePost(@RequestBody HomeRequest homeRequest) {
        return new HomeResponse(homeRequest.getValue());
    }
    

}
