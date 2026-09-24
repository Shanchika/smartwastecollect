
package com.swm.collect.controller;

import com.swm.collect.model.Bin;
import com.swm.collect.repository.BinRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/bins")
public class BinController {
  private final BinRepo repo;

  public BinController(BinRepo repo) {
    this.repo = repo;
  }

  @GetMapping
  public List<Bin> all() {
    return repo.findAll();
  }

  @GetMapping("/status")
  public List<Map<String, Object>> status() {
    return repo.findAll().stream().map(b -> Map.<String,Object>of(
        "id", b.getId(),
        "code", b.getCode(),
        "location", b.getLocation(),
        "type", b.getType(),
        "lat", b.getLat(),
        "lng", b.getLng(),
        "fillLevel", b.getFillLevel(),
        "status", b.getStatus()
    )).toList();
  }
}
