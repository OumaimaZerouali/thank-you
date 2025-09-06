export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export class ValidationError extends Error {
  public readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NetworkError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
  }
}

export class ServiceError extends Error {
  public readonly service: string;

  constructor(service: string, message: string) {
    super(message);
    this.name = 'ServiceError';
    this.service = service;
  }
}
