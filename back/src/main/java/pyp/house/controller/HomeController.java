package pyp.house.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@Controller
public class HomeController {
    // 기본 페이지 요청 메소드
    @GetMapping("/hello")
    public String index() {
        System.out.println("fucking index has loaded");
        return "Hello Spring";
    }
}
