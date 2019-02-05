import { Constants, Notifications, Permissions } from "expo";

const hasPermission = async () => {
  let result = await Permissions.askAsync(Permission.NOTIFICATIONS);
  if (Constants.isDevice && result.status === "granted") {
    return true;
  }
  return false;
};

export const setInstantNotification = async notification => {
  if (hasPermission) {
    return await Notifications.presentLocalNotificationAsync(notification);
  }
};

export const setNotification = async (notification, schedule) => {
  if (hasPermission) {
    return await Notifications.scheduleLocalNotificationAsync(
      notification,
      schedule
    );
  }
};

export const deleteNotification = async id => {
  return Notifications.cancelScheduledNotificationAsync(id);
};

export const deleteAllNotifications = async () => {
  return Notifications.cancelAllScheduledNotificationsAsync();
};
