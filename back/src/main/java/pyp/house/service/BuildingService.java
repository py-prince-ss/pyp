package pyp.house.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pyp.house.dto.BuildingDTO;
import pyp.house.entity.BuildingEntity;
import pyp.house.repository.BuildingRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public String save(BuildingDTO buildingDTO){
        // 1.레포지토리의 save함수를 호출한다.
        // 2.save 메소드에는 엔티티 객체를 넘겨줘야 한다. Dto에서 Entity로 전환해야 함.
        // 3. save 성공시 success 리턴
        // 4. 실패시 fail 리턴 로직 짜야함.
        // 5. 이메일이랑은 다르게 같은 매물이라도 등록할 수 있겠지. 호수가 다르거나 할테니.
        JSONObject buildingJson = new JSONObject();
        BuildingEntity buildingEntity = BuildingEntity.toBuildingEntity(buildingDTO);
        try {
            BuildingEntity savedBuildingEntity = buildingRepository.save(buildingEntity);
            buildingJson.put("success", true);
            buildingJson.put("id", savedBuildingEntity.getId());
        } catch (Exception e){
            buildingJson.put("success", false);
            buildingJson.put("msg", e);
        }
        return buildingJson.toString();
    }

    public String find(String id){
        JSONObject buildingJson = new JSONObject();
        Optional<BuildingEntity> byBuildingID = buildingRepository.findById(Long.valueOf(id));
        if (byBuildingID.isPresent()){
            BuildingEntity buildingEntity = byBuildingID.get();
            BuildingDTO buildingDTO = BuildingDTO.toBuildingDTO(buildingEntity);
            buildingJson.put("success", true);
            buildingJson.put("house", buildingDTO);
            buildingJson.put("price", 10000);
        } else {
            buildingJson.put("success", false);
            buildingJson.put("msg", "서버에러");
        }
        return buildingJson.toString();
    }

    public String update(String id, BuildingDTO buildingDTO) {
        JSONObject buildingJson = new JSONObject();
        Optional<BuildingEntity> byBuildingID = buildingRepository.findById(Long.valueOf(id));
        if (byBuildingID.isPresent()){
            BuildingEntity savedBuildingEntity = byBuildingID.get();
            if (savedBuildingEntity.getUserId().equals(buildingDTO.getUserId())) {
                BuildingEntity buildingEntity = BuildingEntity.toBuildingEntity(buildingDTO);
                BuildingEntity updatedBuildingEntity = buildingRepository.save(buildingEntity);
                buildingJson.put("success", true);
                buildingJson.put("id", updatedBuildingEntity.getId());
            } else {
                buildingJson.put("success", false);
                buildingJson.put("msg", "화원정보가 일치하지 않습니다.");
                return buildingJson.toString();
            }
        } else {
            buildingJson.put("success", false);
            buildingJson.put("msg", "매물이 존재하지 않습니다.");
        }
        return buildingJson.toString();
    }

    public String del(String id){
        JSONObject buildingJson = new JSONObject();
        Optional<BuildingEntity> byBuildingID = buildingRepository.findById(Long.valueOf(id));
        if (byBuildingID.isPresent()){
            buildingRepository.deleteById(Long.valueOf(id));
            buildingJson.put("success", true);
        } else {
            buildingJson.put("success", false);
            buildingJson.put("msg", "매물이 존재하지 않습니다.");
        }
        return buildingJson.toString();
    }

    public String search(String location,
                         String type,
                         Integer price1,
                         Integer price2,
                         Integer size1,
                         Integer size2,
                         Pageable pageable){
        JSONObject buildingJson = new JSONObject();
        Page<BuildingEntity> buildingsPage = buildingRepository.findByCriteria(location,
                type,
                price1,
                price2,
                size1,
                size2,
                pageable);
        if (buildingsPage.isEmpty()){
            buildingJson.put("success", false);
            buildingJson.put("msg", "조건에 일치하는 매물이 없습니다.");
            return buildingJson.toString();
        } else {
            buildingJson.put("success", true);
            buildingJson.put("Array", buildingsPage.map(BuildingDTO::toBuildingDTO));
            return buildingJson.toString();
        }
    }
}