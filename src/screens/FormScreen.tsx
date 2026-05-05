import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { formStyles } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { NewCourse } from "../types/course";
import { courseService } from "../services/courseService";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  // If id arrives via params -> EDIT MODE. Otherwise -> CREATE MODE.
  const id = route.params?.id;
  const isEditMode: boolean = id !== undefined;

  // Form state with default initial values
  const [form, setForm] = useState<NewCourse>({
    name: "",
    code: "",
    credits: undefined,
    teacher: "",
  });

  //hook useEffect: permite ejecutar el código en segundo plano
  useEffect(() => {
    //código a ejecutar
    if (isEditMode && id !== undefined) {
      loadCourse(id);
    }
  }, [id]);

  const [saving, setSaving] = useState<boolean>(false);

  const loadCourse = async (courseId: number): Promise<void> => {
    try {
      const course = await courseService.getById(courseId);
      if (course === null) {
        Alert.alert("Error", "Curso no encontrado");
        navigation.goBack();
        return;
      }

      setForm({
        name: course.name,
        code: course.code,
        credits: course.credits,
        teacher: course.teacher,
      });
    } catch (error) {
      Alert.alert("Error", "El curso no se puede cargar");
      console.error(error);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async (): Promise<void> => {
    if (
      form.name.trim() === "" ||
      form.code.trim() === "" ||
      form.teacher.trim() === ""
    ) {
      Alert.alert("Campos incompletos", "Por favor, llenar todos los campos");
      return;
    }

    if (!form.credits || isNaN(form.credits) || form.credits < 0) {
      Alert.alert("Créditos inválidos", "Ingrese un valor mayor o igual a 0");
      return;
    }

    //Crear curso
    try {
      //VALIDACIÓN código vulnerable a doble submit
      setSaving(true);
      if (isEditMode && id !== undefined) {
        await courseService.update(id, form);
        Alert.alert("Exitoso", "Curso actualizado con éxito");
      } else {
        await courseService.create(form);
        Alert.alert("Exitoso", "Curso creado con éxito");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se logró crear el curso");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        style={formStyles.container}
        contentContainerStyle={formStyles.scrollContent}
      >
        <Text style={formStyles.title}>
          {isEditMode ? "Editar Curso" : "Nuevo Curso"}
        </Text>

        <Text style={formStyles.label}>Nombre *</Text>
        <TextInput
          style={formStyles.input}
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="Bases de Datos"
          maxLength={60}
        />

        <Text style={formStyles.label}>Código *</Text>
        <TextInput
          style={formStyles.input}
          value={form.code}
          onChangeText={(value) =>
            handleInputChange("code", value.toUpperCase())
          }
          placeholder="CS-301"
          maxLength={20}
          autoCapitalize="characters"
        />

        <Text style={formStyles.label}>Créditos *</Text>
        <TextInput
          style={formStyles.input}
          value={form.credits?.toString()}
          onChangeText={(value) => handleInputChange("credits", value)}
          keyboardType="numeric"
          placeholder="4"
        />

        <Text style={formStyles.label}>Docente *</Text>
        <TextInput
          style={formStyles.input}
          value={form.teacher}
          onChangeText={(value) => handleInputChange("teacher", value)}
          placeholder="Pablo Castro"
          maxLength={60}
        />

        <TouchableOpacity
          style={[
            formStyles.saveButton,
            saving && formStyles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={formStyles.saveButtonText}>
            {saving ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={formStyles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={formStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
