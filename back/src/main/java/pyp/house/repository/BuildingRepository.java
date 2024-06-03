package pyp.house.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pyp.house.entity.BuildingEntity;

import java.util.Optional;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Long> {
    Optional<BuildingEntity> findById(Long id);

    @Query("SELECT b FROM BuildingEntity b WHERE " +
            "(:location IS NULL OR b.address LIKE %:location%) AND " +
            "(:type IS NULL OR b.houseType = :type) AND " +
            "(:price1 IS NULL OR b.price >= :price1) AND " +
            "(:price2 IS NULL OR b.price <= :price2) AND " +
            "(:size1 IS NULL OR b.supplyArea >= :size1) AND " +
            "(:size2 IS NULL OR b.supplyArea <= :size2)")
    Page<BuildingEntity> findByCriteria(@Param("location") String location,
                                  @Param("type") String type,
                                  @Param("price1") Integer price1,
                                  @Param("price2") Integer price2,
                                  @Param("size1") Integer size1,
                                  @Param("size2") Integer size2,
                                  Pageable pageable);
}
