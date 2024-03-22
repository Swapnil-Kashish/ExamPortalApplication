package com.exam.model.examcat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jfr.ContentType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long quesId;

    @Column(length = 5000)
    private String content;

    private  String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    
    private String answer;
    @Transient
    private  String givenAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
