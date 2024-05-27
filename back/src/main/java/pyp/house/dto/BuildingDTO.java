package pyp.house.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import pyp.house.entity.BuildingEntity;

@Getter
@Setter
public class BuildingDTO {
    private Long id;
    private Long userId;
    private String direction;
    private String entranceStructure;
    private String numberOfHouseholds;
    private String address;
    private String addressRoad;
    private String managementFee;
    private String sggNm;
    private String bjdongNm;
    private String parkingSpaces;
    private String description;
    private String floor;
    private String totalFloor;
    private String room;
    private String bathroom;
    private Double supplyArea;
    private Double netLeasableArea;
    private String houseType;
    private Integer objAmt;
    private String bldgNm;
//    private String img;

    // Entity to DTO
    public static BuildingDTO toBuildingDTO(BuildingEntity buildingEntity) {
        BuildingDTO dto = new BuildingDTO();
        dto.setId(buildingEntity.getId());
        dto.setUserId(buildingEntity.getUserId());
        dto.setDirection(buildingEntity.getDirection());
        dto.setEntranceStructure(buildingEntity.getEntranceStructure());
        dto.setNumberOfHouseholds(buildingEntity.getNumberOfHouseholds());
        dto.setAddress(buildingEntity.getAddress());
        dto.setAddressRoad(buildingEntity.getAddressRoad());
        dto.setManagementFee(buildingEntity.getManagementFee());
        dto.setSggNm(buildingEntity.getSggNm());
        dto.setBjdongNm(buildingEntity.getBjdongNm());
        dto.setParkingSpaces(buildingEntity.getParkingSpaces());
        dto.setDescription(buildingEntity.getDescription());
        dto.setFloor(buildingEntity.getFloor());
        dto.setTotalFloor(buildingEntity.getTotalFloor());
        dto.setRoom(buildingEntity.getRoom());
        dto.setBathroom(buildingEntity.getBathroom());
        dto.setSupplyArea(buildingEntity.getSupplyArea());
        dto.setNetLeasableArea(buildingEntity.getNetLeasableArea());
        dto.setHouseType(buildingEntity.getHouseType());
        dto.setObjAmt(buildingEntity.getObjAmt());
        dto.setBldgNm(buildingEntity.getBldgNm());
//        dto.setImg(buildingEntity.getImg());
        return dto;
    }
}
