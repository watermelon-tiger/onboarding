import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for Kelvin temperature conversions
test("converts Celsius to Kelvin", () => {
  const result = convert("temperature", 0, "C", "K");
  strictEqual(result, 273.15);
});

test("converts Kelvin to Celsius", () => {
  const result = convert("temperature", 273.15, "K", "C");
  strictEqual(result, 0);
});

test("converts Fahrenheit to Kelvin", () => {
  const result = convert("temperature", 32, "F", "K");
  strictEqual(result, 273.15);
});

test("converts Kelvin to Fahrenheit", () => {
  const result = convert("temperature", 273.15, "K", "F");
  strictEqual(result, 32);
});

test("converts absolute zero from Kelvin to Celsius", () => {
  const result = convert("temperature", 0, "K", "C");
  strictEqual(result, -273.15);
});

test("converts water boiling point to Kelvin", () => {
  const result = convert("temperature", 100, "C", "K");
  strictEqual(result, 373.15);
});

// Tests for meters distance conversions
test("converts kilometers to meters", () => {
  const result = convert("distance", 1, "km", "m");
  strictEqual(result, 1000);
});

test("converts meters to kilometers", () => {
  const result = convert("distance", 1000, "m", "km");
  strictEqual(result, 1);
});

test("converts miles to meters", () => {
  const result = convert("distance", 1, "mi", "m");
  strictEqual(result, 1609.34);
});

test("converts meters to miles", () => {
  const result = convert("distance", 1609.34, "m", "mi");
  strictEqual(result, 1);
});

test("converts 5 kilometers to meters", () => {
  const result = convert("distance", 5, "km", "m");
  strictEqual(result, 5000);
});

// Tests for pounds weight conversions
test("converts grams to pounds", () => {
  const result = convert("weight", 453.592, "g", "lb");
  strictEqual(result, 1);
});

test("converts pounds to grams", () => {
  const result = convert("weight", 1, "lb", "g");
  // Global precision is 2 decimal places, so result is rounded
  strictEqual(result, 453.59);
});

test("converts ounces to pounds", () => {
  const result = convert("weight", 16, "oz", "lb");
  strictEqual(result, 1);
});

test("converts pounds to ounces", () => {
  const result = convert("weight", 1, "lb", "oz");
  strictEqual(result, 16);
});

test("converts 2 pounds to grams", () => {
  const result = convert("weight", 2, "lb", "g");
  // Global precision is 2 decimal places, so result is rounded
  strictEqual(result, 907.18);
});

// Tests for same unit conversions (should return same value)
test("converts Kelvin to Kelvin returns same value", () => {
  const result = convert("temperature", 300, "K", "K");
  strictEqual(result, 300);
});

test("converts meters to meters returns same value", () => {
  const result = convert("distance", 100, "m", "m");
  strictEqual(result, 100);
});

test("converts pounds to pounds returns same value", () => {
  const result = convert("weight", 5, "lb", "lb");
  strictEqual(result, 5);
});
