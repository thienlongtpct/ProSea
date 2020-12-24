package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.User;

import java.util.Set;

public interface UserRepository extends BaseUserRepository<User> {
    Set<User> findUserByUsernameStartingWith(String username);
}