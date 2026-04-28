import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { detailStyles } from '../styles/appStyles';
import { ScreenProps } from '../navigation/typesNavigation';
 
type Props = ScreenProps<'Detail'>;
 
export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;

 
  return (
    <ScrollView style={detailStyles.container}>
      <View style={detailStyles.card}>
        <Text style={detailStyles.title}></Text>
 
        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Code</Text>
          <Text style={detailStyles.value}></Text>
        </View>
 
        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Credits</Text>
          <Text style={detailStyles.value}></Text>
        </View>
 
        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Teacher</Text>
          <Text style={detailStyles.value}></Text>
        </View>
 
        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity
            style={detailStyles.editButton}
            onPress={() => navigation.navigate('Form', { id: 1 })}
          >
            <Text style={detailStyles.editButtonText}>✏️ Edit</Text>
          </TouchableOpacity>
 
          <TouchableOpacity
            style={detailStyles.deleteButton}
            onPress={()=>{}}
          >
            <Text style={detailStyles.deleteButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
