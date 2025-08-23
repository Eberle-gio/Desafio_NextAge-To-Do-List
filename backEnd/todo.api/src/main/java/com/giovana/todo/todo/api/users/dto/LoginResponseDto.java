package com.giovana.todo.todo.api.users.dto;

import com.giovana.todo.todo.api.users.model.User;

public record LoginResponseDto(Long id, String email) {

    public static LoginResponseDto fromUser(User user) {
        return new LoginResponseDto(user.getId(), user.getEmail());
    }
}
