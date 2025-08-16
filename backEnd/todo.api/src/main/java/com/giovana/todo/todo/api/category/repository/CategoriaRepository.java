package com.giovana.todo.todo.api.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giovana.todo.todo.api.category.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
