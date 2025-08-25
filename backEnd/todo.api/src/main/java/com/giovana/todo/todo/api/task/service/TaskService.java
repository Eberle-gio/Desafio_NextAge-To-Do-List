package com.giovana.todo.todo.api.task.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.giovana.todo.todo.api.category.model.Categoria;
import com.giovana.todo.todo.api.category.repository.CategoriaRepository;
import com.giovana.todo.todo.api.task.dto.TaskDTO;
import com.giovana.todo.todo.api.task.model.Task;
import com.giovana.todo.todo.api.task.repository.TaskRepository;
import com.giovana.todo.todo.api.users.model.User;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoriaRepository categoriaRepository;

    public TaskService(TaskRepository taskRepository, CategoriaRepository categoriaRepository) {
        this.taskRepository = taskRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskConverter::toDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTaskForUser(User user) {
        return taskRepository.findByUser(user).stream().map(TaskConverter::toDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO createTaskForUser(TaskDTO dto, User user) {
        Categoria categoria = null;
        if (dto.getCategoriaId() != null) {
            categoria = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        }
        Task task = TaskConverter.toEntity(dto, categoria, user);
        task.setCreatedAt(LocalDate.now());
        task.setUpdatedAt(null);
        Task savedTask = taskRepository.save(task);
        return TaskConverter.toDTO(savedTask);
    }

    public TaskDTO updateTask(Long id, TaskDTO dto, User user) {
        return taskRepository.findById(id)
                .map(task -> {
                    if (!task.getUser().getId().equals(user.getId())) {
                        throw new RuntimeException("Não autorizado");
                    }
                    task.setTitle(dto.getTitle());
                    task.setDescription(dto.getDescription());
                    task.setCompleted(dto.isCompleted());
                    task.setUpdatedAt(LocalDate.now());
                    task.setExpiryDate(dto.getExpiryDate());

                    if (dto.getCategoriaId() != null) {
                        var categoria = categoriaRepository.findById(dto.getCategoriaId())
                                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
                        task.setCategoria(categoria);
                    }

                    if (dto.isCompleted()) {
                        task.setCompletedAt(LocalDate.now());
                    } else {
                        task.setCompletedAt(null);
                    }

                    return TaskConverter.toDTO(taskRepository.save(task));
                }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public void deleteTask(Long id, User user) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Não autorizado");
        }
        taskRepository.deleteById(id);
    }
}
