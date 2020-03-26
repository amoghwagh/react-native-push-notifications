import React, {useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, NativeEventEmitter} from 'react-native';

const NotificationHub = require('react-native-azurenotificationhub');
const PushNotificationEmitter = new NativeEventEmitter(NotificationHub);

const EVENT_AZURE_NOTIFICATION_HUB_REGISTERED =
  'azureNotificationHubRegistered';
const EVENT_AZURE_NOTIFICATION_HUB_REGISTERED_ERROR =
  'azureNotificationHubRegisteredError';
const EVENT_REMOTE_NOTIFICATION_RECEIVED = 'remoteNotificationReceived';

const connectionString =
  'Endpoint=sb://pushprototype.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=2OwufsMW9TtXr2sbeg1u9VxDeTz+N5s8JZO34tJxzLI='; // The Notification Hub connection string
const hubName = 'lets-talk-hub'; // The Notification Hub name
const senderID = '465434081085'; // The Sender ID from the Cloud Messaging tab of the Firebase console
const tags = []; // The set of tags to subscribe to
const channelName = ''; // The channel's name
const channelImportance = 3; // The channel's importance (NotificationManager.IMPORTANCE_DEFAULT = 3)
// Notes:
//   1. Setting this value to 4 enables heads-up notification on Android 8
//   2. On some devices such as Samsung Galaxy, changing this value requires
//      uninstalling/re-installing the app to take effect.
const channelShowBadge = true;
const channelEnableLights = true;
const channelEnableVibration = true;
const template =
  '<tile><visual> <binding template="ToastText01"><text id="1">{\'Hi, \' + $(name)}</text> </binding>  </visual></tile>'; // Notification hub templates:
// https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-templates-cross-platform-push-messages
const templateName = 'Introduction'; // The template's name

const App = () => {
  useEffect(() => {
    console.log('Mounted');
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
