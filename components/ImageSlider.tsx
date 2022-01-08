import { useEffect, useState } from "react"
import { onSnapshot, collection, DocumentData, query, getDocs, where } from "@firebase/firestore"
import { db } from "../firebase/firebase";
import Image from "next/image"
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa"
import styled from "styled-components"

const Slider = styled.div`
position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IMG = styled.img`
  border-radius: 10px;
  width:1000px;
  height:600px;
`

const LeftArrow = styled(FaArrowAltCircleLeft)`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`
const RightArrow = styled(FaArrowAltCircleRight)`
position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`

type Props = {
    courseId: string | string[] | undefined
}


const ImageSlider: React.FC<Props> = ({ courseId }) => {

    const [imgData, setImgData] = useState<DocumentData>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fc()
    })

    const fc = async () => {
        const q = query(collection(db, `${courseId}`), where("validate", "==", true));
        const querySnapshot = await getDocs(q);
        const images = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setImgData(images)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? imgData.length - 1 : current - 1)
    };
    const nextSlide = () => {
        setCurrent(current === imgData.length - 1 ? 0 : current + 1)
    };

    return (
        <Slider>
            <LeftArrow onClick={prevSlide} />
            <RightArrow onClick={nextSlide} />
            {Object.keys(imgData).map((key, index) => {
                const image = imgData[index];
                return (
                    <>
                        {index == current && <IMG src={image.url} alt={image.url} key={image.url} />}
                    </>
                )
            })}
        </Slider>
    )
}

export default ImageSlider