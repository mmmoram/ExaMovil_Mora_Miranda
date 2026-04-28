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

type Props = ScreenProps<"Form">;

//Interface para el manejo del objeto formulario
export interface Form {
  name: string;
  code: string;
  credits: number | undefined;
  teacher: string;
}

export const FormScreen = ({ route, navigation }: Props) => {
  // If id arrives via params -> EDIT MODE. Otherwise -> CREATE MODE.
  const id = route.params?.id;
  const isEditMode: boolean = id !== undefined;

  // Form state with default initial values
  const [form, setForm] = useState<Form>({
    name: "",
    code: "",
    credits: undefined,
    teacher: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
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
          onChangeText={(value) => handleInputChange("code", value.toUpperCase())}
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
          style={formStyles.saveButton}
          onPress={()=>{}}
          disabled={true}
        >
          <Text style={formStyles.saveButtonText}>
            
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
