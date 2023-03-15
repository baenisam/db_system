import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from 'react-native-sound';
import beep from '../assets/sound/beep.mp3';


Sound.setCategory('Playback');

var ding = new Sound(beep, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});


//const sound = JSON.parse(audio);

export const playPause = async () => {
    var item = await AsyncStorage.getItem('changeSound');
    item = JSON.parse(item)

    if(item === true){
  ding.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
}

};



