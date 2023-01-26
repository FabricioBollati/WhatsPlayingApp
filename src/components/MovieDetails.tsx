import React from 'react';
import {View, Text} from 'react-native';
import {MovieFull} from '../interfaces/movieInterfaces';
import {Cast} from '../interfaces/creditsInteface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import {CastItem} from './CastItem';
import {FlatList} from 'react-native-gesture-handler';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text>{movieFull.vote_average}</Text>
          <Text style={{marginLeft: 5}}>
            {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 3,
            fontWeight: 'bold',
          }}>
          Historia
        </Text>
        <Text style={{fontSize: 15}}>{movieFull.overview}</Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 3,
            fontWeight: 'bold',
          }}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 15}}>
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>
      </View>
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 3,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem actor={item} />}
          style={{marginTop: 10, height: 70}}
        />
      </View>
    </>
  );
};
