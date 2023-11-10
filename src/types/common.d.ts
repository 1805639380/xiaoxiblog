export interface CommonEntity {
  id: number;
  createTime: string;
  updatedTime: string;
  deleteAt: string;
}

export interface ResponseData<T> {
  row?: T;
  rows?: T[];
  message: string;
  count?: number;
}

export interface ResponseType<T> {
  code: number;
  data: T;
  path: string;
  timestamp: string;
  message: string;
}
