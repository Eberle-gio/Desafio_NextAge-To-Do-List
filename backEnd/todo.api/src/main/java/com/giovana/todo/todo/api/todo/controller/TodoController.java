package com.giovana.todo.todo.api.todo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giovana.todo.todo.api.todo.model.Task;
import com.giovana.todo.todo.api.todo.repository.TaskRepository;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TaskRepository TaskRepository;

    public TodoController(TaskRepository TaskRepository) {
        this.TaskRepository = TaskRepository;
    }

    // GET - Listar todos
    @GetMapping
    public List<Task> getAllTodos() {
        return TaskRepository.findAll();
    }

    // POST - Criar novo
    @PostMapping
    public Task createTodo(@RequestBody Task task) {
        return TaskRepository.save(task);
    }

    // PUT - Atualizar
    @PutMapping("/{id}")
    public Task updateTodo(@PathVariable Long id, @RequestBody Task updatedTask) {
        return TaskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setCompleted(updatedTask.isCompleted());
                    task.setUpdatedAt(LocalDate.now());
                    if (updatedTask.isCompleted()) {
                        task.setCompletedAt(LocalDate.now());
                    } else {
                        task.setCompletedAt(null);
                    }
                    return TaskRepository.save(task);
                }).orElseThrow(() -> new RuntimeException("Task não encontrada"));
    }

    // DELETE - Remover
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        TaskRepository.deleteById(id);
    }
}