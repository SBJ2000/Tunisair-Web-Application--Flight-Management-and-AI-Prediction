package io.tunisair.spring.tunisairapp.service;

import io.tunisair.spring.tunisairapp.model.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.tunisair.spring.tunisairapp.repo.StaffRepository;

import java.util.List;
import java.util.UUID;



@Service
public class StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(UUID id) {
        return staffRepository.findById(id);
    }

    public Staff updateStaff(Staff updatedStaff) {
        Staff existingStaff = staffRepository.findById(updatedStaff.getId());

        existingStaff.setName(updatedStaff.getName());
        existingStaff.setFamilyName(updatedStaff.getFamilyName());
        existingStaff.setEmail(updatedStaff.getEmail());
        existingStaff.setPassword(updatedStaff.getPassword());
        existingStaff.setDateOfBirth(updatedStaff.getDateOfBirth());
        existingStaff.setPhone(updatedStaff.getPhone());
        existingStaff.setrole(updatedStaff.getrole());

        return staffRepository.save(existingStaff);
    }



    public void deleteStaffById(UUID id) {
        Staff staff = getStaffById(id); // Vérifie si le staff existe
        staffRepository.delete(staff);
    }
}
