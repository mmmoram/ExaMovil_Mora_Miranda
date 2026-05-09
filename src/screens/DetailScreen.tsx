import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { detailStyles } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { Course } from "../types/gadget";
import { courseService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const [course, setCourse] = useState<Course | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadCourse();
    }, []),
  );

  const loadCourse = async (): Promise<void> => {
    try {
      const data = await courseService.getById(id);
      setCourse(data);
      if (data === null) {
        Alert.alert("Error", "Curso no encontrado");
        navigation.goBack();
        return;
      }
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el curso");
      console.error(error);
    }
  };

  const confirmDelete = (): void => {
    if (course === null) return;

    Alert.alert(
      "Eliminar curso",
      `Estás seguro que quieres eliminar el curso "${course.name}"? Está acción no se puede deshacer.`,
      [
        {text: "Cancelar", style: "cancel"},
        {text: "Eliminar", style:"destructive", onPress: handleDelete}
      ]
    )
  };

  const handleDelete = async (): Promise<void> => {
    if (course === null) return;
    try {
      await courseService.delete(course.id);
      Alert.alert("Exitoso", "Curso eliminado con éxito");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "El curso no se puede eliminar");
      console.error(error);
    }
  };

  if (course === null) {
    return (
      <View style={detailStyles.container}>
        <Text style={detailStyles.loadingText}>Cargando....</Text>
      </View>
    );
  }

  return (
    <ScrollView style={detailStyles.container}>
      <View style={detailStyles.card}>
        <Text style={detailStyles.title}>{course.name}</Text>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Código</Text>
          <Text style={detailStyles.value}>{course.code}</Text>
        </View>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Creditos</Text>
          <Text style={detailStyles.value}>{course.credits}</Text>
        </View>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Docente</Text>
          <Text style={detailStyles.value}>{course.teacher}</Text>
        </View>

        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity
            style={detailStyles.editButton}
            onPress={() => navigation.navigate("Form", { id: course.id })}
          >
            <Text style={detailStyles.editButtonText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={detailStyles.deleteButton}
            onPress={confirmDelete}
          >
            <Text style={detailStyles.deleteButtonText}>🗑️ Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
