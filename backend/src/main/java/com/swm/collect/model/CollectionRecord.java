
package com.swm.collect.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Document("collections")
public class CollectionRecord {
  @Id
  private String id;
  private String binId;
  private String collectorId;
  private Double weightKg;
  private String note;
  private LocalDateTime collectedAt;
}
