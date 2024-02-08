package com.goncalves.API.entities.filesVersions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VersionsRepository extends MongoRepository<Versions, String> {
}
