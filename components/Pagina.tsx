import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity, Modal, FlatList } from 'react-native';

const fondo = require('../assets/libro.jpg'); 

const Pagina = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(1)).current;
  const [personaje, setPersonaje] = useState('');
  const [lugar, setLugar] = useState('');
  const [accion, setAccion] = useState('');
  const [showPersonajesModal, setShowPersonajesModal] = useState(false);
  const [showLugaresModal, setShowLugaresModal] = useState(false);
  const [showAccionesModal, setShowAccionesModal] = useState(false);

  const personajes = ['Héroe', 'Villano', 'Sabio'];
  const lugares = ['Bosque', 'Ciudad', 'Castillo'];
  const acciones = ['Salvar el mundo', 'Robar un tesoro', 'Entrenar para la batalla'];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, { toValue: 100, duration: 2000, useNativeDriver: true }),
        Animated.timing(moveAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, { toValue: 2, duration: 1000, useNativeDriver: false }),
        Animated.timing(shineAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
      ])
    ).start();
  }, [moveAnim, shineAnim]);

  const handleBotonPress = () => alert('¡Vamos a empezar la historia!');
  const openPersonajesModal = () => setShowPersonajesModal(true);
  const openLugaresModal = () => setShowLugaresModal(true);
  const openAccionesModal = () => setShowAccionesModal(true);

  const handleCrearHistoria = () => {
    if (personaje && lugar && accion) alert(`Historia: Un/a ${personaje} va al ${lugar} a ${accion}.`);
    else alert('Por favor, selecciona un personaje, lugar y acción.');
  };

  const generarHistoria = () => personaje && lugar && accion ? `Un/a ${personaje} va al ${lugar} a ${accion}.` : 'Por favor, selecciona un personaje, lugar y acción para crear la historia.';

  return (
    <ImageBackground source={fondo} style={styles.container} resizeMode="cover">
      <TouchableOpacity style={styles.botonBlanco} onPress={handleBotonPress}><Text style={styles.botonText}>Selecciona 😍</Text></TouchableOpacity>
      <View style={styles.botonesCentro}>
        <TouchableOpacity style={styles.boton} onPress={openPersonajesModal}><Text style={styles.botonText}>Personaje</Text></TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={openLugaresModal}><Text style={styles.botonText}>Lugar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={openAccionesModal}><Text style={styles.botonText}>Acción</Text></TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={handleCrearHistoria}><Text style={styles.botonText}>Crear Historia</Text></TouchableOpacity>
      </View>

      <Modal visible={showPersonajesModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList data={personajes} renderItem={({ item }) => (
            <TouchableOpacity style={styles.modalButton} onPress={() => { setPersonaje(item); setShowPersonajesModal(false); }}>
              <Text style={styles.botonText}>{item}</Text>
            </TouchableOpacity>
          )} keyExtractor={(item, index) => index.toString()} />
        </View>
      </Modal>

      <Modal visible={showLugaresModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList data={lugares} renderItem={({ item }) => (
            <TouchableOpacity style={styles.modalButton} onPress={() => { setLugar(item); setShowLugaresModal(false); }}>
              <Text style={styles.botonText}>{item}</Text>
            </TouchableOpacity>
          )} keyExtractor={(item, index) => index.toString()} />
        </View>
      </Modal>

      <Modal visible={showAccionesModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList data={acciones} renderItem={({ item }) => (
            <TouchableOpacity style={styles.modalButton} onPress={() => { setAccion(item); setShowAccionesModal(false); }}>
              <Text style={styles.botonText}>{item}</Text>
            </TouchableOpacity>
          )} keyExtractor={(item, index) => index.toString()} />
        </View>
      </Modal>

      <View style={styles.historiaContainer}>
        <Text style={styles.historiaText}>{generarHistoria()}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, width: '100%', height: '100%' },
  botonBlanco: { backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, marginBottom: 10 },
  boton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, marginBottom: 10 },
  botonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  botonesCentro: { justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalButton: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10 },
  historiaContainer: { marginTop: 30, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10 },
  historiaText: { fontSize: 18, fontWeight: 'bold', color: 'black' },
});

export default Pagina;
