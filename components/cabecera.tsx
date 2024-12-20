import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';


const Cabecera = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        TU HISTORIA
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20, padding: 20 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 10, color: '#00000', textAlign: 'center' },
  boton: {
    backgroundColor: 'coffe',
    paddingVertical: 20,  // Aumentamos el tamaño vertical
    paddingHorizontal: 40,  // Aumentamos el tamaño horizontal
    borderRadius: 60,  // Bordes más redondeados
    marginBottom: 20,  // Espacio entre botones
    shadowColor: '#000',  // Sombra
    shadowOffset: { width: 0, height: 10 },  // Sombra abajo
    shadowOpacity: 0.25,  // Sombra más suave
    shadowRadius: 10,  // Radio de difuminado
    elevation: 15,  // Sombra en Android
  },
  botonText: {
    color: 'black',
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cabecera;
