export class HttpError extends Error {
  status: number;

  constructor(message?: string, status?: number) {
    super(message || "Internal server error");
    this.status = status || 500;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
