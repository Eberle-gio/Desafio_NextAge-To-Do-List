package com.giovana.todo.todo.api.todo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true, name = "Title")
    private String title;

    @Column(length = 500, nullable = true, unique = true, name = "description")
    private String description;

    @Column(nullable = false, name = "completed")
    private boolean completed;

    @Column(nullable = false, updatable = false, name = "creation date")
    private LocalDateTime createdAt;

    @Column(nullable = true, name = "update date")
    private LocalDateTime updatedAt;

    @Column(nullable = true, name = "completed date")
    private LocalDateTime completedAt;

    @PrePersist
    protected void createTask() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void updateTask() {
        this.updatedAt = LocalDateTime.now();

        // Define a data de conclusão se foi marcado como concluído e ainda não tinha
        // data
        if (this.completed && this.completedAt == null) {
            this.completedAt = LocalDateTime.now();
        }

        // Limpa a data se o usuário desmarcar a conclusão
        if (!this.completed) {
            this.completedAt = null;
        }
    }

    public Task() {

    }

    public Task(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

}
