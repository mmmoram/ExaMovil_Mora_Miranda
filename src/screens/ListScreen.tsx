import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { listStyles } from "../styles/appStyles";  
import { ScreenProps } from "../navigation/typesNavigation";
import { useCallback, useState } from "react";
import { Gadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"List">;

export const ListScreen = ({ navigation }: Props) => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      loadGadgets();
    }, [])
  );

  const loadGadgets = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await gadgetService.getAll();
      setGadgets(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el inventario");
    } finally {
      setLoading(false);
    }
  };

  // BONUS
  const filteredGadgets = gadgets.filter((g) => 
    g.name.toLowerCase().includes(searchText.toLowerCase()) ||
    g.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={listStyles.container}>
      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="🔍 Buscar por nombre o marca..."
          placeholderTextColor="#64748B"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredGadgets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={listStyles.list}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>
            {loading ? "Cargando..." : searchText ? "No se encontraron gadgets." : "Inventario vacío. ¡Agrega uno!"}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <View style={listStyles.cardContent}>
              <Text style={listStyles.cardName}>{item.name}</Text>
              <Text style={listStyles.cardBrand}>{item.brand}</Text>
              <View style={listStyles.pill}>
                <Text style={listStyles.pillText}>{item.category.toUpperCase()}</Text>
              </View>
            </View>
            <View style={listStyles.priceContainer}>
              <Text style={listStyles.cardPrice}>${item.price.toFixed(2)}</Text>
              <Text style={listStyles.cardYear}>{item.purchaseYear}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={listStyles.fab} onPress={() => navigation.navigate("Form", {})}>
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};