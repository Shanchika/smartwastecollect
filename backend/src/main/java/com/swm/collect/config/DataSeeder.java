
package com.swm.collect.config;

import com.swm.collect.model.Bin;
import com.swm.collect.repository.BinRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

  @Bean
  CommandLineRunner seed(BinRepo bins) {
    return args -> {
      if (bins.count() == 0) {
        bins.save(Bin.builder().code("RFID-1001").type("GENERAL").location("Galle Road 12").lat(6.9167).lng(79.8473).fillLevel(35).status("Normal").build());
        bins.save(Bin.builder().code("RFID-1002").type("RECYCLABLE").location("Kandy Street 8").lat(7.2906).lng(80.6337).fillLevel(82).status("Full").build());
        bins.save(Bin.builder().code("RFID-1003").type("ORGANIC").location("Col 7 – Park").lat(6.9271).lng(79.8612).fillLevel(60).status("Normal").build());
      }
    };
  }
}
