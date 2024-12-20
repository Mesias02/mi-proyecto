import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

const Cabecera = () => {
  // Crear un valor de animación para el texto
  const fadeAnim = new Animated.Value(0); // 0: invisible, 1: visible
  const scaleAnim = new Animated.Value(1); // Para el efecto de "destello"

  // Ejecutar las animaciones cuando el componente se monta
  React.useEffect(() => {
    // Animación de opacidad
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true, // Usar el driver nativo para mejorar el rendimiento
    }).start();

    // Animación de destello (escala)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Aumenta el tamaño para el efecto de destello
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Vuelve al tamaño original
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Texto principal de la cabecera con animaciones */}
      <Animated.Text
        style={[
          styles.title,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        Creando historias
      </Animated.Text>
    </View>
  );
};

// Estilos para el componente Cabecera
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347', // Color vibrante para el destello
    textAlign: 'center',
  },
});

export default Cabecera;
