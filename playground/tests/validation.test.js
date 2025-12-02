import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

// Additional validation tests for non-numeric values
test("rejects empty string", () => {
  throws(
    () => convert("temperature", "", "C", "F"),
    /invalid.*value/i,
    "Should throw error for empty string"
  );
});

test("rejects null value", () => {
  throws(
    () => convert("temperature", null, "C", "F"),
    /invalid.*value/i,
    "Should throw error for null"
  );
});

test("rejects undefined value", () => {
  throws(
    () => convert("temperature", undefined, "C", "F"),
    /invalid.*value/i,
    "Should throw error for undefined"
  );
});

test("rejects whitespace-only string", () => {
  throws(
    () => convert("temperature", "   ", "C", "F"),
    /invalid.*value/i,
    "Should throw error for whitespace-only string"
  );
});

// Tests for unknown unit codes - Temperature
test("rejects unknown temperature from unit", () => {
  throws(
    () => convert("temperature", 100, "R", "F"),
    /unknown.*temperature.*unit/i,
    "Should throw error for unknown temperature unit 'R'"
  );
});

test("rejects unknown temperature to unit", () => {
  throws(
    () => convert("temperature", 100, "C", "X"),
    /unknown.*temperature.*unit/i,
    "Should throw error for unknown temperature unit 'X'"
  );
});

test("rejects invalid temperature unit code", () => {
  throws(
    () => convert("temperature", 100, "Celsius", "F"),
    /unknown.*temperature.*unit/i,
    "Should throw error for non-standard unit code 'Celsius'"
  );
});

// Tests for unknown unit codes - Distance
test("rejects unknown distance from unit", () => {
  throws(
    () => convert("distance", 100, "ft", "mi"),
    /unknown.*distance.*unit/i,
    "Should throw error for unknown distance unit 'ft'"
  );
});

test("rejects unknown distance to unit", () => {
  throws(
    () => convert("distance", 100, "km", "yd"),
    /unknown.*distance.*unit/i,
    "Should throw error for unknown distance unit 'yd'"
  );
});

test("rejects invalid distance unit code", () => {
  throws(
    () => convert("distance", 100, "kilometer", "mi"),
    /unknown.*distance.*unit/i,
    "Should throw error for non-standard unit code 'kilometer'"
  );
});

// Tests for unknown unit codes - Weight
test("rejects unknown weight from unit", () => {
  throws(
    () => convert("weight", 100, "kg", "oz"),
    /unknown.*weight.*unit/i,
    "Should throw error for unknown weight unit 'kg'"
  );
});

test("rejects unknown weight to unit", () => {
  throws(
    () => convert("weight", 100, "g", "ton"),
    /unknown.*weight.*unit/i,
    "Should throw error for unknown weight unit 'ton'"
  );
});

test("rejects invalid weight unit code", () => {
  throws(
    () => convert("weight", 100, "gram", "oz"),
    /unknown.*weight.*unit/i,
    "Should throw error for non-standard unit code 'gram'"
  );
});

// Edge case tests
test("accepts decimal numeric strings", () => {
  const result = convert("temperature", "37.5", "C", "F");
  strictEqual(result, 99.5);
});

test("accepts scientific notation strings", () => {
  const result = convert("temperature", "1e2", "C", "F");
  strictEqual(result, 212); // 1e2 = 100
});

test("accepts negative numeric strings", () => {
  const result = convert("temperature", "-40", "C", "F");
  strictEqual(result, -40);
});
