package io.tunisair.spring.tunisairapp.service;

import io.tunisair.spring.tunisairapp.model.Pilote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.tunisair.spring.tunisairapp.repo.PiloteRepository;

import java.util.List;
import java.util.UUID;



@Service
public class PiloteService {

    private final PiloteRepository piloteRepository;

    @Autowired
    public PiloteService(PiloteRepository piloteRepository) {
        this.piloteRepository = piloteRepository;
    }

    public Pilote addPilote(Pilote pilote) {
        return piloteRepository.save(pilote);
    }

    public List<Pilote> getAllPilotes() {
        return piloteRepository.findAll();
    }

    public Pilote getPiloteById(UUID id) {
        return piloteRepository.findById(id);
    }

    public Pilote updatePilote(Pilote updatedPilote) {
        Pilote existingPilote = piloteRepository.findById(updatedPilote.getId());

        existingPilote.setName(updatedPilote.getName());
        existingPilote.setFamilyName(updatedPilote.getFamilyName());
        existingPilote.setEmail(updatedPilote.getEmail());
        existingPilote.setPassword(updatedPilote.getPassword());
        existingPilote.setDateOfBirth(updatedPilote.getDateOfBirth());
        existingPilote.setPhone(updatedPilote.getPhone());
        existingPilote.setGender(updatedPilote.getGender());

        return piloteRepository.save(existingPilote);
    }



    public void deletePiloteById(UUID id) {
        Pilote pilote = getPiloteById(id); // Vérifie si le pilote existe
        piloteRepository.delete(pilote);
    }
}
