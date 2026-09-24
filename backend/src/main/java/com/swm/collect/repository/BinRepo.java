
package com.swm.collect.repository;

import com.swm.collect.model.Bin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BinRepo extends MongoRepository<Bin, String> {}
