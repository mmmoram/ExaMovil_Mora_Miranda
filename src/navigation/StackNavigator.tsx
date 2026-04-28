import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/appStyles";
import { ListScreen } from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";
import { RootStackParamList } from "./typesNavigation";
import { FormScreen } from "../screens/FormScreen";

const Stack = createStackNavigator<RootStackParamList>();
 
/**
 * Stack Navigator containing all the app screens.
 * Defines the navigation flow: List -> Detail -> Form
 */
export const StackNavigator=()=> {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: 'Mis Cursos' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del Curso' }}
      />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Curso' : 'Nuevo Curso',
        })}
      />
    </Stack.Navigator>
  );
}
