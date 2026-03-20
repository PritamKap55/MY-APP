import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ThemeProvider } from "./context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/accounts'); // make sure login.tsx exists
  };
  return (
    <ThemeProvider>
      <ThemedText type="title">
        Welcome!..
      </ThemedText>
      <Pressable style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </Pressable>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // vertical center
    alignItems: 'center',      // horizontal center
  },
  button: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30, // 👈 half of width/height
    backgroundColor: '#b71212',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});