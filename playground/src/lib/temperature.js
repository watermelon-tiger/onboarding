export function convertTemperature(value, from, to) {
  // Same unit, no conversion needed
  if (from === to) {
    return value;
  }

  // Celsius conversions
  if (from === "C" && to === "F") {
    return value * (9 / 5) + 32;
  }
  if (from === "C" && to === "K") {
    return value + 273.15;
  }

  // Fahrenheit conversions
  if (from === "F" && to === "C") {
    return (value - 32) * (5 / 9);
  }
  if (from === "F" && to === "K") {
    return (value - 32) * (5 / 9) + 273.15;
  }

  // Kelvin conversions
  if (from === "K" && to === "C") {
    return value - 273.15;
  }
  if (from === "K" && to === "F") {
    return (value - 273.15) * (9 / 5) + 32;
  }

  throw new Error(`Unsupported temperature conversion: ${from} to ${to}`);
}
