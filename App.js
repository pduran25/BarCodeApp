import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Linking, Alert, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
   // actualizarCodigo(data);
    console.log('LectorStarth');
    console.log('Type: ' + type + '\nData: ' + data)
    console.log('Probando');
  };

  const abrirCodigo = async () => {
      try {
        let str = text;
        let url = "https://malldelsol-gift.netlify.app/?codigo=";
        var valor = str.replace("https://malldelsol-landing.netlify.app/?codigo=", "");
        if(valor.length > 2 ){
          valor = str.replace("https://malldelsol-landing.netlify.app?codigo=", "");
        }
        url = url + valor;

        openUrl(url);
        setText("Código abierto con éxito");
        setScanned(false);

      } catch (error) {
        console.log("un error cachado Data saldopedIENTEEE");
        console.log("ERROR CACHADO " + error);
      }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  async function openUrl(url){
    const isSupported = await Linking.canOpenURL(url);
        if(isSupported){
            await Linking.openURL(url)
        }else{
            Alert.alert('No se encontro el Link');
        }
}

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Abrir Código'} onPress={() => abrirCodigo()} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
