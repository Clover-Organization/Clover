package com.goncalves.API.entities.annotations;

import com.goncalves.API.DTO.DadosAtualizarAnnotation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "annotation")
public class Annotations {

    @Id
    private String idAnnotation;

    private String title; // Adicione este campo para armazenar o título da anotação
    private String annotationContent;
    private LocalDateTime creationAnnotation;
    private LocalDateTime progressAnnotation;

    public Annotations(String title, String annotationContent, LocalDateTime creationAnnotation, LocalDateTime progressAnnotation) {
        this.idAnnotation = ObjectId.get().toString();
        this.title = title;
        this.annotationContent = annotationContent;
        this.creationAnnotation = creationAnnotation;
        this.progressAnnotation = progressAnnotation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Annotations that = (Annotations) o;
        return Objects.equals(idAnnotation, that.idAnnotation) && Objects.equals(title, that.title) && Objects.equals(annotationContent, that.annotationContent) && Objects.equals(creationAnnotation, that.creationAnnotation) && Objects.equals(progressAnnotation, that.progressAnnotation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAnnotation, title, annotationContent, creationAnnotation, progressAnnotation);
    }

    public void atualizarAnnotation(DadosAtualizarAnnotation dados) {
        if(dados.title() != null){
            this.title = dados.title();
        }
        if(dados.annotationContent() != null){
            this.annotationContent = dados.annotationContent();
        }
        this.progressAnnotation = LocalDateTime.now();
    }
}
