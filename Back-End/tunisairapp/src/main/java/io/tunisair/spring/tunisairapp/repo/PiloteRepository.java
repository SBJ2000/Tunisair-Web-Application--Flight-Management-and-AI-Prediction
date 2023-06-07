package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.Pilote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface PiloteRepository extends JpaRepository<Pilote, Long> {
    Pilote findById(UUID id);
}



