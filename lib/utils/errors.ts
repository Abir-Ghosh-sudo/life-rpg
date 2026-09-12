export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "INSUFFICIENT_ENERGY"
  | "INSUFFICIENT_GOLD"
  | "ALREADY_COMPLETED"
  | "ALREADY_OWNED"
  | "INVALID_STATE"
  | "RATE_LIMITED"
  | "DATABASE_ERROR"
  | "UNKNOWN_ERROR";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly statusCode: number;

  constructor(
    code: AppErrorCode,
    message: string,
    statusCode = 400,
  ) {
    super(message);

    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;

    Object.setPrototypeOf(
      this,
      AppError.prototype,
    );
  }
}

export function isAppError(
  error: unknown,
): error is AppError {
  return error instanceof AppError;
}

export function getErrorMessage(
  error: unknown,
): string {
  if (isAppError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong.";
}

export function getErrorCode(
  error: unknown,
): AppErrorCode {
  if (isAppError(error)) {
    return error.code;
  }

  return "UNKNOWN_ERROR";
}

export function toAppError(
  error: unknown,
): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      "UNKNOWN_ERROR",
      error.message,
      500,
    );
  }

  return new AppError(
    "UNKNOWN_ERROR",
    "Something went wrong.",
    500,
  );
}

export function unauthorized(
  message = "You must be logged in.",
): never {
  throw new AppError(
    "UNAUTHORIZED",
    message,
    401,
  );
}

export function forbidden(
  message = "You do not have permission to perform this action.",
): never {
  throw new AppError(
    "FORBIDDEN",
    message,
    403,
  );
}

export function notFound(
  message = "The requested resource was not found.",
): never {
  throw new AppError(
    "NOT_FOUND",
    message,
    404,
  );
}

export function validationError(
  message = "Invalid input.",
): never {
  throw new AppError(
    "VALIDATION_ERROR",
    message,
    422,
  );
}

export function conflict(
  message = "This action conflicts with the current state.",
): never {
  throw new AppError(
    "CONFLICT",
    message,
    409,
  );
}

export function insufficientEnergy(): never {
  throw new AppError(
    "INSUFFICIENT_ENERGY",
    "You do not have enough energy.",
    400,
  );
}

export function insufficientGold(): never {
  throw new AppError(
    "INSUFFICIENT_GOLD",
    "You do not have enough gold.",
    400,
  );
}

export function databaseError(): never {
  throw new AppError(
    "DATABASE_ERROR",
    "A database error occurred.",
    500,
  );
}