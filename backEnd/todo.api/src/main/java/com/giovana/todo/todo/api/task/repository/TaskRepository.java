package com.giovana.todo.todo.api.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giovana.todo.todo.api.task.model.Task;
import com.giovana.todo.todo.api.users.model.User;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
