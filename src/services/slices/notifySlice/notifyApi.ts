import type { NotificationData } from './type';

export async function getNotifyToidApi(
  userId: string
): Promise<NotificationData[]> {
  await new Promise((r) => setTimeout(r, 150));
  return [
    {
      notifyId: '1',
      title: 'Николай принял ваш обмен',
      description: 'Перейдите в профиль, чтобы обсудить детали',
      date: new Date().toISOString(),
      viewed: false
    },
    {
      notifyId: '2',
      title: 'Татьяна предлагает вам обмен',
      description: 'Примите обмен, чтобы обсудить детали',
      date: new Date().toISOString(),
      viewed: false
    },
    {
      notifyId: '3',
      title: 'Олег предлагает вам обмен',
      description: 'Примите обмен, чтобы обсудить детали',
      date: new Date(Date.now() - 86400000).toISOString(),
      viewed: true
    }
  ];
}

export async function clearNotifyApi(
  ids: string[]
): Promise<{ removed: string[] }> {
  await new Promise((r) => setTimeout(r, 120));
  return { removed: ids };
}
