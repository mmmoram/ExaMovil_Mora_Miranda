import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { detailStyles } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { Gadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [gadget, setGadget] = useState<Gadget | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadGadget();
    }, [id])
  );

  const loadGadget = async () => {
    try {
      const data = await gadgetService.getById(id);
      if (data) {
        setGadget(data);
      } else {
        Alert.alert("Error", "Gadget no encontrado");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar Gadget",
      `¿Estás seguro de eliminar "${gadget?.name}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: handleDelete }
      ]
    );
  };

  const handleDelete = async () => {
    try {
      await gadgetService.delete(id);
      Alert.alert("Éxito", "Gadget eliminado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el gadget");
    }
  };

  if (!gadget) return <View style={detailStyles.container}><Text style={{color: 'white'}}>Cargando...</Text></View>;

  return (
    <ScrollView style={detailStyles.container}>
      <View style={detailStyles.card}>
        <Text style={detailStyles.title}>{gadget.name}</Text>
        
        <Text style={detailStyles.label}>MARCA</Text>
        <Text style={detailStyles.value}>{gadget.brand}</Text>

        <Text style={detailStyles.label}>CATEGORÍA</Text>
        <Text style={detailStyles.value}>{gadget.category}</Text>

        <Text style={detailStyles.label}>AÑO DE COMPRA</Text>
        <Text style={detailStyles.value}>{gadget.purchaseYear}</Text>

        <Text style={detailStyles.label}>PRECIO</Text>
        <Text style={[detailStyles.value, {color: '#10B981', fontWeight: 'bold', fontSize: 24}]}>
          ${gadget.price.toFixed(2)}
        </Text>

        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity 
            style={detailStyles.editButton} 
            onPress={() => navigation.navigate("Form", { id: gadget.id })}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>EDITAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={detailStyles.deleteButton} onPress={confirmDelete}>
            <Text style={{color: '#EF4444', fontWeight: 'bold'}}>ELIMINAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}