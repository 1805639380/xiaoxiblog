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
