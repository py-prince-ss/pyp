package pyp.house.controller;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import pyp.house.dto.MemberDTO;
import pyp.house.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MemberController {
    //생성자 주입
    private final MemberService memberService;

    @PostMapping("/signup")
    public String save(@RequestBody MemberDTO memberDTO){
        return memberService.save(memberDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody MemberDTO memberDto){
        JSONObject loginInfo =  memberService.login(memberDto);
        return loginInfo.toString();
    }

    @PostMapping("/auth")
    public String auth(@RequestBody String token){
        return memberService.auth(token);
    }

}
