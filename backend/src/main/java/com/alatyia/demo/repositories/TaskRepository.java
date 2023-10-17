package com.alatyia.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alatyia.demo.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
}
