package io.tunisair.spring.tunisairapp.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "airline_catering_companies")
public class AirlineCateringCompany implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    private String name;
    private String country;
    private int price;

    @ElementCollection
    private List<String> menu;

    public AirlineCateringCompany() {
    }

    public AirlineCateringCompany(UUID id, String name, String country, int price, List<String> menu) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.price = price;
        this.menu = menu;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        if (id != null && !id.equals(UUID.fromString("00000000-0000-0000-0000-000000000000"))) {

            this.id = id;}
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public List<String> getMenu() {
        return menu;
    }

    public void setMenu(List<String> menu) {
        this.menu = menu;
    }
}

