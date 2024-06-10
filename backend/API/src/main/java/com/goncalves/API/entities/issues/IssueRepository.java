package com.goncalves.API.entities.issues;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IssueRepository extends MongoRepository<Issue, String> {
    @Query("{ '_id': { '$in': ?0 } }")
    Page<Issue> findByIdIn(List<String> ids, Pageable pageable);

    @Query("{ '_id': { '$in': ?0 }, 'open': ?1 }")
    Page<Issue> findByIdInAndOpen(List<String> issueIds, Boolean open, Pageable pageable);
}
