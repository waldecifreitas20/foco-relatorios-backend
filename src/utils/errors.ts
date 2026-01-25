const PRISMA_ERRORS = {
  "P2002": "object already exists",
  "P2003": "object parent does not exist",
  "P2025": "object does not exist",
};

export type ErrorCode = "P2002" | "P2025";

export function getDatabaseErrorMessage(prismaErrorCode: ErrorCode) {
  const message = PRISMA_ERRORS[prismaErrorCode];
  if (!message) {
    return "Unknown Error";
  }

  return message;
}


export function getErrorResponse(error: any) {
  const message = getDatabaseErrorMessage(error.code);

  return {
    status: 500,
    error: message ?? "An error occurred at server",
  }
}