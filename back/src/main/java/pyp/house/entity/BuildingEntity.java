package pyp.house.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import pyp.house.dto.BuildingDTO;

@Entity
@Setter
@Getter
@Table(name = "building")
public class BuildingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(length = 50)
    private String direction;

    @Column(length = 50)
    private String entranceStructure;

    @Column(length = 50)
    private String numberOfHouseholds;

    @Column(length = 100)
    private String address;

    @Column(length = 100)
    private String addressRoad;

    @Column(length = 50)
    private String managementFee;

    @Column(length = 50)
    private String sggNm;

    @Column(length = 50)
    private String bjdongNm;

    @Column(length = 50)
    private String parkingSpaces;

    @Column(length = 500)
    private String description;

    @Column(length = 50)
    private String floor;

    @Column(length = 50)
    private String totalFloor;

    @Column(length = 50)
    private String room;

    @Column(length = 50)
    private String bathroom;

    @Column(nullable = false)
    private Double supplyArea;

    @Column(nullable = false)
    private Double netLeasableArea;

    @Column(length = 50)
    private String houseType;

    @Column(nullable = false)
    private Integer objAmt;

    @Column(length = 100)
    private String bldgNm;

    //가격 쿼리를 위한 임시 가격 생성, 어떻게 할지 논의 필요
    @Column
    private Integer price;

    /*
    //나중에 이미지 src 저장하는 녀석 추가해서 이미지 소스 주소 저장하기 위한 필드
    @Column(length = 500)
    private String img;

     */


    // DTO to Entity
    public static BuildingEntity toBuildingEntity(BuildingDTO dto) {
        BuildingEntity entity = new BuildingEntity();
        entity.setId(dto.getId());
        entity.setUserId(dto.getUserId());
        entity.setDirection(dto.getDirection());
        entity.setEntranceStructure(dto.getEntranceStructure());
        entity.setNumberOfHouseholds(dto.getNumberOfHouseholds());
        entity.setAddress(dto.getAddress());
        entity.setAddressRoad(dto.getAddressRoad());
        entity.setManagementFee(dto.getManagementFee());
        entity.setSggNm(dto.getSggNm());
        entity.setBjdongNm(dto.getBjdongNm());
        entity.setParkingSpaces(dto.getParkingSpaces());
        entity.setDescription(dto.getDescription());
        entity.setFloor(dto.getFloor());
        entity.setTotalFloor(dto.getTotalFloor());
        entity.setRoom(dto.getRoom());
        entity.setBathroom(dto.getBathroom());
        entity.setSupplyArea(dto.getSupplyArea());
        entity.setNetLeasableArea(dto.getNetLeasableArea());
        entity.setHouseType(dto.getHouseType());
        entity.setObjAmt(dto.getObjAmt());
        entity.setBldgNm(dto.getBldgNm());
//        entity.setImg(dto.getImg());
        return entity;
    }
}
