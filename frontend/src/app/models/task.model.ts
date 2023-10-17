export interface Task {
  id?: number;
  title: String;
  description: String;
  status?: Status;
}

export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
