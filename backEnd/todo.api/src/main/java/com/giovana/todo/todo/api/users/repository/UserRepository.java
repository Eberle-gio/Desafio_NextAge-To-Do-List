package com.giovana.todo.todo.api.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giovana.todo.todo.api.users.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
