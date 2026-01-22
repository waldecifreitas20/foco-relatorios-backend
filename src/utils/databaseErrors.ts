const PRISMA_ERRORS = {
  "P2002": "Object Already Created",
};

type ErrorCode = "P2002";

export function getErrorMessage(prismaErrorCode: ErrorCode) {
  return {
    status: 404,
    message: PRISMA_ERRORS[prismaErrorCode],
  };
}