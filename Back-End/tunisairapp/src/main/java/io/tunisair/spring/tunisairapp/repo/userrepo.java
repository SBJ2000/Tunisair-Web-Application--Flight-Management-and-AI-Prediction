package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface userrepo extends JpaRepository<users, UUID> {

    users findByEmail(String email);
    users findByName(String name);
}

