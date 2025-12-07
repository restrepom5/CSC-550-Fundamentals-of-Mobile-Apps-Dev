import { CameraView, CameraType, CameraMode, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'expo-image';
import { getColors } from 'react-native-image-colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

/*
Sources used:
https://docs.expo.dev/versions/latest/sdk/camera/
https://www.npmjs.com/package/react-native-image-colors
https://www.reddit.com/r/reactnative/comments/1bh1p24/im_getting_error_when_checking_camera_permission/
https://markadamfoster.com/react-native-stylesheet-helpers/
https://docs.expo.dev/versions/latest/sdk/imagepicker/
*/

export default function Camera() {
    const router = useRouter();

    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [mode, setMode] = useState<CameraMode>('picture');
    const [colors, setColors] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        if (!permission) return;
        if (!permission.granted) {
            requestPermission();
            }
        }, [permission, requestPermission]);

    useEffect(() => {
        if (!uri) return;
        (async () => {
            const result = await getColors(uri, {
                pixelSpacing: 5,
            })
            switch (result.platform) {
                case 'android':
                case 'web':
                    setColors(result.dominant)
                    break
            //Not sure if this will work, but adding to see if I can test on my phone
                case 'ios':
                    setColors(result.primary)
                    break
                default:
                    setColors(null)
            }
        })();
        }, [uri]);

    const takePicture = async () => {
        //const options = { quality: 0.5, skipProcessing: true };
        const photo = await ref.current?.takePictureAsync();
        if (photo?.uri) {
            setUri(photo.uri);
            //console.log("worked");
            }
      };

    const albumPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            <Text>Permission to access the media library is required.</Text>
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
        //console.log(result);

        setUri(result.assets[0].uri);
        //console.log(result.assets[0].uri, typeof(result.assets[0].uri));
    };


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }

    const genPalette = () => {
        //console.log(colors);
        if (!colors) return;
        router.push({
            pathname: "/details/[value]",
            params: { value: colors }
            });
        };

    const renderPicture = (uri: string) => {
        //console.log("pic rend");
        //console.log(colors);
        return(
            <View>
                <Image
                  source={{ uri }}
                  contentFit="contain"
                  style={styles.imagePreview}
                />
                <TouchableOpacity style={styles.button} onPress={() => setUri(null)}>
                    <Text style={styles.buttonText}>Retake</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.button} onPress={genPalette}>
                     <Text style={styles.buttonText}>Generate Palette</Text>
                  </TouchableOpacity>
            </View>
        );
    };

    const renderCamera = () => {
        return (
            <View style={styles.camContainer}>
                <CameraView
                    ref= {ref}
                    style={styles.cam}
                    facing={facing}
                    mode={mode}
                    onCameraReady={()=>{
                        //console.log("cam ready");
                        setIsCameraReady(true);
                        }}
                >
                </CameraView>

                <View style={styles.overlay}>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <Ionicons name="sync" size={50} color="#aaaaaa" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePicture} style={styles.button}>
                        <Ionicons name="radio-button-on" size={75} color="#aaaaaa" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={albumPhoto} style={styles.button}>
                        <Ionicons name="images-outline" size={50} color="#aaaaaa" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {uri ? renderPicture(uri) : renderCamera()}
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        left:0,
        right: 0,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#31313180",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    camContainer: StyleSheet.absoluteFillObject,
    cam: StyleSheet.absoluteFillObject,

    buttonText: {
        backgroundColor: 'white',
        color: 'black',
    },
    imagePreviewContainer: {
        width: '100%',
    },
    imagePreview: {
        flex: 1,
        width: '100%',
        aspectRatio: 1,
        margin: 20,
    },
});