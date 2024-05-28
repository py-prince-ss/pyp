package pyp.house.service;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import pyp.house.dto.MemberDTO;
import pyp.house.entity.MemberEntity;
import pyp.house.repository.MemberRepository;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtService {
    public static MemberRepository memberRepository;

    static SecretKey key = Jwts.SIG.HS256.key().build();

    public static String JwtGenerate(String userEmail){
        return Jwts.builder()
                .subject(userEmail)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key)
                .compact();
    }

    public static String ExtractJwtToken(String token){
        JSONObject authUserJson = new JSONObject();

        try {
            //jwt 토큰 parsing
            String anonymous = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload()
                        .getSubject();

            Optional<MemberEntity> memberSearch = memberRepository.findByMemberEmail(anonymous);
            if (memberSearch.isPresent()){
                //만일 일치하는 이메일 있으면 유저정보 담아서 다시돌려보냄
                MemberEntity memberEntity = memberSearch.get();
                authUserJson.put("success", true);
                authUserJson.put("user", MemberDTO.toMemberDTO(memberEntity));
                return authUserJson.toString();
            } else {
                //일치하는 유저정보 없으면 실패
                authUserJson.put("success", false);
                authUserJson.put("msg", "일치하는 회원이 없습니다.");
                return authUserJson.toString();
            }
            //OK, we can trust this JWT
        } catch (JwtException e) {
            //jwt 토큰 파싱 실패. 토큰에 에러가 있음
            authUserJson.put("success", false);
            authUserJson.put("msg", "유효하지 않은 토큰입니다.");
            return authUserJson.toString();
        }
    }
}