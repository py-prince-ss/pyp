package pyp.house.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pyp.house.config.SecurityConfig;
import pyp.house.dto.MemberDTO;
import pyp.house.entity.MemberEntity;
import pyp.house.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final SecurityConfig securityConfig;

    public String save(MemberDTO memberDTO) {
        //repository의 save 메서드 호출 (조건, 당연히 Entity 객체로 넘겨주어야 한다.)
        // 1. DTO를 ENtity 객체로 변환
        // 2. save 메서드 호출
        // 3. 멤버 중에 동일한 유효한 이메일인지 확인
        // 4. 가입한적 있으면 가입 안됨
        // 5. 가입한 적 없으면 저장하고, JSon객체 리턴
        JSONObject signupJson = new JSONObject();
        if (memberRepository.existsByMemberEmail(memberDTO.getEmail())){
            System.out.println(memberDTO);
            signupJson.put("success", false);
            signupJson.put("msg", "이미 가입한 이메일입니다.");
            return signupJson.toString();
        } else {
            MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
            PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            memberEntity.setMemberPassword(passwordEncoder.encode(memberDTO.getPassword()));
            memberRepository.save(memberEntity);
            return login(memberDTO).toString();
        }
    }

    public JSONObject login(MemberDTO memberDTO){
        /*
            1. 회원이 입력한 이메일로 DB에서 조회를 함
            2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 확인
        */
        Optional<MemberEntity> byMemberEmail = memberRepository.findByMemberEmail(memberDTO.getEmail());
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        JSONObject loginJson = new JSONObject();
        if (byMemberEmail.isPresent()) {
            //조회결과가 있다면 (해당 이메일을 가진 회원정보가 있다.)
            MemberEntity memberEntity = byMemberEmail.get();
            if (passwordEncoder.matches(memberDTO.getPassword(), memberEntity.getMemberPassword())) {
                /* if 조건문에서 string 비교할때 == 연산자 대신 equals()메소드를 꼭 사용할 것
                비밀번호도 일치하는 경우 Entity 를 JSON 객체로 변환해준다.
                그리고 string 비교 말고, Encoder의 matches()메소드를 활용하면 raw한 비번과
                encrypt 된 비밀번호를 직접 비교 가능 */
                JSONObject user = MemberEntity.toJSONOBJECT(memberEntity);
                String token = JwtService.JwtGenerate(memberEntity.getMemberName());

                loginJson.put("success", true);
                loginJson.put("user", user);
                loginJson.put("token", token);
                return loginJson;
            } else {
                loginJson.put("success", false);
                loginJson.put("msg", "비밀번호가 일치하지 않습니다.");
                return loginJson;
            }
        } else {
            //조회결과가 없다면 해당 이메일을 가진 회원정보가 없다.
            // fail에 회원가입 필요하다고 msg담아서 리턴
            loginJson.put("success", false);
            loginJson.put("msg", "일치하는 이메일이 없습니다. 회원가입을 진행해주세요.");
            return loginJson;
        }
    }
}

