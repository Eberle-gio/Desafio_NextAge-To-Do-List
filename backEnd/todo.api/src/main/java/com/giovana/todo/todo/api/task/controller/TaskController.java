package com.giovana.todo.todo.api.task.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giovana.todo.todo.api.task.dto.TaskDTO;
import com.giovana.todo.todo.api.task.service.TaskService;
import com.giovana.todo.todo.api.users.model.User;
import com.giovana.todo.todo.api.users.service.UserService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public List<TaskDTO> getTodos(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskService.getTaskForUser(user);
    }

    @PostMapping
    public TaskDTO createTodo(@RequestBody TaskDTO taskDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskService.createTaskForUser(taskDTO, user);
    }

    @PutMapping("/{id}")
    public TaskDTO updateTodo(@PathVariable Long id,
            @RequestBody TaskDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskService.updateTask(id, dto, user);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        taskService.deleteTask(id, user);
    }
}