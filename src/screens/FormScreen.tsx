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
  ActivityIndicator,
} from "react-native";

import { formStyles } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { NewGadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";


type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.id;
  const isEditMode: boolean = id !== undefined;

  const [form, setForm] = useState<NewGadget>({
    name: "",
    brand: "",
    category: "",
    price: undefined,
    purchaseYear: undefined,
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEditMode && id !== undefined) {
      loadGadget(id);
    }
  }, [id]);

  const loadGadget = async (gadgetId: number): Promise<void> => {
    try {
      setLoading(true);
      const gadget = await gadgetService.getById(gadgetId);
      if (gadget) {
        setForm({
          name: gadget.name,
          brand: gadget.brand,
          category: gadget.category,
          price: gadget.price,
          purchaseYear: gadget.purchaseYear,
        });
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el gadget");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof NewGadget, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
   
    const name = form.name?.trim();
    const brand = form.brand?.trim();
    const category = form.category?.trim();
    
   
    const price = Number(form.price);
    const purchaseYear = Number(form.purchaseYear);

  
    if (!name || !brand || !category) {
      Alert.alert("Campos obligatorios", "Por favor completa todos los campos de texto.");
      return;
    }

    if (isNaN(price) || price <= 0) {
      Alert.alert("Precio inválido", "El precio debe ser un número mayor a 0.");
      return;
    }

    if (isNaN(purchaseYear) || purchaseYear < 2000 || purchaseYear > 2026) {
      Alert.alert("Año inválido", "El año debe estar entre 2000 y 2026.");
      return;
    }

    try {
      setSaving(true);
     
      const gadgetToSave = {
        name,
        brand,
        category,
        price,
        purchaseYear
      };

      if (isEditMode && id !== undefined) {
        await gadgetService.update(id, gadgetToSave);
        Alert.alert("Éxito", "Gadget actualizado correctamente");
      } else {
        await gadgetService.create(gadgetToSave);
        Alert.alert("Éxito", "Gadget guardado en el inventario");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar los datos");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[formStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#0EA5E9" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={formStyles.container} contentContainerStyle={formStyles.scrollContent}>
        <Text style={formStyles.title}>
          {isEditMode ? "Editar Gadget" : "Nuevo Gadget"}
        </Text>

        <Text style={formStyles.label}>Nombre del Producto *</Text>
        <TextInput
          style={formStyles.input}
          value={form.name}
          onChangeText={(v) => handleInputChange("name", v)}
          placeholder="Ej: iPhone 15 Pro"
          placeholderTextColor="#64748B"
        />

        <Text style={formStyles.label}>Marca *</Text>
        <TextInput
          style={formStyles.input}
          value={form.brand}
          onChangeText={(v) => handleInputChange("brand", v)}
          placeholder="Ej: Apple"
          placeholderTextColor="#64748B"
        />

        <Text style={formStyles.label}>Categoría (Laptop, Phone, etc) *</Text>
        <TextInput
          style={formStyles.input}
          value={form.category}
          onChangeText={(v) => handleInputChange("category", v)}
          placeholder="Ej: Smartphone"
          placeholderTextColor="#64748B"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <Text style={formStyles.label}>Precio ($) *</Text>
            <TextInput
              style={formStyles.input}
              value={form.price?.toString()}
              onChangeText={(v) => handleInputChange("price", v)}
              keyboardType="numeric"
              placeholder="999.99"
              placeholderTextColor="#64748B"
            />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={formStyles.label}>Año de Compra *</Text>
            <TextInput
              style={formStyles.input}
              value={form.purchaseYear?.toString()}
              onChangeText={(v) => handleInputChange("purchaseYear", v)}
              keyboardType="numeric"
              placeholder="2024"
              placeholderTextColor="#64748B"
              maxLength={4}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[formStyles.saveButton, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={formStyles.saveButtonText}>
              {isEditMode ? "Actualizar Inventario" : "Guardar Producto"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={formStyles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={formStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};