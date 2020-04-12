/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {LocalNotification} from './src/LocalPushController';
import RemotePushController from './src/services/RemotePushController';

declare var global: {HermesInternal: null | {}};

const App = () => {
  const handleButtonPress = () => {
    LocalNotification();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>Press a button to trigger the notification</Text>
        <View style={styles.defaultView}>
          <Button
            title={'Local Push Notification'}
            onPress={handleButtonPress}
          />
        </View>
        <View>
          <RemotePushController />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  defaultView: {
    marginTop: 20,
  },
});

export default App;
