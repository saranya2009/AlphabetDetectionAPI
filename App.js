import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Alert , Platform , Button} from 'react-native';
import PickImage from './screens/Camera'

export default class App extends React.Component{
render(){
return(

<PickImage/>

)
}
}