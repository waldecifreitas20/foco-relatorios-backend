const PRISMA_ERRORS = {
  "P2002": { status: 400, message: "object already exists" },
  "P2025": { status: 404, message: "object does not exist" },
};

type ErrorCode = "P2002";

export function getErrorMessage(prismaErrorCode: ErrorCode) {
  return PRISMA_ERRORS[prismaErrorCode];
}