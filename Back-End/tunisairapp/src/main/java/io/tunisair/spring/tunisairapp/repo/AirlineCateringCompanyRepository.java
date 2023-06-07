package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.AirlineCateringCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AirlineCateringCompanyRepository extends JpaRepository<AirlineCateringCompany, UUID> {
}

