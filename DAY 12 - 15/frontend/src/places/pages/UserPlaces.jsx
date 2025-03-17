import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`https://two0-days-of-js.onrender.com/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

const placeDEletedHandler = deletedPlaceId=>{
  setLoadedPlaces(prevPlaces => prevPlaces.filter(places=>places.id !== deletedPlaceId));
};


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDEletedHandler}/>}

      {!isLoading && (!loadedPlaces || loadedPlaces.length === 0) && (
        <div className="center">
          <h2>No places found.</h2>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
