import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Starred from './pages/Starred';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Starred,
    },
    {
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
      headerBackTitleVisible: false,
    }
  )
);

export default Routes;
