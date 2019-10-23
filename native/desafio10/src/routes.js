import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Subscriptions from '~/pages/Subscriptions';
import Profile from '~/pages/Profile';

export default (isSigned = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            initialRouteName: 'Subscriptions',
            tabBarOptions: {
              keyboardHidesTabBar: true,
              style: {
                backgroundColor: '#2b1a2f',
                paddingTop: 12,
                paddingBottom: 12,
                height: 64,
                borderTopWidth: 0,
              },
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Auth',
      }
    )
  );
};
