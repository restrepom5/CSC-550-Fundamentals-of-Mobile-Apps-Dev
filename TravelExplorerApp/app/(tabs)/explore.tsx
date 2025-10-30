import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {useState} from 'react';
import { usaStates } from 'typed-usa-states';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Link, useRouter } from "expo-router";


//const statesList = usaStates.map(usaState => usaState.name).flat();
const statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const num = Array.from({length: statesList.length}, (_, i) => i + 1);

type StatesList = {
    id: number;
    state: string;
    };

const states: StatesList[] = [];

for (let i=0; i < statesList.length; i++) {
    var stateObject = {
        id: num[i],
        state: statesList[i]
        }
    states.push(stateObject);
    }
export{states}

export default function Explore() {
    const router = useRouter();

    type RenderItemProps = {
        item: StatesList
        onPress: () => void
        }

    const Item = ({item, onPress}: RenderItemProps) => (
        <View>
          <TouchableOpacity onPress={onPress} style={[styles.card]}>
            <Text style={[styles.cardText]}>{item.state}</Text>
          </TouchableOpacity>
      </View>
    );

    const renderItem = ({ item }: {item:StatesList}) => {
      return (
        <Item
        item={item}
        onPress={() =>router.push({ pathname: "/details/[id]", params: { id: item.id }})}
        />
      );
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore by State</Text>
      <View style={{flexDirection:'row'}}>
      <FlatList contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          data={states}
          renderItem={renderItem}
          keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DAD7CD",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    padding: 20,
    marginVertical: 6,
  },
  cardText: { color: "#DAD7CD", fontSize: 18 },
});