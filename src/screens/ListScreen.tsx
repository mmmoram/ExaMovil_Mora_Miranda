import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { listStyles } from '../styles/appStyles';
import { ScreenProps } from '../navigation/typesNavigation';
 

 
type Props = ScreenProps<'List'>;
 
export const ListScreen=({ navigation }: Props)=> {


  return (
    <View style={listStyles.container}>
      {/* Search bar */}
      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="🔍 Buscar por nombre..."
          value={""}
          onChangeText={()=>{}}
        />
      </View>
 
      <FlatList
        data={[]}
        keyExtractor={(item) => item}
        contentContainerStyle={listStyles.list}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>

          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => navigation.navigate('Detail', { id: item })}
          >
            <Text style={listStyles.cardName}></Text>
            <Text style={listStyles.cardDetail}>
              
            </Text>
            <Text style={listStyles.cardTeacher}> </Text>
          </TouchableOpacity>
        )}
      />
 
      <TouchableOpacity
        style={listStyles.fab}
        onPress={() => navigation.navigate('Form', {})}
      >
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
