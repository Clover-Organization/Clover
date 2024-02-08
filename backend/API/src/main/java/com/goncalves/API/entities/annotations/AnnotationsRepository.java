package com.goncalves.API.entities.annotations;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnotationsRepository extends MongoRepository<Annotations, String> {
}
