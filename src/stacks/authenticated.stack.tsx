import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CheckUser from "../Screens/AuthScreens/CheckUserScreen";
import PersonalInfo from "../Screens/AuthScreens/PersonalInfoScreen";
import ProfessionalInfo from "../Screens/AuthScreens/ProfessionalInfoScreen";
import ServicesOffered from "../Screens/AuthScreens/ServicesOfferedScreen";
import FitnessLevel from "../Screens/AuthScreens/FitnessLevelScreen";
import FitnessGoal from "../Screens/AuthScreens/FitnessGoalScreen";
import AccountUpdate from "../Screens/AuthScreens/AccountUpdate";
import TrainerVerification from "../Screens/TrainerScreens/TrainerVerification";
import UpdateProfessioninfo from "../Screens/AuthScreens/UpdateProfessioninfo";
import EnterChatforTrainee from "../Screens/TraineeScreens/EnterChatforTrainee";

import TrainerTabb from "../Screens/TrainerScreens/TrainerBottomTabScreen";
import CreateBookSession from "../Screens/TrainerScreens/CreateBookSessionScreen";
import CreateRecorderClass from "../Screens/TrainerScreens/CreateRecorderSession";
import VideoCreate from "../Screens/TrainerScreens/VideoCreateScreen";
import EnterChatTrainer from "../Screens/TrainerScreens/EnterChatScreen";
import TrainerPayment from "../Screens/TrainerScreens/TrainerPaymentScreen";
import TrainerWallet from "../Screens/TrainerScreens/WalletScreen";
import TrainerCreateCard from "../Screens/TrainerScreens/CreateCardScreen";

import TraineeTabb from "../Screens/TraineeScreens/TraineeBottomTabScreen";
import TrainerDetail from "../Screens/TraineeScreens/TrainerDetail";
import BookSessionPayment from "../Screens/TraineeScreens/BookSessionPayment";
import WalletForTrainee from "../Screens/TraineeScreens/WalletForTrainee";
import CreateCardTrainee from "../Screens/TraineeScreens/CreateCardScreen";
import { LogoutNow } from "../../Main";

const Stack = createStackNavigator();

const AuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CheckUser" component={CheckUser} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
    <Stack.Screen name="ProfessionalInfo" component={ProfessionalInfo} options={{ headerShown: false }} />
    <Stack.Screen name="ServicesOffered" component={ServicesOffered} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerVerification" component={TrainerVerification} options={{ headerShown: false }} />
    <Stack.Screen name="UpdateProfessioninfo" component={UpdateProfessioninfo} options={{ headerShown: false }} />
    <Stack.Screen name="FitnessLevel" component={FitnessLevel} options={{ headerShown: false }} />
    <Stack.Screen name="FitnessGoal" component={FitnessGoal} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerTabb" component={TrainerTabb} options={{ headerShown: false }} />
    <Stack.Screen name="AccountUpdate" component={AccountUpdate} options={{ headerShown: false }} />
    <Stack.Screen name="CreateBookSession" component={CreateBookSession} options={{ headerShown: false }} />
    <Stack.Screen name="CreateRecorderClass" component={CreateRecorderClass} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerPayment" component={TrainerPayment} options={{ headerShown: false }} />
    <Stack.Screen name="VideoCreate" component={VideoCreate} options={{ headerShown: false }} />
    <Stack.Screen name="EnterChatTrainer" component={EnterChatTrainer} options={{ headerShown: false }} />
    <Stack.Screen name="EnterChatforTrainee" component={EnterChatforTrainee} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerWallet" component={TrainerWallet} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerCreateCard" component={TrainerCreateCard} options={{ headerShown: false }} />
    <Stack.Screen name="TraineeTabb" component={TraineeTabb} options={{ headerShown: false }} />
    <Stack.Screen name="TrainerDetail" component={TrainerDetail} options={{ headerShown: false }} />
    <Stack.Screen name="BookSessionPayment" component={BookSessionPayment} options={{ headerShown: false }} />
    <Stack.Screen name="WalletForTrainee" component={WalletForTrainee} options={{ headerShown: false }} />
    <Stack.Screen name="CreateCardTrainee" component={CreateCardTrainee} options={{ headerShown: false }} />
    <Stack.Screen name="logoutNow" component={LogoutNow} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthenticatedStack;
