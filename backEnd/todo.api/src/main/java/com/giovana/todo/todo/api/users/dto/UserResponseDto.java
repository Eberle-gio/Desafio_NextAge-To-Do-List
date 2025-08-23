package com.giovana.todo.todo.api.users.dto;

import com.giovana.todo.todo.api.users.model.User;

public record UserResponseDto(Long id, String nome, String email) {
    public static UserResponseDto fromEntity(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }
}
