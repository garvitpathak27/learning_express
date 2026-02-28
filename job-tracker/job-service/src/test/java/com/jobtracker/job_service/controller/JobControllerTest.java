package com.jobtracker.job_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtracker.job_service.model.Job;
import com.jobtracker.job_service.service.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class JobControllerTest {

    private MockMvc mockMvc;

    private JobService jobService = mock(JobService.class);

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(new com.jobtracker.job_service.controller.JobController(jobService)).build();
    }

    @Test
    void getAll_shouldReturn200() throws Exception {
        Job job = new Job();
        job.setId(1L);
        job.setCompany("Google");
        job.setRole("Backend Engineer");
        job.setStatus("APPLIED");

        when(jobService.getAllJobs()).thenReturn(List.of(job));

        mockMvc.perform(get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Google"));
    }

    @Test
    void createJob_shouldReturn200() throws Exception {
        Job job = new Job();
        job.setId(1L);
        job.setCompany("Google");
        job.setRole("Backend Engineer");
        job.setStatus("APPLIED");

        when(jobService.createJob(any(Job.class))).thenReturn(job);

        mockMvc.perform(post("/api/jobs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(job)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Google"));
    }

    @Test
    void deleteJob_shouldReturn200() throws Exception {
        doNothing().when(jobService).deleteJob(1L);
        mockMvc.perform(delete("/api/jobs/1"))
                .andExpect(status().isOk());
    }
}