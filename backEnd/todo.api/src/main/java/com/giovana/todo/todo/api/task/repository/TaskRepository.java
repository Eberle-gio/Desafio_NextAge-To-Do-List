package com.giovana.todo.todo.api.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giovana.todo.todo.api.task.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
