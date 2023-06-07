package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Staff findById(UUID id);
}



