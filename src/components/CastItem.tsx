import React from 'react';
import {Cast} from '../interfaces/creditsInteface';
import {Text, View, Image, StyleSheet} from 'react-native';

interface Props {
  actor: Cast;
}

export const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image
          source={{uri}}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
      )}
      <View style={styles.actorInfo}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{actor.name}</Text>
        <Text style={{fontSize: 14, opacity: 0.8}}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7,

    elevation: 9,
    marginRight: 15,
    marginLeft: 20,
    paddingRight: 5,
    height: 50,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
});
