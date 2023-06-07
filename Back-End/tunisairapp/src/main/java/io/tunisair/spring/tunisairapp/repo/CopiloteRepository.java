package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.Copilote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface CopiloteRepository extends JpaRepository<Copilote, Long> {
    Copilote findById(UUID id);
}



