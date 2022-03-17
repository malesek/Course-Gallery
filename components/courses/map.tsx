import { useState, useEffect } from 'react'
import { onSnapshot, collection, DocumentData, query, getDocs } from '@firebase/firestore'
import { db } from '../../firebase/firebase'
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

  const [data, setData] = useState<DocumentData>();
  const [selCourse, setSelCourse] = useState<DocumentData>([]);
  const [pickedCourse, setPickedCourse] = useState(false);

  useEffect(
    () => {
      dbQuery()
      return () => {setData([])}
    }, [])
    const dbQuery = async () => {
      const q = query(collection(db, "courses"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      setData(data)
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyArT-SuoiFIleiipD0YhiLlwobTFuUFf_o",
  });

  if (!isLoaded) return <h1>Loading Map</h1>;
  
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
    >
      {data?.map((course: DocumentData) => (
        <Marker
          position={{ lat: course.lat, lng: course.lng }}
          onClick={() => { setSelCourse(course), setPickedCourse(true) }}
          key={course.id}
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