import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  NativeEventEmitter,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

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
const template = '{"data":{"message":"$(message)"}}'; // Notification hub templates:
// https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-templates-cross-platform-push-messages
const templateName = 'Sample Template'; // The template's name

const App = () => {
  const _onAzureNotificationHubRegistered = registrationID => {
    console.warn('RegistrationID: ' + registrationID);
  };

  const _onAzureNotificationHubRegisteredError = error => {
    console.warn('Error: ' + error);
  };

  const _onRemoteNotification = notification => {
    console.log(notification);
  };

  function register() {
    PushNotificationEmitter.addListener(
      EVENT_AZURE_NOTIFICATION_HUB_REGISTERED,
      _onAzureNotificationHubRegistered,
    );
    PushNotificationEmitter.addListener(
      EVENT_AZURE_NOTIFICATION_HUB_REGISTERED_ERROR,
      _onAzureNotificationHubRegisteredError,
    );

    NotificationHub.register({
      connectionString,
      hubName,
      senderID,
      tags,
      channelName,
      channelImportance,
      channelShowBadge,
      channelEnableLights,
      channelEnableVibration,
    })
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function registerTemplate() {
    PushNotificationEmitter.addListener(
      EVENT_AZURE_NOTIFICATION_HUB_REGISTERED,
      _onAzureNotificationHubRegistered,
    );
    PushNotificationEmitter.addListener(
      EVENT_AZURE_NOTIFICATION_HUB_REGISTERED_ERROR,
      _onAzureNotificationHubRegisteredError,
    );

    NotificationHub.registerTemplate({
      connectionString,
      hubName,
      senderID,
      template,
      templateName,
      tags,
      channelName,
      channelImportance,
      channelShowBadge,
      channelEnableLights,
      channelEnableVibration,
    })
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function getInitialNotification() {
    NotificationHub.getInitialNotification()
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function getUUID() {
    NotificationHub.getUUID(false)
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function isNotificationEnabledOnOSLevel() {
    NotificationHub.isNotificationEnabledOnOSLevel()
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function unregister() {
    NotificationHub.unregister()
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  function unregisterTemplate() {
    NotificationHub.unregisterTemplate(templateName)
      .then(res => console.warn(res))
      .catch(reason => console.warn(reason));
  }

  useEffect(() => {
    PushNotificationEmitter.addListener(
      EVENT_REMOTE_NOTIFICATION_RECEIVED,
      _onRemoteNotification,
    );
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => register()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => registerTemplate()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register Template</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getInitialNotification()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get initial notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getUUID()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get UUID</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isNotificationEnabledOnOSLevel()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Check if notification is enabled
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => unregister()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Unregister</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => unregisterTemplate()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Unregister Template</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;
