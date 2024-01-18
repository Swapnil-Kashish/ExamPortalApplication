package com.exam.service.implementation;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
@Service
public class UserServiceImplem implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    //------Creating User-------
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local= this.userRepository.findByUsername(user.getUsername());
        if(local!=null)
        {
            System.out.println("User already Exists, Please Log in");
            throw new Exception("User Already Present");
        }
        else {
            // Creating User
            for(UserRole ur:userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local= this.userRepository.save(user);
        }

        return local;
    }
    //getting User by Username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        return this.userRepository.save(updatedUser);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

}
