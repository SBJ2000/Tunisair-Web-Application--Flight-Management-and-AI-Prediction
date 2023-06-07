package io.tunisair.spring.tunisairapp.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "flights")
public class Flight implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    private Date schedule;

    @Column(name = "departure_city")
    private String departureCity;

    @Column(name = "destination_city")
    private String destinationCity;

    @Enumerated(EnumType.STRING)
    private FlightType type;

    @ManyToOne
    @JoinColumn(name = "pilot_id")
    private Pilote pilot;

    @ManyToOne
    @JoinColumn(name = "copilot_id")
    private Copilote copilot;

    @ManyToMany
    @JoinTable(
            name = "flight_staffs",
            joinColumns = @JoinColumn(name = "flight_id"),
            inverseJoinColumns = @JoinColumn(name = "staff_id")
    )
    private List<Staff> staffs;

    @ManyToMany
    @JoinTable(
            name = "flight_catering_companies",
            joinColumns = @JoinColumn(name = "flight_id"),
            inverseJoinColumns = @JoinColumn(name = "catering_company_id")
    )
    private List<AirlineCateringCompany> cateringCompanies;

    public Flight() {
    }

    public Flight(UUID id, Date schedule, String departureCity, String destinationCity, FlightType type,
                  Pilote pilot, Copilote copilot, List<Staff> staffs, List<AirlineCateringCompany> cateringCompanies) {
        this.id = id;
        this.schedule = schedule;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.type = type;
        this.pilot = pilot;
        this.copilot = copilot;
        this.staffs = staffs;
        this.cateringCompanies = cateringCompanies;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getSchedule() {
        return schedule;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public FlightType getType() {
        return type;
    }

    public void setType(FlightType type) {
        this.type = type;
    }

    public Pilote getPilot() {
        return pilot;
    }

    public void setPilot(Pilote pilot) {
        this.pilot = pilot;
    }

    public Copilote getCopilot() {
        return copilot;
    }

    public void setCopilot(Copilote copilot) {
        this.copilot = copilot;
    }

    public List<Staff> getStaffs() {
        return staffs;
    }

    public void setStaffs(List<Staff> staffs) {
        this.staffs = staffs;
    }

    public List<AirlineCateringCompany> getCateringCompanies() {
        return cateringCompanies;
    }

    public void setCateringCompanies(List<AirlineCateringCompany> cateringCompanies) {
        this.cateringCompanies = cateringCompanies;
    }
// Getters and setters
}

enum FlightType {
    DIRECT,
    TRANSIT,
    MARCHANDISE
}

