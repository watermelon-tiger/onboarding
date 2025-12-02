export function convertDistance(value, from, to) {
  // Same unit, no conversion needed
  if (from === to) {
    return value;
  }

  // Kilometer conversions
  if (from === "km" && to === "mi") return value * 0.621371;
  if (from === "km" && to === "m") return value * 1000;

  // Mile conversions
  if (from === "mi" && to === "km") return value / 0.621371;
  if (from === "mi" && to === "m") return value * 1609.34;

  // Meter conversions
  if (from === "m" && to === "km") return value / 1000;
  if (from === "m" && to === "mi") return value / 1609.34;

  throw new Error(`Unsupported distance conversion: ${from} to ${to}`);
}
