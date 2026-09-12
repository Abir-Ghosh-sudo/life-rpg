export function sleep(
  milliseconds: number,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function isDefined<T>(
  value: T | null | undefined,
): value is T {
  return value !== null && value !== undefined;
}

export function isNullish(
  value: unknown,
): value is null | undefined {
  return value === null || value === undefined;
}

export function omit<
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}

export function pick<
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  object: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }

  return result;
}

export function unique<T>(
  values: readonly T[],
): T[] {
  return Array.from(new Set(values));
}

export function groupBy<
  T,
  K extends string | number | symbol,
>(
  values: readonly T[],
  getKey: (value: T) => K,
): Record<K, T[]> {
  return values.reduce(
    (groups, value) => {
      const key = getKey(value);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(value);

      return groups;
    },
    {} as Record<K, T[]>,
  );
}

export function chunk<T>(
  values: readonly T[],
  size: number,
): T[][] {
  if (size <= 0) {
    throw new Error(
      "Chunk size must be greater than zero.",
    );
  }

  const result: T[][] = [];

  for (
    let index = 0;
    index < values.length;
    index += size
  ) {
    result.push(
      values.slice(index, index + size),
    );
  }

  return result;
}

export function shuffle<T>(
  values: readonly T[],
): T[] {
  const result = [...values];

  for (
    let index = result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    );

    [
      result[index],
      result[randomIndex],
    ] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

export function randomItem<T>(
  values: readonly T[],
): T | undefined {
  if (values.length === 0) {
    return undefined;
  }

  const index = Math.floor(
    Math.random() * values.length,
  );

  return values[index];
}

export function capitalize(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export function truncate(
  value: string,
  maxLength: number,
): string {
  if (maxLength <= 0) {
    return "";
  }

  if (value.length <= maxLength) {
    return value;
  }

  if (maxLength <= 3) {
    return value.slice(0, maxLength);
  }

  return `${value.slice(0, maxLength - 3)}...`;
}

export function sleepRandom(
  minMilliseconds: number,
  maxMilliseconds: number,
): Promise<void> {
  const min = Math.max(
    0,
    Math.min(
      minMilliseconds,
      maxMilliseconds,
    ),
  );

  const max = Math.max(
    0,
    Math.max(
      minMilliseconds,
      maxMilliseconds,
    ),
  );

  const delay =
    Math.floor(
      Math.random() * (max - min + 1),
    ) + min;

  return sleep(delay);
}