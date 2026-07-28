import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const ANDROID_CHANNEL_ID = "default";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const resolveProjectId = () =>
  Constants?.expoConfig?.extra?.eas?.projectId ||
  Constants?.easConfig?.projectId;

const ensureAndroidChannel = async () => {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: "Заказы",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#8db63b",
  });
};

const ensurePermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status === "granted") {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  return requested.status === "granted";
};

export const getExpoPushToken = async () => {
  if (!Device.isDevice) {
    throw new Error("Push-уведомления недоступны в симуляторе");
  }

  await ensureAndroidChannel();

  const granted = await ensurePermissions();

  if (!granted) {
    throw new Error("Пользователь не разрешил push-уведомления");
  }

  const projectId = resolveProjectId();

  if (!projectId) {
    throw new Error("Не найден eas projectId для получения push-токена");
  }

  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });

  return data;
};
