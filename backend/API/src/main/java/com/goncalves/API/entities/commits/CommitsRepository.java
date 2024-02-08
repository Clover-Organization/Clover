package com.goncalves.API.entities.commits;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommitsRepository extends MongoRepository<Commits, String> {
}
