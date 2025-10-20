import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

const { width } = Dimensions.get('window');

const galleries: Record<string, CarouselItem[]> = {
 
  destinations: [
    {
      id: '1',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.HuVpDIJtY3gmr8CEN7Y2PgHaEk%3Fcb%3D12%26pid%3DApi&f=1&ipt=9b3fb9a716cb8b43301bad0c04965fc3c98f1d9608f644a70a46535bf9c4468a&ipo=images',
      title: 'Ocean View',
      description: 'Two bedrooms, breaksfast included',
    },
    {
      id: '2',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.qU3pD1cJYja7267cT31J6wHaHa%3Fcb%3D12%26pid%3DApi&f=1&ipt=b8ff0023e1877d406b4568321905e87ebe14530006171c42b34038954f2e3dd0&ipo=images',
      title: 'Luxury Villa -Dominican Republic',
      description: 'Pool and all meals included.',
    },

    {
      id: '3',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.7G8o0dLfwHBy5Emy6P-jegAAAA%3Fcb%3D12%26pid%3DApi&f=1&ipt=f1d193eeffa6b94e25d008a659e665f04dbbeb71d5fad39aee900ab4216c1914&ipo=images',
      title: 'Family Friendly',
      description: 'All meals included, private pool, attraction park near by.',
    },

    {
      id: '4',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthvnext.bing.com%2Fth%2Fid%2FOIP.-vfnUgyLKmAoEuErF1pRpgHaE7%3Fcb%3D12%26pid%3DApi%26ucfimg%3D1&f=1&ipt=0dcea4bf2a3e8357a055a656e1d69207350155435305c6fa155c70f01510c152&ipo=images',
      title: 'Mountain Cabin',
      description: 'Hiking tours, breakfast included.',
    },
  ],
 
};

const ImageCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const { gallery } = useLocalSearchParams<{ gallery: string }>();
   const router = useRouter();

  const data = galleries[gallery || ''];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  if (!data) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Gallery not found</Text>
        <Text style={styles.description}>The gallery "{gallery}" does not exist.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : undefined,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
              <Text style={styles.goBackText}>⬅ Go Back</Text>
            </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width,
  },
  goBackText: {
    color: "#fff",
    fontSize: 16,
  },
  goBackButton: {
    position: "absolute",
    top: 700,
    left: 20,
    zIndex: 10,
    backgroundColor: "#072fe4ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 500,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default ImageCarousel;
