package pyp.house.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import pyp.house.dto.MemberDTO;

@Entity
@Setter
@Getter
@Table(name = "member_table")
public class MemberEntity {
    @Id // prime key를 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @Column(unique = true)
    private String memberEmail;

    @Column
    private String memberPassword;

    @Column
    private String memberName;

    @Column
    private String memberPhone;

    @Column
    private Integer memberAge;



    public static MemberEntity toMemberEntity(MemberDTO memberDTO) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMemberEmail(memberDTO.getEmail());
        memberEntity.setMemberName(memberDTO.getName());
        memberEntity.setMemberPassword(memberDTO.getPassword());
        memberEntity.setMemberPhone(memberDTO.getPhone());
        memberEntity.setMemberAge(memberDTO.getAge());
        return memberEntity;
    }

    public static JSONObject toJSONOBJECT(MemberEntity memberEntity){
        JSONObject userJson = new JSONObject();
        userJson.put("name", memberEntity.getMemberName());
        userJson.put("email", memberEntity.getMemberEmail());
        userJson.put("phone", memberEntity.getMemberPhone());
        userJson.put("age", memberEntity.getMemberAge());
        return userJson;
    }
}
