package pyp.house.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pyp.house.service.BuildingService;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    public final BuildingService buildingService;

    @GetMapping
    public String search(
            @RequestParam String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer price1,
            @RequestParam(required = false) Integer price2,
            @RequestParam(required = false) Integer size1,
            @RequestParam(required = false) Integer size2,
            Pageable pageable
            ){
        return buildingService.search(location, type, price1, price2, size1, size2, pageable);
    }
}
