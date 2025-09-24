export enum ENotifyStatus {
  PENDING = 'pending',
  SENT = 'sent',
  READ = 'read',
  COMPLETED = 'completed'
}

export type TNotifyHistoryItem = {
  id: string;
  skillId: string;
  fromUser: string;
  toUser: string;
  notifyDate: Date;
  status: ENotifyStatus;
}