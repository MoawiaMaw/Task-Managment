package com.alatyia.demo.models;

import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private LocalDateTime timestamp;
    private Long count;
    private int statusCode;
    private Map<?, ?> data;
    private String message;
    private String error;
}
