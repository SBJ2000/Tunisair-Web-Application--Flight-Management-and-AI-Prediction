package io.tunisair.spring.tunisairapp.model;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import static javax.persistence.FetchType.EAGER;

@Entity
@Table(name = "users") @NoArgsConstructor
public class users implements Serializable {
    @Id
    @GeneratedValue( generator = "uuid2" )
    @GenericGenerator( name = "uuid2", strategy = "uuid2" )
    @Column( name = "id", columnDefinition = "BINARY(16)" )
    private UUID id;
    private String name;
    private String email;
    @Column(nullable = false)
    private String code;
    private String jobtitle;
    @ManyToMany(fetch = EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public users(UUID id, String name, String email, String code, String jobtitle, Collection<Role> roles) {
        this.name = name;
        this.email = email;
        this.code = code;
        this.jobtitle = jobtitle;
        this.roles = roles;
    }

    public Collection<Role> getRoles() {return roles;}

    public void setRoles(Collection<Role> roles) {this.roles = roles;}

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCode() {
        return code;
    }

    public String getJobtitle() {
        return jobtitle;
    }

    public UUID getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setJobtitle(String jobtitle) {
        this.jobtitle = jobtitle;
    }

    public void setId(String id) {
        this.id = UUID.fromString(id);
    }

    @Override
    public String toString() {
        return "users{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", code='" + code + '\'' +
                ", jobtitle='" + jobtitle + '\'' +
                ", id=" + id +
                '}';
    }
}
