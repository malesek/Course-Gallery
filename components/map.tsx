import { useState, useEffect } from 'react'
import { onSnapshot, collection, DocumentData } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import styled from 'styled-components'

const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 302px;
    cursor: pointer;
    &:hover {
        border: 1px solid #777;
    }
`;
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

const IMG = styled.img`
    width: 290px;
    height: 150px;
    margin: 5px 5px 0 5px
`

const Map: React.FC = () => {

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
    width: '600px',
    height: '30rem'
  };

  if (!isLoaded) return <h1>Loading Site</h1>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={{ lat: 50.190841, lng: 15.668542 }}
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
            <IMG src={selCourse.img} alt={selCourse.name} />
            <H1>{selCourse.name}</H1>
            <Desc>{selCourse.place}</Desc>
            <Desc>{selCourse.holes} jamek</Desc>
          </>

        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map