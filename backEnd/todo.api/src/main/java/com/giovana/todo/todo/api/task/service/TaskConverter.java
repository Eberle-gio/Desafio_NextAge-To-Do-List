package com.giovana.todo.todo.api.task.service;

import com.giovana.todo.todo.api.category.model.Categoria;
import com.giovana.todo.todo.api.task.dto.TaskDTO;
import com.giovana.todo.todo.api.task.model.Task;

public class TaskConverter {
    // Converte Task -> TaskDTO
    public static TaskDTO toDTO(Task task) {
        if (task == null)
            return null;

        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getCompletedAt(),
                task.getCategoria() != null ? task.getCategoria().getId() : null,
                task.getCategoria() != null ? task.getCategoria().getNome() : null,
                task.getExpiryDate());
    }

    // Converte TaskDTO -> Task, recebendo a categoria correspondente
    public static Task toEntity(TaskDTO dto, Categoria categoria) {
        if (dto == null)
            return null;

        Task task = new Task();
        task.setId(dto.getId());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setCompleted(dto.isCompleted());
        task.setCreatedAt(dto.getCreatedAt());
        task.setExpiryDate(dto.getExpiryDate());
        task.setUpdatedAt(dto.getUpdatedAt());
        task.setCompletedAt(dto.getCompletedAt());
        task.setCategoria(categoria);

        return task;
    }
}
