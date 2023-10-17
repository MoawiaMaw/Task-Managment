package com.alatyia.demo.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tasks")
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    @NotNull
    @NotEmpty
    @NotBlank
    @Size(min = 3, max = 10)
    private String title;
    
    @Column(name = "description")
    @NotNull
    @NotEmpty
    @NotBlank
    @Size(min = 3)
    private String description;
    
    @Column(name = "status")
    @NotNull
    @NotEmpty
    @NotBlank
    private String status;

    
    
    public Task() {
    }

    

    public Task(long id, @NotNull @NotEmpty @NotBlank @Size(min = 3, max = 10) String title,
            @NotNull @NotEmpty @NotBlank @Size(min = 3) String description,
            @NotNull @NotEmpty @NotBlank String status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }



    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    

}
