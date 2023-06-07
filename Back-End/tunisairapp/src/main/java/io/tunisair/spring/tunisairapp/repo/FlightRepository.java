package io.tunisair.spring.tunisairapp.repo;

import io.tunisair.spring.tunisairapp.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FlightRepository extends JpaRepository<Flight, UUID> {
}
