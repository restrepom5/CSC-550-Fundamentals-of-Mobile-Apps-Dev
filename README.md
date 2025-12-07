I'm using React Native DevTools to debug. In my application, I know that a performance bottleneck would have to be my use of inline functions.
Everytime a render occurs, the function gets called again. In my camera.tsx, for example, I'm using inline functions a couple of times.
on the line

    <TouchableOpacity style={styles.button} onPress={() => setUri(null)}> 

I should have defined that outside of TouchableOpacity with

    const resetImage = useCallback(() => setUri(null), []); 
    <TouchableOpacity onPress={resetImage}>
