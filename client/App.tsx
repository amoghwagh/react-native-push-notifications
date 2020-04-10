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

declare var global: {HermesInternal: null | {}};

const App = () => {
  const handleButtonPress = () => {
    LocalNotification();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Press a button to trigger the notification</Text>
        <View style={styles.defaultView}>
          <Button
            title={'Local Push Notification'}
            onPress={handleButtonPress}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  defaultView: {
    marginTop: 20,
  },
});

export default App;
