// components/CardDetailModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface Card {
  id: string;
  name: string;
  image_uris?: {
    small?: string;
    normal?: string;
    large?: string;
    png?: string;
  };
  card_faces?: Array<{
    name?: string;
    image_uris?: {
      small?: string;
      normal?: string;
      large?: string;
      png?: string;
    };
  }>;
}

type Props = {
  card: Card | null;
  visible: boolean;
  onClose: () => void;
};

export default function CardDetailModal({ card, visible, onClose }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isBackFace, setIsBackFace] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!card) return null;

  const getImageUri = () => {
    if (card.card_faces && card.card_faces.length > 1) {
      const face = isBackFace ? card.card_faces[1] : card.card_faces[0];
      return (
        face.image_uris?.png ||
        face.image_uris?.large ||
        face.image_uris?.normal ||
        face.image_uris?.small ||
        'https://via.placeholder.com/240x335?text=No+Image'
      );
    }
    return (
      card.image_uris?.png ||
      card.image_uris?.large ||
      card.image_uris?.normal ||
      card.image_uris?.small ||
      'https://via.placeholder.com/240x335?text=No+Image'
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.modal, { backgroundColor: isDark ? '#111' : '#fff' }]}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
              {card.name}
            </Text>

            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => card.card_faces && setIsBackFace(!isBackFace)}
              disabled={!card.card_faces}
            >
              <Image
                source={{ uri: getImageUri() }}
                style={styles.cardImage}
                resizeMode="contain"
              />
              {card.card_faces && (
                <View style={styles.flipHint}>
                  <Text style={styles.flipText}>Tap to flip</Text>
                </View>
              )}
            </TouchableOpacity>

            {card.card_faces && (
              <Text style={[styles.faceName, { color: isDark ? '#aaa' : '#666' }]}>
                {isBackFace ? card.card_faces[1]?.name : card.card_faces[0]?.name}
              </Text>
            )}

            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.minus]}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.qtyNumber, { color: isDark ? '#fff' : '#000' }]}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.plus]}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxWidth: 380,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardImage: {
    width: 240,
    height: 335,
    borderRadius: 14,
    backgroundColor: '#000',
  },
  flipHint: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  flipText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  faceName: { marginTop: 12, fontSize: 16, fontStyle: 'italic' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24, gap: 20 },
  qtyBtn: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  minus: { backgroundColor: '#ef4444' },
  plus: { backgroundColor: '#22c55e' },
  qtyText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  qtyNumber: { fontSize: 36, fontWeight: 'bold', minWidth: 60, textAlign: 'center' },
});