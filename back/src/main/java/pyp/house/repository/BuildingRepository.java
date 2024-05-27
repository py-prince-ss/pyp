package pyp.house.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pyp.house.entity.BuildingEntity;

import java.util.Optional;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Long> {
    Optional<BuildingEntity> findById(Long id);
}
