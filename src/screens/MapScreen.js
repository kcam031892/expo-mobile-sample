import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={tw`bg-gray-100 absolute top-16 left-6 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name='menu' />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2 `}>
        <Stack.Navigator>
          <Stack.Screen name='NavigateCard' component={NavigateCard} options={{ headerShown: false }} />

          <Stack.Screen name='RideOptionsCard' component={RideOptionsCard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
