// components/lazyImage.tsx
import React, { useState, useEffect } from 'react';
import { Image, ImageProps, View, ActivityIndicator, StyleSheet } from 'react-native';

interface LazyImageProps extends ImageProps {
  uri: string;
}

export default function LazyImage({ uri, style, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[style, styles.wrapper]}>
      {!loaded && <ActivityIndicator style={StyleSheet.absoluteFill} size="small" color="#9333ea" />}
      <Image
        source={{ uri }}
        style={style}
        onLoadEnd={() => setLoaded(true)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
});
