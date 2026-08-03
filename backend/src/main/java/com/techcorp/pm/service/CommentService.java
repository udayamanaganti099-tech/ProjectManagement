package com.techcorp.pm.service;

import com.techcorp.pm.dto.CommentDTO;
import com.techcorp.pm.entity.Comment;
import com.techcorp.pm.entity.Task;
import com.techcorp.pm.entity.User;
import com.techcorp.pm.exception.ResourceNotFoundException;
import com.techcorp.pm.repository.CommentRepository;
import com.techcorp.pm.repository.TaskRepository;
import com.techcorp.pm.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByTaskId(Long taskId) {
        return commentRepository.findByTaskIdOrderByCreatedAtDesc(taskId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentDTO addComment(CommentDTO commentDTO) {
        Task task = taskRepository.findById(commentDTO.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", commentDTO.getTaskId()));

        User author = userRepository.findById(commentDTO.getAuthorId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", commentDTO.getAuthorId()));

        Comment comment = new Comment();
        comment.setTask(task);
        comment.setAuthor(author);
        comment.setContent(commentDTO.getContent());

        Comment savedComment = commentRepository.save(comment);
        return convertToDTO(savedComment);
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setTaskId(comment.getTask().getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());

        if (comment.getAuthor() != null) {
            dto.setAuthorId(comment.getAuthor().getId());
            dto.setAuthorName(comment.getAuthor().getFullName());
            dto.setAuthorAvatar(comment.getAuthor().getAvatarUrl());
        }

        return dto;
    }
}
