// send Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
  timestamp: string;
}

// Error response
export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  error: string[];
  timestamp: string;
}
