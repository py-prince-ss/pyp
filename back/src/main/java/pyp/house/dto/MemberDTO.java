package pyp.house.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.json.JSONObject;
import pyp.house.entity.MemberEntity;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberDTO {

    private Long id;
    private String email;
    private String password;
    private String name;
    private int age;
    private String phone;

    public static MemberDTO toMemberDTO(MemberEntity memberEntity) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberEntity.getId());
        memberDTO.setAge(memberEntity.getMemberAge());
        memberDTO.setEmail(memberEntity.getMemberEmail());
        memberDTO.setName(memberEntity.getMemberName());
        memberDTO.setPassword(memberEntity.getMemberPassword());
        memberDTO.setPhone(memberEntity.getMemberPhone());

        return memberDTO;
    }
}
