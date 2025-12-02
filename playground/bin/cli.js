#!/usr/bin/env node
import { convert } from "../src/convert.js";

const [, , command, ...args] = process.argv;

function printUsage() {
  console.error(
    "Usage:\n" +
      "  convert <type> <value> [from] [to]\n" +
      "  convert compare <value1> <unit1> <value2> <unit2>"
  );
  process.exit(1);
}

if (!command) {
  printUsage();
}

// New: compare subcommand for distances
if (command === "compare") {
  if (args.length < 4) {
    printUsage();
  }

  const [value1, unit1, value2, unit2] = args;

  const v1 = Number(value1);
  const v2 = Number(value2);

  if (Number.isNaN(v1) || Number.isNaN(v2)) {
    console.error("Both values must be numeric.");
    process.exit(1);
  }

  // Normalize both values to the same base unit (meters) for comparison
  const firstInMeters = convert("distance", v1, unit1, "m");
  const secondInMeters = convert("distance", v2, unit2, "m");

  let relation;
  if (firstInMeters > secondInMeters) {
    relation = ">";
  } else if (firstInMeters < secondInMeters) {
    relation = "<";
  } else {
    relation = "=";
  }

  console.log(`${value1} ${unit1} ${relation} ${value2} ${unit2}`);
  process.exit(0);
}

// Existing behavior: single conversion
const [value, from, to] = args;

if (!value) {
  printUsage();
}

const numericValue = Number(value);
if (Number.isNaN(numericValue)) {
  console.error("Value must be numeric.");
  process.exit(1);
}

const result = convert(command, numericValue, from, to);
console.log(result);