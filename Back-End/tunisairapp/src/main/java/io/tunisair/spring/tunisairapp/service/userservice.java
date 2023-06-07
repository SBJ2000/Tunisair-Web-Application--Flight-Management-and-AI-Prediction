package io.tunisair.spring.tunisairapp.service;

import io.tunisair.spring.tunisairapp.exception.usernotfoundexception;
import io.tunisair.spring.tunisairapp.model.Role;
import io.tunisair.spring.tunisairapp.model.users;
import io.tunisair.spring.tunisairapp.repo.RoleRepository;
import io.tunisair.spring.tunisairapp.repo.userrepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class userservice implements UserDetailsService {
    private final userrepo userrepo;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        users user = userrepo.findByName(username);
        if(user== null){
            log.error("We didn't find the user ");
            throw new usernotfoundexception("We didn't find the user");
        }
        else
        {
            log.info("We find the user:{} ",username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->
        {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getName(),user.getCode(),authorities);
    }
    public users adduser(users user)
    {
        user.setId(UUID.randomUUID().toString());
        user.setCode(passwordEncoder.encode(user.getCode()));
        return userrepo.save(user);

    }
    public List<users> findallusers()
    {
        return userrepo.findAll();
    }
    public users updateuser(users updateduser) {
        users existingUser = userrepo.findById(updateduser.getId())
                .orElseThrow(() -> new usernotfoundexception("User with ID " + updateduser.getId() + " was not found"));

        existingUser.setName(updateduser.getName());
        existingUser.setEmail(updateduser.getEmail());
        existingUser.setCode(updateduser.getCode());
        existingUser.setJobtitle(updateduser.getJobtitle());

        return userrepo.save(existingUser);
    }
    public Role saveRole(Role role){
        return roleRepository.save(role);
    }
    public void addRoleToUser(String username,String rolename){
        Role role= roleRepository.findByName(rolename);
        users user =userrepo.findByName(username);
        // Afficher le nom de l'utilisateur et du rôle
        System.out.println("Utilisateur : " + user.getName());
        System.out.println("Rôle : " + role.getName());
        user.getRoles().add(role);
    }
    public void deleteuser(UUID id)
    {
    userrepo.deleteById(id);
    }
    public users finduserById(UUID id) {
        return userrepo.findById(id)
                .orElseThrow(() -> new usernotfoundexception("User with ID " + id + " was not found"));
    }
    public users signIn(String email, String code) {
        users user = userrepo.findByEmail(email);
        if (user != null) {
            // Compare the provided code directly with the user's stored code
            if (code.equals(user.getCode())) {
                return user;
            }
        }
        return null;
    }


    public users getuser(String username) {
        return userrepo.findByName(username);
    }

}
