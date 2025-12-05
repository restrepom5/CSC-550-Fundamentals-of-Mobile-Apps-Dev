import { useState } from 'react';
import { View, Pressable } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/themed-text';
import { books } from '@/mock-data/data';
import { GoogleBook } from '@/src/context/types';
import { useRouter } from 'expo-router';
import { useApp } from '@/src/context/provider';

type Props = { book: GoogleBook; setVisible: (visible: boolean) => void };

export default function DatePicker({ book, setVisible }: Props) {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const { user } = useApp();

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSetDate = (date: Date) => {
    books.push({
      id: books.length + 1,
      title: book.title,
      date: date.toDateString(),
      googleId: book.id,
      readingStatus: 'reading',
      bookclubId: user?.bookclubId || null,
    });
    setVisible(false);
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
      />
      <Pressable
        onPress={() => handleSetDate(date)}
        style={{ marginTop: 10, alignItems: 'center' }}
      >
        <ThemedText>Save</ThemedText>
      </Pressable>
    </View>
  );
}
