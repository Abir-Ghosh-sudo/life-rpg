export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

export function clampInteger(
  value: number,
  min: number,
  max: number,
): number {
  return Math.round(
    clamp(value, min, max),
  );
}

export function roundTo(
  value: number,
  decimals = 0,
): number {
  const factor = Math.pow(
    10,
    decimals,
  );

  return Math.round(
    value * factor,
  ) / factor;
}

export function percentageOf(
  value: number,
  total: number,
): number {
  if (total <= 0) {
    return 0;
  }

  return clamp(
    (value / total) * 100,
    0,
    100,
  );
}

export function lerp(
  start: number,
  end: number,
  progress: number,
): number {
  const t = clamp(progress, 0, 1);

  return start + (end - start) * t;
}

export function randomInt(
  min: number,
  max: number,
): number {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  if (lower > upper) {
    throw new Error(
      "Minimum value cannot be greater than maximum value.",
    );
  }

  return (
    Math.floor(
      Math.random() *
        (upper - lower + 1),
    ) + lower
  );
}

export function randomFloat(
  min: number,
  max: number,
): number {
  if (min > max) {
    throw new Error(
      "Minimum value cannot be greater than maximum value.",
    );
  }

  return (
    Math.random() * (max - min) + min
  );
}

export function sum(
  values: readonly number[],
): number {
  return values.reduce(
    (total, value) => total + value,
    0,
  );
}

export function average(
  values: readonly number[],
): number {
  if (values.length === 0) {
    return 0;
  }

  return sum(values) / values.length;
}

export function max(
  values: readonly number[],
): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.max(...values);
}

export function min(
  values: readonly number[],
): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.min(...values);
}

export function isPositive(
  value: number,
): boolean {
  return value > 0;
}

export function isNonNegative(
  value: number,
): boolean {
  return value >= 0;
}

export function isWithinRange(
  value: number,
  minValue: number,
  maxValue: number,
): boolean {
  return (
    value >= minValue &&
    value <= maxValue
  );
}