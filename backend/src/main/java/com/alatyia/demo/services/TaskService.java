package com.alatyia.demo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alatyia.demo.models.Response;
import com.alatyia.demo.models.Task;
import com.alatyia.demo.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;

    public ResponseEntity<Response> getAll() {
        try {
            return ResponseEntity.status(200).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .data(Map.of("tasks", taskRepository.findAll()))
                            .count(taskRepository.count())
                            .message("Tasks retrieved successfully")
                            .statusCode(200)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Something went wrong, Couldn't fetch data")
                            .statusCode(500)
                            .build());
        }
    }
    
    public ResponseEntity<Response> getOne(Long id) {
        Task task = taskRepository.findById(id).orElse(null);

        if (task == null) {
            return ResponseEntity.status(404).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Task Not Found")
                            .statusCode(404)
                            .build());
        }

        return ResponseEntity.status(200).body(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .data(Map.of("task", task))
                        .count(1L)
                        .message("Task retrieved successfully")
                        .statusCode(200)
                        .build());

    }
    
    public ResponseEntity<Response> create(Task task) {
            Task createdTask;
            task.setStatus("PENDING");
            try {
                    createdTask = taskRepository.save(task);
                    return ResponseEntity.status(201).body(
                                    Response.builder()
                                                    .timestamp(LocalDateTime.now())
                                                    .data(Map.of("task", createdTask))
                                                    .count(1L)
                                                    .message("Task added successfully")
                                                    .statusCode(201)
                                                    .build());
            } catch (Exception e) {
                    return ResponseEntity.status(500).body(
                                    Response.builder()
                                                    .timestamp(LocalDateTime.now())
                                                    .error("Something went wrong")
                                                    .statusCode(500)
                                                    .build());
            }
    }
    
    public ResponseEntity<Response> createMany(List<Task> tasks) {
        List<Task> createdTasks;

        tasks.forEach(task -> {
                task.setStatus("PENDING");
        });
        try {
            createdTasks = taskRepository.saveAll(tasks);
            return ResponseEntity.status(201).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .data(Map.of("tasks", createdTasks))
                            .count(1L)
                            .message("Task added successfully")
                            .statusCode(201)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Something went wrong, Couldn't fetch data")
                            .statusCode(500)
                            .build());
        }
    }
    
    public ResponseEntity<Response> update(Long id, String status) {
        Task taskRecord = taskRepository.findById(id).orElse(null);

        if (taskRecord == null) {
            return ResponseEntity.status(404).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Task Not Found")
                            .statusCode(404)
                            .build());
        }

        taskRecord.setId(id);
        taskRecord.setStatus(status);

        try {
            taskRecord = taskRepository.save(taskRecord);
            return ResponseEntity.status(201).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .data(Map.of("task", taskRecord))
                            .count(1L)
                            .message("Task updated successfully")
                            .statusCode(201)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Something went wrong, Couldn't fetch data")
                            .statusCode(500)
                            .build());
        }
    }

    public ResponseEntity<Response> delete(Long id) {
        Task taskRecord = taskRepository.findById(id).orElse(null);

        if (taskRecord == null) {
            return ResponseEntity.status(404).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Task Not Found")
                            .statusCode(404)
                            .build());
        }

        try {
            taskRepository.deleteById(id);
            return ResponseEntity.status(200).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .data(Map.of("task", taskRecord))
                            .count(1L)
                            .message("Task deleted successfully")
                            .statusCode(200)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Response.builder()
                            .timestamp(LocalDateTime.now())
                            .error("Something went wrong, Couldn't fetch data")
                            .statusCode(500)
                            .build());
        }
    }

}
