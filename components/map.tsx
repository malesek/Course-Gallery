import { useState, useEffect } from 'react'
import { onSnapshot, collection, DocumentData } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import styled from 'styled-components'
import React from 'react'

const H1 = styled.h1`
    font-size: 20px;
    text-align: center;
`;

const Desc = styled.div`
    text-align: center;
    &:last-child{
        margin-bottom: 3%;
    }
`;

const IW = styled(InfoWindow)`
z-index:+4;
`

const IMG = styled.img`
    width: 290px;
    height: 150px;
    margin: 5px 5px 0 5px;
`

const mapContainerStyle = {
  width: '1000px',
  height: '500px'
};

const center = { lat: 50.190841, lng: 15.668542 };

const Map: React.FC = () => {

  const [data, setData] = useState<DocumentData>([]);
  const [selCourse, setSelCourse] = useState<DocumentData>([]);
  const [pickedCourse, setPickedCourse] = useState(false);

  useEffect(
    () => {
      const unsub = onSnapshot(collection(db, "courses"), (snap) => {
        setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      })
      return unsub()
    }, [])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBoxiAsFgb_VpPuhWeN-0dpUwIbMNOwbjY",
  });

  if (!isLoaded) return <h1>Loading Map</h1>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
    >
      {data.map((course: DocumentData) => (
        <Marker
          position={{ lat: course.lat, lng: course.lng }}
          onClick={() => { setSelCourse(course), setPickedCourse(true) }}
        />
      ))}
      {pickedCourse && (
        <IW
          position={{ lat: selCourse.lat, lng: selCourse.lng }}
          onCloseClick={() => setPickedCourse(false)}
        >
          <>
            <IMG src={selCourse.img} alt={selCourse.name} />
            <H1>{selCourse.name}</H1>
            <Desc>{selCourse.place}</Desc>
            <Desc>{selCourse.holes} jamek</Desc>
          </>
        </IW>
      )}
    </GoogleMap>
  );
}

export default Map