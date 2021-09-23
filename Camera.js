   
import React from 'react';
import { Alert, Button , Image , Platform, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as permissions from "expo-permissions";
import { Component } from "react";

export default class PickImage extends React.Component{
state={
    image:null,
}

getPermissionsAsync = async()=>{
    if(Platform.OS !== "web"){
        const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status !== "granted"){
        Alert.alert("We need to access your camera permission for this work .")
    }
    }
}

componentDidMount(){
this.getPermissionsAsync()
}

_pickImage = async()=>{
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.cancelled){
            this.setState({
                image: result.data
            })
            this.uploadImage(result.uri)
        }
    }
    catch(e){
        console.log(e)
    }
}

uploadImage  = async(uri)=>{
    const data = new FormData
    let filename = uri.split("/")[uri.split("/").length-1]
    let type = `image/${uri.split('.')[uri.split('.').lenght-1]}`
    const filetoupload = {
        uri:uri,
        name:filename,
        type:type
    }

    data.append("digit",filetoupload)
    fetch("http://718b398b8f9b.ngrok.io/predict-digit",{
        method:"POST",
        body:data,
        headers:{"content-type":"multipart/form-data"}

    }).then((response)=>response.json())
    .then((result)=>{
        console.log("success",result)
    })
    .catch((error)=>{
        console.error("Error",error)
    })
}

render(){
    let {image} = this.state;
    return(

<View>
    <Button
    title="Pick an image"
    onPress={this._pickImage}
    />
</View>
    )
}

}