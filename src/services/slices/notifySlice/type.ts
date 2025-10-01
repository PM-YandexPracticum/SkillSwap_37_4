export type NotificationData = {
  notifyId: string;
  title: string;
  description: string;
  date: string;
  viewed: boolean;
};

export type NotifyState = {
  items: NotificationData[];
  loading: boolean;
  error: string | null;
  lastFetched?: string;
};
