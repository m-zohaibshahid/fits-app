import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CheckUser from '../Screens/AuthScreens/CheckUserScreen';

const Stack = createStackNavigator();

const AuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CheckUser" component={CheckUser} options={{ headerShown: false }} />
    {/* <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfessionalInfo"
                component={ProfessionalInfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ServicesOffered"
                component={ServicesOffered}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerVerification"
                component={TrainerVerification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UpdateProfessioninfo"
                component={UpdateProfessioninfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FitnessLevel"
                component={FitnessLevel}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FitnessGoal"
                component={FitnessGoal}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerTabb"
                component={TrainerTabb}
                initialParams={{unReadMessages}}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AccountUpdate"
                component={AccountUpdate}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateBookSession"
                component={CreateBookSession}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateRecorderClass"
                component={CreateRecorderClass}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerPayment"
                component={TrainerPayment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VideoCreate"
                component={VideoCreate}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterChatTrainer"
                component={EnterChatTrainer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterChatforTrainee"
                component={EnterChatforTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerWallet"
                component={TrainerWallet}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerCreateCard"
                component={TrainerCreateCard}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TraineeTabb"
                component={TraineeTabb}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerDetail"
                component={TrainerDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookSessionPayment"
                component={BookSessionPayment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WalletForTrainee"
                component={WalletForTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateCardTrainee"
                component={CreateCardTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="logoutNow"
                component={LogoutNow}
                options={{headerShown: false}}
              /> */}
    {/* Add authenticated screens as needed */}
  </Stack.Navigator>
);

export default AuthenticatedStack;
