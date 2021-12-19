import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import { useState, useEffect } from 'react'
import { onSnapshot, collection, DocumentData } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const Map: NextPage = () => {

  const [data, setData] = useState<DocumentData>([]);
  const [selCourse, setSelCourse] = useState<DocumentData>([]);
  const [pickedCourse, setPickedCourse] = useState(false);

  useEffect(
    () => {
      onSnapshot(collection(db, "courses"), (snap) => {
        setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }), []
    })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbEOvWjYpb1OwoIAnYELfVy8B5dQM2j00",
  });

  const mapContainerStyle = {
    width: '364px',
    height: '30rem'
  };

  if (!isLoaded) return <h1>Loading Site</h1>;

  return (
    <>
      <TopBar />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={{ lat: 50.131675, lng: 15.739500 }}
      >
        {data.map((course: DocumentData) => (
          <Marker
            position={{ lat: course.lat, lng: course.lng }}
            onClick={() => { setSelCourse(course), setPickedCourse(true) }}
          />
        ))}
        {pickedCourse && (
          <InfoWindow
            position={{ lat: selCourse.lat, lng: selCourse.lng }}
            onCloseClick={() => setPickedCourse(false)}
          >
            <>
              <h1>{selCourse.name}</h1>
            </>

          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default Map