import { useRouter } from "expo-router";
import { useState, useReducer } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';

const { width } = Dimensions.get("window");

function reducer(state, action) {
  switch (action.type) {
    case 'mood':
      return { ...state, mood: action.value }
    case 'log':
      return { ...state, log: action.value }
    default:
          return state;
  }
}

export default function Modal() {
    //const navigation = useNavigation();
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, {mood:'', log:''});

    const moodList = [
        { label: 'Happy', value: '1' },
        { label: 'Sad', value: '2' },
        { label: 'Nervous', value: '3' },
        { label: 'Tired', value: '4' },
        { label: 'Neutral', value: '5' },
        { label: 'Excited', value: '6' },
        ];

    const submitHandler = () => {
        const stateString = JSON.stringify(state);
        router.replace({
              pathname: "(tabs)/tracker",
              params: { entry: stateString },
        });
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                data={moodList}
                labelField="label"
                valueField="value"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.placeholderStyle}
                searchPlaceholder="Search..."
                value={state.mood}
                onChange={(selection) => {
                    dispatch({ type: 'mood', value: selection.label })
                    }}
            />

            <TextInput
                editable
                multiline
                numberOfLines={5}
                maxLength={50}
                value={state.log}
                placeholder="Add a note for today"
                placeholderTextColor="rgba(163, 177, 138, 0.6)"
                style={styles.textInputStyle}
                onChangeText={(text) => {
                    dispatch({ type: 'log', value: text })
                    }}
                />
            <TouchableOpacity style={styles.button} onPress={submitHandler}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        justifyContent: "center"
        },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        alignItems: "baseline",
        },
    inputText: {
        color: "#ccc",
        fontSize: 16,
        },
    text: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 8
        },
    subtext: {
        color: "#ccc",
        fontSize: 16,
        marginBottom: 24
        },
    button: {
        width: width * 0.85,
        backgroundColor: "#3a5a40",
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        },
    buttonText: {
        color: "#DAD7CD",
        fontSize: 18,
        fontWeight: "600"
        },
    placeholderStyle: {
        color: "#DAD7CD",
        fontSize: 18,
        },
    textInputStyle: {
        backgroundColor: "#1c1c1e",
        color: "#DAD7CD",
        fontSize: 18,
        borderColor: "#111",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        margin: 15,
        width: width * 0.85,
        //alignItems: "baseline",
        },
    });