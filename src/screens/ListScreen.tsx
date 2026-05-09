import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { listStyles } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { useCallback, useState } from "react";
import { Course } from "../types/gadget";
import { courseService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"List">;

export const ListScreen = ({ navigation }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  //Verificar la carga, para evitar que la pantalla se muestre vacía
  const [loading, setLoading] = useState<boolean>(false);

  //Buscar por nombre
  const [searchText, setSearchText] = useState<string>("");

  //useFocusEffect: permite ejecutar loadcCourses cada vez que la pantalla vuelve
  //a estar isible.
  //Así grarantizamos que siempre veamos los datos actualizados.
  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, []),
  );

  const loadCourses = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data);
    } catch (error) {
      Alert.alert("Error", "No se puede cargar los cursos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Arreglo con datos filrados
  const filteredCourses = courses.filter((course) => 
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={listStyles.container}>
      {/* Search bar */}
      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="🔍 Buscar por nombre..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={listStyles.list}
        ListEmptyComponent={<Text style={listStyles.emptyText}>
          <Text style={listStyles.emptyText}>
            {loading
            ? "Cargando..."
            : searchText
            ? "Curso no encontrado"
            : "Todavía no hay cursos. Crea el primer curso!"
            }
          </Text>
        </Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <Text style={listStyles.cardName}>{item.name}</Text>
            <Text style={listStyles.cardDetail}>
              {item.code} - {item.credits} creditós
            </Text>
            <Text style={listStyles.cardTeacher}>{item.teacher}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={listStyles.fab}
        onPress={() => navigation.navigate("Form", {})}
      >
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
