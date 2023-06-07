package io.tunisair.spring.tunisairapp.controller;

import io.tunisair.spring.tunisairapp.model.AirlineCateringCompany;
import io.tunisair.spring.tunisairapp.service.AirlineCateringCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/companies")
public class AirlineCateringCompanyController {

    private final AirlineCateringCompanyService companyService;

    @Autowired
    public AirlineCateringCompanyController(AirlineCateringCompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/add")
    public ResponseEntity<AirlineCateringCompany> addCompany(@RequestBody AirlineCateringCompany company) {
        AirlineCateringCompany addedCompany = companyService.addCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCompany);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AirlineCateringCompany>> getAllCompanies() {
        List<AirlineCateringCompany> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<AirlineCateringCompany> getCompanyById(@PathVariable("id") UUID id) {
        AirlineCateringCompany company = companyService.getCompanyById(id);

        if (company != null) {
            return ResponseEntity.ok(company);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<AirlineCateringCompany> updateCompany(@RequestBody AirlineCateringCompany updatedCompany) {
        AirlineCateringCompany company = companyService.updateCompany(updatedCompany);

        if (company != null) {
            return new ResponseEntity<>(company, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompanyById(@PathVariable("id") UUID id) {
        companyService.deleteCompanyById(id);
        return ResponseEntity.noContent().build();
    }
}
