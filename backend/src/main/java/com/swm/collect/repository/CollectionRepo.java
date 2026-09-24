
package com.swm.collect.repository;

import com.swm.collect.model.CollectionRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CollectionRepo extends MongoRepository<CollectionRecord, String> {
  List<CollectionRecord> findByCollectorIdOrderByCollectedAtDesc(String collectorId);
}
