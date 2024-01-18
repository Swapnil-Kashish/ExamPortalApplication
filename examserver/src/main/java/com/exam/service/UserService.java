package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    public User createUser(User user, Set<UserRole> userRoles) throws Exception;
    //GET User

    public User getUser(String username);

    //Delete User
    public void deleteUser(Long userId);

    //Update User

    public User updateUser(Long id, User updatedUser);

    List<User> getAll();
}
