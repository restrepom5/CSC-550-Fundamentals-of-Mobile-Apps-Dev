import { Text, View } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e', // dark charcoal background
      }}
    >
      <Text style={{ fontSize: 28, color: '#dcdcaa', fontFamily: 'monospace' }}>
        {'const '}
        <Text style={{ color: '#569cd6' }}>hello</Text>
        {' = '}
        <Text style={{ color: '#ce9178' }}>"World!"</Text>
        ;
      </Text>
    </View>
  );
}
