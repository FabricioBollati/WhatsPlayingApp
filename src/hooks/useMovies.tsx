import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MovieDbMoviesResponse, Movie} from '../interfaces/movieInterfaces';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovie = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise =
      movieDB.get<MovieDbMoviesResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDbMoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MovieDbMoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDbMoviesResponse>('/upcoming');

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
