// app/(tabs)/advanced.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSearchStore } from '@/stores/searchStore';
import { router } from "expo-router";

interface Option { id: string; name: string; }

const RARITIES: Option[] = [
  { id: 'common', name: 'Common' },
  { id: 'uncommon', name: 'Uncommon' },
  { id: 'rare', name: 'Rare' },
  { id: 'mythic', name: 'Mythic Rare' },
  { id: 'special', name: 'Special' },
];

const COLORS = [
  { id: 'W', name: 'White' },
  { id: 'U', name: 'Blue' },
  { id: 'B', name: 'Black' },
  { id: 'R', name: 'Red' },
  { id: 'G', name: 'Green' },
  { id: 'C', name: 'Colorless' },
  { id: 'only', name: 'Only' },
];

const SORT_OPTIONS: Option[] = [
  { id: 'name', name: 'Name (A-Z)' },
  { id: 'set', name: 'Set' },
  { id: 'released', name: 'Release Date' },
  { id: 'rarity', name: 'Rarity' },
  { id: 'color', name: 'Color' },
  { id: 'usd', name: 'Price (Low to High)' },
  { id: 'usd_desc', name: 'Price (High to Low)' },
  { id: 'cmc', name: 'Mana Value' },
  { id: 'power', name: 'Power' },
  { id: 'toughness', name: 'Toughness' },
  { id: 'edhrec', name: 'EDHREC Rank' },
  { id: 'artist', name: 'Artist' },
];

export default function AdvancedSearchScreen() {
  const isDark = useColorScheme() === 'dark';
  const { originalPrintingOnly, uniqueCardsOnly } = useSearchStore();

  const [loading, setLoading] = useState(false);

  // Filters
  const [oracleText, setOracleText] = useState('');
  const [selectedSets, setSelectedSets] = useState<Option[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [cmc, setCmc] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [manaCost, setManaCost] = useState('');
  const [minPower, setMinPower] = useState(0);
  const [minToughness, setMinToughness] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'set' | 'color' | 'colorId' | 'type' | 'rarity' | 'sort' | null>(null);
  const [searchText, setSearchText] = useState('');

  // Dynamic data
  const [sets, setSets] = useState<Option[]>([]);
  const [types, setTypes] = useState<Option[]>([]);

  useEffect(() => {
    loadCatalogs();
  }, []);

  const loadCatalogs = async () => {
    try {
      const [setsRes, typesRes] = await Promise.all([
        fetch('https://api.scryfall.com/sets'),
        fetch('https://api.scryfall.com/catalog/card-types'),
      ]);

      const [setsData, typesData] = await Promise.all([setsRes.json(), typesRes.json()]);

      setSets(setsData.data.map((s: any) => ({
        id: s.code,
        name: `${s.name} (${s.code.toUpperCase()})`
      })));

      const liveTypes = typesData.data.map((t: string) => ({
        id: t.toLowerCase(),
        name: t
      }));

      setTypes([
        { id: 'OR', name: 'OR (exact match between types)' },
        ...liveTypes
      ]);
    } catch (err) {
      console.error('Failed to load catalogs', err);
    }
  };

  // RESET ALL FILTERS
  const resetAllFilters = () => {
    setOracleText('');
    setSelectedSets([]);
    setSelectedColors([]);
    setSelectedColorIds([]);
    setCmc(0);
    setSelectedTypes([]);
    setSelectedRarities([]);
    setManaCost('');
    setMinPower(0);
    setMinToughness(0);
    setSortBy('name');
    Keyboard.dismiss();
  };

  const toggleSelection = (
    id: string,
    current: any[],
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setter(prev => {
      const exists = prev.some(item =>
        typeof item === 'string' ? item === id : item.id === id
      );

      if (exists) {
        return prev.filter(item =>
          typeof item === 'string' ? item !== id : item.id !== id
        );
      } else {
        if (modalType === 'set') {
          const name = sets.find(s => s.id === id)?.name || id.toUpperCase();
          return [...prev, { id, name }];
        }
        return [...prev, id];
      }
    });
  };

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setSearchText('');
    setModalVisible(true);
  };

  const getSelectedCount = (arr: any[]) => arr.length > 0 ? ` (${arr.length})` : '';

  const buildQuery = () => {
    const parts: string[] = [];

    if (oracleText.trim()) parts.push(`o:"${oracleText.trim()}"`);
    if (selectedSets.length) parts.push(`e:${selectedSets.map(s => s.id).join('+')}`);
    if (selectedColorIds.length) parts.push(`ci:${selectedColorIds.join('')}`);
    if (cmc > 0) parts.push(`mv<=${cmc}`);

    if (selectedTypes.length > 0) {
      const hasOR = selectedTypes.includes('OR');
      const actualTypes = selectedTypes.filter(t => t !== 'OR');
      if (actualTypes.length > 0) {
        const typeString = hasOR && actualTypes.length > 1
          ? actualTypes.join(' OR ')
          : actualTypes.join('+');
        parts.push(`t:${typeString}`);
      }
    }

    // COLOR PARSING — Fixed & Perfect
    if (selectedColors.length) {
      const hasOnly = selectedColors.includes('only');
      const rawColors = selectedColors.filter(c => ['W','U','B','R','G','C'].includes(c));

      if (rawColors.length > 0) {
        const sorted = rawColors.sort((a, b) => 
          'WUBRGC'.indexOf(a) - 'WUBRGC'.indexOf(b)
        );

        if (sorted.length === 1) {
          const lower = sorted[0].toLowerCase();
          parts.push(hasOnly ? `c!${lower}` : `c:${lower}`);
        } else {
          const colorStr = sorted.join('');
          parts.push(hasOnly ? `c!${colorStr}` : `c>=${colorStr}`);
        }
      }
    }

    if (selectedRarities.length) parts.push(`r:${selectedRarities.join('+')}`);
    if (manaCost.trim()) parts.push(`mana:${manaCost.trim()}`);
    if (minPower > 0) parts.push(`pow>=${minPower}`);
    if (minToughness > 0) parts.push(`tou>=${minToughness}`);

    let query = parts.join(' ');
    if (originalPrintingOnly) query += ' is:first_printing';

    return query.trim();
  };

  const performSearch = async () => {
    const query = buildQuery();
    if (!query) {
      alert('Please add at least one filter');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const unique = uniqueCardsOnly ? 'cards' : 'prints';
      const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=${unique}&order=${sortBy}`;

      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.details || 'Search failed');
      }

      const data = await res.json();
      const cards = data.data || [];

      useSearchStore.getState().setLastResults(cards);
      router.push("/lazy-search-modal");

    } catch (err: any) {
      const msg = err.message.includes('too many')
        ? 'Too many results — try adding more filters'
        : err.message;
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderModalItem = (item: Option) => {
    let isSelected = false;
    if (modalType === 'set') isSelected = selectedSets.some(s => s.id === item.id);
    if (modalType === 'color') isSelected = selectedColors.includes(item.id);
    if (modalType === 'colorId') isSelected = selectedColorIds.includes(item.id);
    if (modalType === 'type') isSelected = selectedTypes.includes(item.id);
    if (modalType === 'rarity') isSelected = selectedRarities.includes(item.id);
    if (modalType === 'sort') isSelected = sortBy === item.id;

    return (
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          if (modalType === 'set') toggleSelection(item.id, selectedSets, setSelectedSets);
          if (modalType === 'color') toggleSelection(item.id, selectedColors, setSelectedColors);
          if (modalType === 'colorId') toggleSelection(item.id, selectedColorIds, setSelectedColorIds);
          if (modalType === 'type') toggleSelection(item.id, selectedTypes, setSelectedTypes);
          if (modalType === 'rarity') toggleSelection(item.id, selectedRarities, setSelectedRarities);
          if (modalType === 'sort') { 
            setSortBy(item.id);
            setModalVisible(false);
          }
        }}
      >
        <Text style={styles.modalText}>{item.name}</Text>
        {isSelected && <Ionicons name="checkmark" size={28} color="#9333ea" />}
      </TouchableOpacity>
    );
  };

  const getModalData = () => {
    let data: Option[] = [];
    if (modalType === 'set') data = sets;
    if (modalType === 'color' || modalType === 'colorId') data = COLORS;
    if (modalType === 'type') data = types;
    if (modalType === 'rarity') data = RARITIES;
    if (modalType === 'sort') data = SORT_OPTIONS;

    return data.filter(d => d.name.toLowerCase().includes(searchText.toLowerCase()));
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      {/* HEADER WITH CLEAR ALL BUTTON */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Advanced Search</Text>
        <TouchableOpacity onPress={resetAllFilters} style={styles.clearBtn}>
          <Ionicons name="trash-outline" size={26} color="#9333ea" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Card text (oracle)..."
        placeholderTextColor="#888"
        value={oracleText}
        onChangeText={setOracleText}
      />

      <View style={styles.filtersGrid}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('set')}>
          <Text style={styles.filterText}>Set{getSelectedCount(selectedSets)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('color')}>
          <Text style={styles.filterText}>Color{getSelectedCount(selectedColors)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('colorId')}>
          <Text style={styles.filterText}>Color ID{getSelectedCount(selectedColorIds)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('type')}>
          <Text style={styles.filterText}>Type{getSelectedCount(selectedTypes)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('rarity')}>
          <Text style={styles.filterText}>Rarity{getSelectedCount(selectedRarities)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => openModal('sort')}>
          <Text style={styles.filterText}>
            Sort: {SORT_OPTIONS.find(s => s.id === sortBy)?.name || 'Name'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Mana Value ≤ {cmc === 0 ? 'Any' : cmc}</Text>
        <Slider minimumValue={0} maximumValue={20} value={cmc} onValueChange={setCmc} step={1} />
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Power ≥ {minPower === 0 ? 'Any' : minPower}</Text>
        <Slider minimumValue={0} maximumValue={20} value={minPower} onValueChange={setMinPower} step={1} />
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>Toughness ≥ {minToughness === 0 ? 'Any' : minToughness}</Text>
        <Slider minimumValue={0} maximumValue={20} value={minToughness} onValueChange={setMinToughness} step={1} />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={performSearch}>
        <Text style={styles.searchBtnText}>Search Scryfall</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#9333ea" style={{ marginTop: 20 }} />
      )}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {modalType === 'set' ? 'Select Sets' :
               modalType === 'color' ? 'Select Colors' :
               modalType === 'colorId' ? 'Select Color Identity' :
               modalType === 'type' ? 'Select Types' :
               modalType === 'rarity' ? 'Select Rarity' : 
               modalType === 'sort' ? 'Sort By' : ''}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.modalSearch}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />

          <FlatList
            data={getModalData()}
            renderItem={({ item }) => renderModalItem(item)}
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  header: { fontSize: 20, fontWeight: '600', color: '#fff' },
  clearBtn: {
    padding: 8,
    backgroundColor: '#222',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: { backgroundColor: '#111', color: '#fff', padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  filtersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  filterBtn: { backgroundColor: '#222', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  filterText: { color: '#ccc', fontSize: 14, fontWeight: '600' },
  sliderRow: { marginBottom: 20 },
  sliderLabel: { color: '#ccc', marginBottom: 8, fontSize: 15 },
  searchBtn: { backgroundColor: '#9333ea', padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 20 },
  searchBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  modal: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 10 },
  modalTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },
  modalSearch: { backgroundColor: '#222', color: '#fff', margin: 16, padding: 12, borderRadius: 12 },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#333' },
  modalText: { color: '#fff', fontSize: 16 },
});