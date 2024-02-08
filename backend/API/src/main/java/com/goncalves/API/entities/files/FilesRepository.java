package com.goncalves.API.entities.files;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FilesRepository extends MongoRepository<Files, String> {
}
