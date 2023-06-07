package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
