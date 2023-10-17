package com.alatyia.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alatyia.demo.models.Response;
import com.alatyia.demo.models.Task;
import com.alatyia.demo.services.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    
    private final TaskService taskService;

    @GetMapping("")
    public ResponseEntity<Response> getAll() {
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getOne(@PathVariable("id") Long id) {
        return taskService.getOne(id);
    }

    @PostMapping("")
    public ResponseEntity<Response> create(@RequestBody() Task task) {
        return taskService.create(task);
    }
    @PostMapping("/upload")
    public ResponseEntity<Response> createMany(@RequestBody() List<Task> tasks) {
        return taskService.createMany(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response> update(@PathVariable("id") Long id, @RequestBody() String status) {
        return taskService.update(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
        return taskService.delete(id);
    }
    
}
