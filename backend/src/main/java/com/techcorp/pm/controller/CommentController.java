package com.techcorp.pm.controller;

import com.techcorp.pm.dto.CommentDTO;
import com.techcorp.pm.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Tag(name = "Comment API", description = "Task conversation threads and discussion updates")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/task/{taskId}")
    @Operation(summary = "Get comments for a task")
    public ResponseEntity<List<CommentDTO>> getCommentsByTaskId(@PathVariable Long taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTaskId(taskId));
    }

    @PostMapping
    @Operation(summary = "Add comment to task")
    public ResponseEntity<CommentDTO> addComment(@Valid @RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.addComment(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
}
