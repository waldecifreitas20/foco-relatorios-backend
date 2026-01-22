const PRISMA_ERRORS = {
  "P2002": { status: 400, message: "object already exists" },
  "P2025": { status: 404, message: "object does not exist" },
};

type ErrorCode = "P2002";

export function getDatabaseErrorMessage(prismaErrorCode: ErrorCode) {
  return PRISMA_ERRORS[prismaErrorCode];
}


export function getErrorResponse(error: any) {
  const { status, message } = getDatabaseErrorMessage(error.code);

  return {
    status: message ? status : 500,
    response: message ?? "An error occurred at server",
  }
}