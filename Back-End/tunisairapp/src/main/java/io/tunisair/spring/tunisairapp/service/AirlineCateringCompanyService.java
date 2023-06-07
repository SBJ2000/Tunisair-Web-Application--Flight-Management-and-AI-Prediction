package io.tunisair.spring.tunisairapp.service;

import io.tunisair.spring.tunisairapp.model.AirlineCateringCompany;
import io.tunisair.spring.tunisairapp.repo.AirlineCateringCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AirlineCateringCompanyService {

    private final AirlineCateringCompanyRepository companyRepository;

    @Autowired
    public AirlineCateringCompanyService(AirlineCateringCompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public AirlineCateringCompany addCompany(AirlineCateringCompany company) {
        return companyRepository.save(company);
    }

    public List<AirlineCateringCompany> getAllCompanies() {
        return companyRepository.findAll();
    }

    public AirlineCateringCompany getCompanyById(UUID id) {
        return companyRepository.findById(id).orElse(null);
    }

    public AirlineCateringCompany updateCompany(AirlineCateringCompany updatedCompany) {
        AirlineCateringCompany existingCompany = companyRepository.findById(updatedCompany.getId()).orElse(null);

        if (existingCompany != null) {
            existingCompany.setName(updatedCompany.getName());
            existingCompany.setCountry(updatedCompany.getCountry());
            existingCompany.setPrice(updatedCompany.getPrice());
            existingCompany.setMenu(updatedCompany.getMenu());

            return companyRepository.save(existingCompany);
        }

        return null;
    }

    public void deleteCompanyById(UUID id) {
        companyRepository.deleteById(id);
    }
}
