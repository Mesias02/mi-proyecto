import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Pagina from './components/Pagina';  // Asegúrate de que la ruta de importación sea correcta
import Cabecera from './components/cabecera';  // Asegúrate de que la ruta de importación sea correcta

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Cabecera />  {/* Aquí se agrega el componente Cabecera */}
      <Pagina />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
