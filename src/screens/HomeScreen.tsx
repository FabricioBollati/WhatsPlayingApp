import React, {useContext} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovie} from '../hooks/useMovies';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {popular, nowPlaying, topRated, upcoming, isLoading} = useMovie();
  const {top} = useSafeAreaInsets();
  const {setMainColors, setPrevMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'transparent', secondary = 'transparent'] =
      await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View>
            <Carousel
              data={nowPlaying}
              renderItem={({item}) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={212}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
        </View>
        <HorizontalSlider movies={popular} title={'Popular'} />
        <HorizontalSlider movies={topRated} title={'Top Rated'} />
        <HorizontalSlider movies={upcoming} title={'Upcoming'} />
      </ScrollView>
    </GradientBackground>
  );
};
