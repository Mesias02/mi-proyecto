import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity, Modal, FlatList } from 'react-native';

// Importamos la imagen desde la carpeta 'assets'
const fondo = require('../assets/papiro.jpg'); // Cambia el path si es necesario

const Pagina = () => {
  // Referencia para la animación de movimiento
  const moveAnim = useRef(new Animated.Value(0)).current;

  // Referencia para la animación de brillo
  const shineAnim = useRef(new Animated.Value(1)).current;

  // Estado para manejar las selecciones de personaje, lugar y acción
  const [personaje, setPersonaje] = useState('');
  const [lugar, setLugar] = useState('');
  const [accion, setAccion] = useState('');

  // Estado para manejar la visibilidad de los modales
  const [showPersonajesModal, setShowPersonajesModal] = useState(false);
  const [showLugaresModal, setShowLugaresModal] = useState(false);
  const [showAccionesModal, setShowAccionesModal] = useState(false);

  // Listas de opciones
  const personajes = ['Héroe', 'Villano', 'Sabio'];
  const lugares = ['Bosque', 'Ciudad', 'Castillo'];
  const acciones = ['Salvar el mundo', 'Robar un tesoro', 'Entrenar para la batalla'];

  // Animación para mover el texto
  useEffect(() => {
    Animated.loop(
      Animated.sequence([ 
        Animated.timing(moveAnim, {
          toValue: 100,  // Mueve el texto 100 unidades hacia la derecha
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,  // Vuelve el texto a su posición original
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animación para el brillo del texto
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 2,  // Aumenta el brillo
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shineAnim, {
          toValue: 1,  // Restaura el brillo
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [moveAnim, shineAnim]);

  // Función para manejar el clic del botón "Selecciona"
  const handleBotonPress = () => {
    alert('¡Vamos a empezar la historia!');
  };

  // Funciones para abrir los modales de selección
  const openPersonajesModal = () => setShowPersonajesModal(true);
  const openLugaresModal = () => setShowLugaresModal(true);
  const openAccionesModal = () => setShowAccionesModal(true);

  // Función para crear la historia
  const handleCrearHistoria = () => {
    if (personaje && lugar && accion) {
      alert(`Historia: Un/a ${personaje} va al ${lugar} a ${accion}.`);
    } else {
      alert('Por favor, selecciona un personaje, lugar y acción.');
    }
  };

  // Generar la historia combinando las selecciones
  const generarHistoria = () => {
    if (personaje && lugar && accion) {
      return `Un/a ${personaje} va al ${lugar} a ${accion}.`;
    } else {
      return 'Por favor, selecciona un personaje, lugar y acción para crear la historia.';
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.container} resizeMode="cover">
      {/* Botón blanco "Selecciona" alineado a la izquierda */}
      <TouchableOpacity style={styles.botonBlanco} onPress={handleBotonPress}>
        <Text style={styles.botonText}>Selecciona  👋</Text>
      </TouchableOpacity>

      {/* Vista para los otros botones alineados en el centro */}
      <View style={styles.botonesCentro}>
        <TouchableOpacity style={styles.boton} onPress={openPersonajesModal}>
          <Text style={styles.botonText}>Personaje</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={openLugaresModal}>
          <Text style={styles.botonText}>Lugar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={openAccionesModal}>
          <Text style={styles.botonText}>Acción</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={handleCrearHistoria}>
          <Text style={styles.botonText}>Crear Historia</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar personaje */}
      <Modal visible={showPersonajesModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList
            data={personajes}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalButton} onPress={() => { setPersonaje(item); setShowPersonajesModal(false); }}>
                <Text style={styles.botonText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>

      {/* Modal para seleccionar lugar */}
      <Modal visible={showLugaresModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList
            data={lugares}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalButton} onPress={() => { setLugar(item); setShowLugaresModal(false); }}>
                <Text style={styles.botonText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>

      {/* Modal para seleccionar acción */}
      <Modal visible={showAccionesModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <FlatList
            data={acciones}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalButton} onPress={() => { setAccion(item); setShowAccionesModal(false); }}>
                <Text style={styles.botonText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>

      {/* Contenedor para mostrar la historia */}
      <View style={styles.historiaContainer}>
        <Text style={styles.historiaText}>{generarHistoria()}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Estilo para ImageBackground
  container: {
    flex: 1,  // Hace que el ImageBackground ocupe todo el espacio disponible
    justifyContent: 'center',  // Centra el contenido de la pantalla verticalmente
    alignItems: 'center',  // Centra el contenido de la pantalla horizontalmente
    paddingLeft: 20,  // Agrega espacio a la izquierda para el botón "Selecciona"
    width: '100%',  // Asegura que la imagen cubra el ancho completo de la pantalla
    height: '100%',  // Asegura que la imagen cubra el alto completo de la pantalla
  },
  // Estilo del botón blanco "Selecciona"
  botonBlanco: {
    backgroundColor: 'white',  // Fondo blanco para el botón
    paddingVertical: 10,  // Espaciado vertical
    paddingHorizontal: 30,  // Espaciado horizontal
    borderRadius: 20,  // Bordes redondeados
    marginBottom: 10, // Espacio entre el botón y los otros
  },
  // Estilo del botón rojo
  boton: {
    backgroundColor: 'red',  // Fondo rojo para el botón
    paddingVertical: 10,  // Espaciado vertical
    paddingHorizontal: 30,  // Espaciado horizontal
    borderRadius: 20,  // Bordes redondeados
    marginBottom: 10, // Espacio entre botones
  },
  // Estilo del texto dentro del botón
  botonText: {
    color: 'black',  // Texto negro para los botones con fondo blanco y texto blanco para los otros
    fontSize: 18,  // Tamaño de fuente del texto del botón
    fontWeight: 'bold',  // Hace que el texto del botón sea en negrita
  },
  // Estilos para la sección central de botones
  botonesCentro: {
    justifyContent: 'center',  // Centra los botones
    alignItems: 'center',  // Centra los botones
    marginTop: 20,  // Da espacio superior
  },
  // Estilos del modal
  modal: {
    flex: 1,
    justifyContent: 'center',  // Centra los elementos dentro del modal
    alignItems: 'center',  // Centra los elementos dentro del modal
    backgroundColor: 'rgba(0,0,0,0.7)',  // Fondo semi-transparente
  },
  // Estilo de los botones dentro del modal
  modalButton: {
    backgroundColor: 'white',  // Fondo blanco para los botones del modal
    padding: 10,  // Espaciado alrededor del texto
    borderRadius: 10,  // Bordes redondeados
    marginBottom: 10,  // Espacio entre los botones
  },
  // Estilo del contenedor de la historia generada
  historiaContainer: {
    marginTop: 30,  // Da un margen superior
    padding: 20,  // Da un espaciado interior
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Fondo blanco semi-transparente
    borderRadius: 10,  // Bordes redondeados
  },
  // Estilo del texto de la historia generada
  historiaText: {
    fontSize: 18,  // Tamaño de fuente del texto
    fontWeight: 'bold',  // Texto en negrita
    color: 'black',  // Color negro para el texto
  },
});

export default Pagina;
