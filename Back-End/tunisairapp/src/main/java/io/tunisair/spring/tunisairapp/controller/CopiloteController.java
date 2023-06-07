package io.tunisair.spring.tunisairapp.controller;

import io.tunisair.spring.tunisairapp.model.Copilote;
import io.tunisair.spring.tunisairapp.service.CopiloteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/copilotes")
public class CopiloteController {

    private final CopiloteService copiloteService;

    @Autowired
    public CopiloteController(CopiloteService copiloteService) {
        this.copiloteService = copiloteService;
    }

    @PostMapping("/add")
    public ResponseEntity<Copilote> addCopilote(@RequestBody Copilote copilote) {
        Copilote addedCopilote = copiloteService.addCopilote(copilote);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCopilote);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Copilote>> getAllCopilotes() {
        List<Copilote> copilotes = copiloteService.getAllCopilotes();
        return ResponseEntity.ok(copilotes);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Copilote> getCopiloteById(@PathVariable("id") UUID id) {
        Copilote copilote = copiloteService.getCopiloteById(id);
        return ResponseEntity.ok(copilote);
    }

    @PutMapping("/update")
    public ResponseEntity<Copilote> updateCopilote(@RequestBody Copilote updatedCopilote) {
        Copilote copilote = copiloteService.updateCopilote(updatedCopilote);
        return new ResponseEntity<>(copilote, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCopiloteById(@PathVariable("id") UUID id) {
        copiloteService.deleteCopiloteById(id);
        return ResponseEntity.noContent().build();
    }
}
