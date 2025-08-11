package com.giovana.todo.todo.api.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giovana.todo.todo.api.todo.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
