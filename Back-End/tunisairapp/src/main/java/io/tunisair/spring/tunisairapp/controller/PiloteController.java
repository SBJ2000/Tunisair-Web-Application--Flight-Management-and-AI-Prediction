package io.tunisair.spring.tunisairapp.controller;

import io.tunisair.spring.tunisairapp.model.Pilote;
import io.tunisair.spring.tunisairapp.service.PiloteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pilotes")
public class PiloteController {

    private final PiloteService piloteService;

    @Autowired
    public PiloteController(PiloteService piloteService) {
        this.piloteService = piloteService;
    }

    @PostMapping("/add")
    public ResponseEntity<Pilote> addPilote(@RequestBody Pilote pilote) {
        Pilote addedPilote = piloteService.addPilote(pilote);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPilote);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Pilote>> getAllPilotes() {
        List<Pilote> pilotes = piloteService.getAllPilotes();
        return ResponseEntity.ok(pilotes);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Pilote> getPiloteById(@PathVariable("id") UUID id) {
        Pilote pilote = piloteService.getPiloteById(id);
        return ResponseEntity.ok(pilote);
    }

    @PutMapping("/update")
    public ResponseEntity<Pilote> updatePilote(@RequestBody Pilote updatedPilote) {
        Pilote pilote = piloteService.updatePilote(updatedPilote);
        return new ResponseEntity<>(pilote, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePiloteById(@PathVariable("id") UUID id) {
        piloteService.deletePiloteById(id);
        return ResponseEntity.noContent().build();
    }
}
