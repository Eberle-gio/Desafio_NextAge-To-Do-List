package com.giovana.todo.todo.api.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giovana.todo.todo.api.users.dto.UserDto;
import com.giovana.todo.todo.api.users.dto.UserResponseDto;
import com.giovana.todo.todo.api.users.model.User;
import com.giovana.todo.todo.api.users.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserDto dto) {
        User user = userService.register(dto);
        return ResponseEntity.ok(UserResponseDto.fromEntity(user));
    }
}