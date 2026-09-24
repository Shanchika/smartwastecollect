
package com.swm.collect.controller;

import com.swm.collect.model.Bin;
import com.swm.collect.model.CollectionRecord;
import com.swm.collect.repository.BinRepo;
import com.swm.collect.repository.CollectionRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/collect")
public class CollectionController {

  private final CollectionRepo repo;
  private final BinRepo repoBin;

  public CollectionController(CollectionRepo repo, BinRepo repoBin) {
    this.repo = repo;
    this.repoBin = repoBin;
  }

  @PostMapping("/record")
  public ResponseEntity<?> record(@RequestBody Map<String, Object> body) {
    String binId = (String) body.get("binId");
    Double weightKg = body.get("weightKg") == null ? null : Double.valueOf(body.get("weightKg").toString());
    String note = (String) body.getOrDefault("note", "");

    if (binId == null || binId.isBlank() || weightKg == null) {
      return ResponseEntity.badRequest().body(Map.of("error", "binId and weightKg required"));
    }

    CollectionRecord rec = CollectionRecord.builder()
        .binId(binId)
        .collectorId("collector-demo")
        .weightKg(weightKg)
        .note(note)
        .collectedAt(LocalDateTime.now())
        .build();

    return ResponseEntity.ok(repo.save(rec));
  }

  @GetMapping("/my")
  public ResponseEntity<?> myCollections(@RequestParam(defaultValue = "collector-demo") String collectorId) {
    List<CollectionRecord> list = repo.findByCollectorIdOrderByCollectedAtDesc(collectorId);
    return ResponseEntity.ok(list);
  }

  @PutMapping("/empty/{binId}")
  public ResponseEntity<?> emptyBin(@PathVariable String binId) {
    Optional<Bin> binOpt = repoBin.findById(binId);
    if (binOpt.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    Bin bin = binOpt.get();
    bin.setFillLevel(0);
    bin.setStatus("Empty");
    repoBin.save(bin);
    return ResponseEntity.ok(Map.of("message", "Bin emptied", "binId", bin.getId()));
  }
}
