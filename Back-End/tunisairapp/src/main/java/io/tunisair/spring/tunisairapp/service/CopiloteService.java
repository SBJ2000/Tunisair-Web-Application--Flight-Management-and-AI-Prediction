package io.tunisair.spring.tunisairapp.service;

import io.tunisair.spring.tunisairapp.model.Copilote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.tunisair.spring.tunisairapp.repo.CopiloteRepository;

import java.util.List;
import java.util.UUID;



@Service
public class CopiloteService {

    private final CopiloteRepository copiloteRepository;

    @Autowired
    public CopiloteService(CopiloteRepository copiloteRepository) {
        this.copiloteRepository = copiloteRepository;
    }

    public Copilote addCopilote(Copilote copilote) {
        return copiloteRepository.save(copilote);
    }

    public List<Copilote> getAllCopilotes() {
        return copiloteRepository.findAll();
    }

    public Copilote getCopiloteById(UUID id) {
        return copiloteRepository.findById(id);
    }

    public Copilote updateCopilote(Copilote updatedCopilote) {
        Copilote existingCopilote = copiloteRepository.findById(updatedCopilote.getId());

        existingCopilote.setName(updatedCopilote.getName());
        existingCopilote.setFamilyName(updatedCopilote.getFamilyName());
        existingCopilote.setEmail(updatedCopilote.getEmail());
        existingCopilote.setPassword(updatedCopilote.getPassword());
        existingCopilote.setDateOfBirth(updatedCopilote.getDateOfBirth());
        existingCopilote.setPhone(updatedCopilote.getPhone());
        existingCopilote.setGender(updatedCopilote.getGender());

        return copiloteRepository.save(existingCopilote);
    }



    public void deleteCopiloteById(UUID id) {
        Copilote pilote = getCopiloteById(id); // Vérifie si le pilote existe
        copiloteRepository.delete(pilote);
    }
}
