import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from "axios";

/*
Sources used:
https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api
https://reactnative.dev/docs/network
https://huemint.com/about/
https://axios-http.com/docs/post_example
https://stackoverflow.com/questions/54390652/flatlist-looping-through-nested-array-in-react-native
*/

type HuemintOutput = {
    palette: string[];
    score: number;
    };

type HuemintResponse = {
    results: HuemintOutput[];
    };

type ItemProps = {
    item: HuemintOutput
    };

export default function Details() {
    const router = useRouter();
    const { value } = useLocalSearchParams();
    const params = String(Object.values({value}));
    const [palettes, setPalettes] = useState<HuemintOutput[]>([]);

    //console.log(typeof(params),{ value } ,params);

    useEffect(() => {
        const genPalettes = async ()=>{
            const adjacency = new Array(25).fill("0");

            const rp = await axios.post<HuemintResponse>('https://api.huemint.com/color', {
                mode: "transformer",
                num_colors: 5,
                temperature: 1.2,
                num_results: 5,
                adjacency,
                palette:[params, "-", "-", "-", "-"],
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        }
                    })
            setPalettes(rp.data.results.slice(0,5));
            //console.log(rp.data);
        }
        genPalettes();
        }, [params]);

    //console.log(palettes);
    const palettesSorted = [...palettes].sort((a,b)=> b.score - a.score);

    const Item = ({item}: ItemProps) => {
        return (
            <View style={styles.container}>
                {item.palette.map(newItem => {
                    return (
                        <View style={[styles.swatch,{backgroundColor: newItem}]}><Text style={styles.swatchText}>{newItem}</Text></View>
                        );
                    })}
            </View>
            );
        }

    return (
        <SafeAreaView>
            <FlatList
                data={palettesSorted}
                renderItem={row => {
                    return (<Item {...row}/>);
                    }}
                keyExtractor={({score}) => score}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        },
    swatch: {
        padding: 5,
        width: 70,
        height: 150,
        },
    swatchText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#505050',
        backgroundColor: 'white',
        borderRadius: 10,
        },
    });