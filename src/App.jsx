import logo from './logo.svg';
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import { listMovies } from './graphql/queries';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import { Paper, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FavoriteIcon from '@material-ui/icons/Favorite';


Amplify.configure(awsconfig);


function App() {

  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetchTrailers();
  }, []);

  const fetchTrailers = async () => {
      try {
          const trailerData = await API.graphql(graphqlOperation(listMovies));
          const trailerList = trailerData.data.listMovies.items;
          console.log('Trailer list', trailerList);
          setTrailers(trailerList);
      } catch (error) {
          console.log('error on fetching Trailers', error);
      }
  };



  return (
    <div className="App">
      <header className="App-header">
      <AmplifySignOut />
      <h2>IMDB Trailers - Clone</h2>
      </header>

      <div className="trailerList">
      {trailers.map((trailer, idx) => {
          return (
              <Paper variant="outlined" elevation={2} key={`trailer${idx}`}>
                  <div className="trailerCard">
                      <IconButton aria-label="play">
                          <PlayArrowIcon />
                      </IconButton>
                      <div>
                          <div className="trailerTitle">{trailer.title}</div>
                          <div className="trailerOwner">{trailer.owner}</div>
                      </div>
                      <div>
                          <IconButton aria-label="rating">
                              <FavoriteIcon />
                          </IconButton>
                          {trailer.rating}
                      </div>
                      {/* <div className="trailerDescription">{trailer.description}</div> */}
                  </div>
              </Paper>
          );
      })}
  </div>




    </div>
  );
}

export default withAuthenticator(App);
