import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';


const Cabecera = () => {
  const fadeAnim = new Animated.Value(0); // Animación de opacidad
  const scaleAnim = new Animated.Value(1); // Animación de escala

  useEffect(() => {
    // Animación de opacidad
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Animación de escala en bucle
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Contenedor animado */}
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Encapsulamos el texto dentro de un componente <Text> */}
        <Text style={styles.title}>TU HISTORIA</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: 'coffee',
    paddingVertical: 20, // Tamaño vertical
    paddingHorizontal: 40, // Tamaño horizontal
    borderRadius: 60, // Bordes redondeados
    marginBottom: 20, // Espaciado entre botones
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 10 }, // Dirección de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10, // Difuminado
    elevation: 15, // Elevación para Android
  },
  botonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cabecera;
