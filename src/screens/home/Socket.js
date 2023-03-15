import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react';
import { io } from 'socket.io-client';
import SocketIOClient from "socket.io-client/dist/socket.io.js";
import socketIO from 'socket.io-client'
const socket = SocketIOClient("http://192.168.232.11:8080")

const Socket = () => {
    //console.log(socket)
    
    const [isConnected, setIsConnected] = React.useState();
    const [lastPong, setLastPong] = React.useState(null);
    const sendPing = () => {
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("Salut")
    })
    }

  return (
    <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }}>
      <Text>Socket </Text>
      <Button title='Envoyer' onPress={sendPing} />
    </View>
  )
}

export default Socket

const styles = StyleSheet.create({})