
package com.swm.collect.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Document("bins")
public class Bin {
  @Id
  private String id;
  private String code;
  private String type;
  private String location;
  private Double lat;
  private Double lng;
  private Integer fillLevel;
  private String status;
}
