package com.giovana.todo.todo.api.task.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.giovana.todo.todo.api.category.model.Categoria;
import com.giovana.todo.todo.api.users.model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, name = "Title")
    private String title;

    @Column(length = 500, nullable = true, name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "categoria_Id", nullable = false)
    private Categoria categoria;

    @Column(nullable = false, name = "completed")
    private boolean completed;

    @Column(nullable = false, updatable = false, name = "creation date")
    private LocalDate createdAt;

    @Column(nullable = true, name = "update date")
    private LocalDate updatedAt;

    @Column(nullable = true, name = "completed date")
    private LocalDate completedAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false, updatable = true, name = "expiry date")
    private LocalDate expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    @PrePersist
    protected void createTask() {
        this.createdAt = LocalDate.now();
    }

    @PreUpdate
    protected void updateTask() {
        this.updatedAt = LocalDate.now();

        // Define a data de conclusão se foi marcado como concluído e ainda não tinha
        // data
        if (this.completed && this.completedAt == null) {
            this.completedAt = LocalDate.now();
        }

        // Limpa a data se o usuário desmarcar a conclusão
        if (!this.completed) {
            this.completedAt = null;
        }
    }

    public Task() {

    }

    public Task(String title, String description, boolean completed, Categoria categoria) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.categoria = categoria;
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

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDate getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDate completedAt) {
        this.completedAt = completedAt;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
