package io.tunisair.spring.tunisairapp.controller;

import io.tunisair.spring.tunisairapp.model.Flight;
import io.tunisair.spring.tunisairapp.model.Pilote;
import io.tunisair.spring.tunisairapp.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable UUID id) {
        Optional<Flight> flight = flightService.getFlightById(id);
        return flight.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        Flight createdFlight = flightService.saveFlight(flight);
        return new ResponseEntity<>(createdFlight, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable UUID id) {
        flightService.deleteFlight(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/update")
    public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight) {
        Optional<Flight> existingFlight = flightService.getFlightById(flight.getId());
        if (existingFlight.isPresent()) {
            Flight updatedFlight = existingFlight.get();
            updatedFlight.setSchedule(flight.getSchedule());
            updatedFlight.setDepartureCity(flight.getDepartureCity());
            updatedFlight.setDestinationCity(flight.getDestinationCity());
            updatedFlight.setType(flight.getType());
            updatedFlight.setPilot(flight.getPilot());
            updatedFlight.setCopilot(flight.getCopilot());
            updatedFlight.setStaffs(flight.getStaffs());
            updatedFlight.setCateringCompanies(flight.getCateringCompanies());

            Flight savedFlight = flightService.saveFlight(updatedFlight);
            return new ResponseEntity<>(savedFlight, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
