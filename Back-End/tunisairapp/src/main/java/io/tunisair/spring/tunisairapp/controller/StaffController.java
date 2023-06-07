package io.tunisair.spring.tunisairapp.controller;

import io.tunisair.spring.tunisairapp.model.Staff;
import io.tunisair.spring.tunisairapp.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/staffs")
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/add")
    public ResponseEntity<Staff> addStaff(@RequestBody Staff staff) {
        Staff addedStaff = staffService.addStaff(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedStaff);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Staff>> getAllStaffs() {
        List<Staff> staffs = staffService.getAllStaff();
        return ResponseEntity.ok(staffs);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable("id") UUID id) {
        Staff staff = staffService.getStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("/update")
    public ResponseEntity<Staff> updateStaff(@RequestBody Staff updatedStaff) {
        Staff staff = staffService.updateStaff(updatedStaff);
        return new ResponseEntity<>(staff, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStaffById(@PathVariable("id") UUID id) {
        staffService.deleteStaffById(id);
        return ResponseEntity.noContent().build();
    }

}
