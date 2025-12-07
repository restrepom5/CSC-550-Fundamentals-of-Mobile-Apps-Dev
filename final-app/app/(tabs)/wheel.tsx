import 'react-native-reanimated';
import React, { useState, memo } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, InputWidget, Panel1, Swatches, Preview, PreviewText, OpacitySlider, HueCircular } from 'reanimated-color-picker';

/*
Sources used:
https://alabsi91.github.io/reanimated-color-picker/
https://reactnative.dev/docs/layout-props
https://snack.expo.dev/@alabsi91/reanimated-color-picker?
*/

export default function Wheel() {
    const router = useRouter();
    const [color, setColor] = useState('#fff');
    const onColorChange = (color: ColorFormatsObject) => {
        'worklet';
        color.value = color.hex;
    };

    // runs on the js thread on color pick
    const onColorPick = (color: ColorFormatsObject) => {
        setColor(color.hex);
    };

    const add = "0F0F0F"
    const colorHex = parseInt(color.substring(1,), 16);
    const addHex = parseInt(add, 16);
    const newColor = addHex + colorHex;
    const forShadow = newColor.toString(16);

    console.log(color, colorHex, addHex, newColor, forShadow);

    return (
        <SafeAreaView
            style={styles.container}
            backgroundColor={color}
        >
            <View style={styles.colorPicker}>
                <ColorPicker
                    value={color}
                    sliderThickness={25}
                    thumbSize={25}
                    onChange={onColorChange}
                    onCompleteJS={onColorPick}
                >
                    <Preview
                        style={styles.preview}
                     />
                    <HueCircular
                        containerStyle={{justifyContent:'center'}}
                        thumbShape='pill'
                    >
                        <Panel1
                            style={styles.panel1}
                        />
                    </HueCircular>
                    <InputWidget
                        defaultFormat='hex'
                        formats={['HEX','RGB', 'HSL', 'HWB', 'HSV']}
                        inputStyle={{borderRadius:15}}
                    >
                    </InputWidget>
                </ColorPicker>

            </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        shadowColor= {forShadow}
                        onPress={() =>router.push({ pathname: "/details/[value]", params: { value: color }})}
                        >
                        <Text style={styles.buttonText}>Generate Palette</Text>
                    </Pressable>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '70%',
        marginVertical: '15%',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius:15,
        elevation: 20,
        },
    buttonText: {
        textAlign: 'center',
        color: '#505050',
        fontSize: 18,
        },
    buttonContainer: {
        alignItems: 'center',
        //marginVertical: 50,
        width: '100%',
        height: '100%',
        },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
    },
    colorPicker: {
        width: 350,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        },
    panel1: {
        borderRadius: 15,
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        },
    preview: {
        height: 40,
        borderRadius: 15,
        },

});