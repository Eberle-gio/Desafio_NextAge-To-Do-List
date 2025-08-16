package com.giovana.todo.todo.api.task.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.giovana.todo.todo.api.category.repository.CategoriaRepository;
import com.giovana.todo.todo.api.task.dto.TaskDTO;
import com.giovana.todo.todo.api.task.model.Task;
import com.giovana.todo.todo.api.task.repository.TaskRepository;

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

    public TaskDTO createTask(TaskDTO dto) {
        var categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        Task task = TaskConverter.toEntity(dto, categoria);
        Task savedTask = taskRepository.save(task);
        return TaskConverter.toDTO(savedTask);
    }

    public TaskDTO updateTask(Long id, TaskDTO dto) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(dto.getTitle());
                    task.setDescription(dto.getDescription());
                    task.setCompleted(dto.isCompleted());
                    task.setUpdatedAt(LocalDate.now());

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
                }).orElseThrow(() -> new RuntimeException("Task não encontrada"));
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task não encontrada");
        }
        taskRepository.deleteById(id);
    }
}
