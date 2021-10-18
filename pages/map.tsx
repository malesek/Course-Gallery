import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import React, { useState, useEffect, useCallback } from 'react'
import { onSnapshot, collection, DocumentData } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import styled from 'styled-components'

const Map: NextPage = () => {

  const [data, setData] = useState<DocumentData>([]);

    useEffect(
    () => {
      onSnapshot(collection(db, "courses"), (snap) => {
        setData(snap.docs.map(doc => ({...doc.data(), id: doc.id})));
      }), []
    })
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: "AIzaSyCbEOvWjYpb1OwoIAnYELfVy8B5dQM2j00",
  });

  const mapContainerStyle = {
      width: "50vw",
      height: "50vh"
  };

  if(!isLoaded) return <h1>Loading Site</h1>;

  return(
      <>
          <TopBar/>
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center= {{lat: 50.131675, lng: 15.739500}}
          >
            {data.map((course: DocumentData) => 
              <Marker position={{lat: course.lat, lng: course.lng}}></Marker>
            )}
              
          </GoogleMap>
      </>
  );
}
export default Map