import React from 'react';
import {Movie} from '../interfaces/movieInterfaces';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View style={{height: title ? 255 : 240}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>
        {title}
      </Text>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
