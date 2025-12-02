import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

export function convert(type, value, from, to) {
  // Validate numeric value
  if (value === null || value === undefined) {
    throw new Error("Invalid value: must be a valid numeric value");
  }

  // Reject empty or whitespace-only strings before numeric coercion
  if (typeof value === "string" && value.trim() === "") {
    throw new Error("Invalid value: must be a valid numeric value");
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    throw new Error("Invalid value: must be a valid numeric value");
  }

  // Define valid unit codes for each conversion type
  const validUnits = {
    temperature: ["C", "F", "K"],
    distance: ["km", "mi", "m"],
    weight: ["g", "oz", "lb"]
  };

  // All converters should ultimately respect the configured precision
  // so we first compute a raw numeric result for the requested type,
  // then apply rounding based on defaults.precision.
  let rawResult;

  switch (type) {
    case "temperature":
      const tempFrom = from || defaults.temperature.defaultFrom;
      const tempTo = to || defaults.temperature.defaultTo;

      // Validate temperature units
      if (!validUnits.temperature.includes(tempFrom)) {
        throw new Error(`Unknown temperature unit: ${tempFrom}`);
      }
      if (!validUnits.temperature.includes(tempTo)) {
        throw new Error(`Unknown temperature unit: ${tempTo}`);
      }

      rawResult = temperature.convertTemperature(numericValue, tempFrom, tempTo);
      break;

    case "distance":
      // Validate distance units
      if (!validUnits.distance.includes(from)) {
        throw new Error(`Unknown distance unit: ${from}`);
      }
      if (!validUnits.distance.includes(to)) {
        throw new Error(`Unknown distance unit: ${to}`);
      }

      rawResult = distance.convertDistance(numericValue, from, to);
      break;

    case "weight":
      // Validate weight units
      if (!validUnits.weight.includes(from)) {
        throw new Error(`Unknown weight unit: ${from}`);
      }
      if (!validUnits.weight.includes(to)) {
        throw new Error(`Unknown weight unit: ${to}`);
      }

      rawResult = weight.convertWeight(numericValue, from, to);
      break;

    default:
      throw new Error("Unknown type " + type);
  }

  // Apply precision formatting using the global default.
  const precision =
    typeof defaults.precision === "number" && defaults.precision >= 0
      ? defaults.precision
      : 2;

  // Use toFixed for consistent rounding (handles up/down and very small values),
  // then convert back to number so callers always get a numeric result.
  return Number(rawResult.toFixed(precision));
}
