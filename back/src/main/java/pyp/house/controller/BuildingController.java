package pyp.house.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pyp.house.dto.BuildingDTO;
import pyp.house.service.BuildingService;

@RestController
@RequestMapping("/house")
@RequiredArgsConstructor
public class BuildingController {
    private final BuildingService buildingService;

    @PostMapping
    public final String BuildingRegister(@RequestBody BuildingDTO buildingDTO){
        return buildingService.save(buildingDTO);
    };

    @GetMapping("/{id}")
    public final String BuildingFind(@PathVariable String id){
        return  buildingService.find(id);
    }

    @PutMapping("/{id}")
    public final String BuildingEdit(@PathVariable String id, @RequestBody BuildingDTO buildingDTO, String userId){
        return buildingService.update(id, buildingDTO, userId);
    }

    @DeleteMapping("/{id}")
    public final String BuildingDel(@PathVariable String id){
        return buildingService.del(id);
    }
}
