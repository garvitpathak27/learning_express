package com.jobtracker.job_service.service;

import com.jobtracker.job_service.model.Job;
import com.jobtracker.job_service.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private JobService jobService;

    private Job job;

    @BeforeEach
    void setUp() {
        job = new Job();
        job.setId(1L);
        job.setCompany("Google");
        job.setRole("Backend Engineer");
        job.setStatus("APPLIED");
    }

    @Test
    void getAllJobs_shouldReturnList() {
        when(jobRepository.findAll()).thenReturn(List.of(job));
        List<Job> result = jobService.getAllJobs();
        assertEquals(1, result.size());
        assertEquals("Google", result.get(0).getCompany());
    }

    @Test
    void getJobById_shouldReturnJob() {
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        Job result = jobService.getJobById(1L);
        assertEquals("Google", result.getCompany());
    }

    @Test
    void getJobById_shouldThrowWhenNotFound() {
        when(jobRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> jobService.getJobById(99L));
    }

    @Test
    void createJob_shouldSaveAndReturn() {
        when(jobRepository.save(job)).thenReturn(job);
        Job result = jobService.createJob(job);
        assertEquals("Google", result.getCompany());
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void deleteJob_shouldCallRepository() {
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        jobService.deleteJob(1L);
        verify(jobRepository, times(1)).deleteById(1L);
    }
}