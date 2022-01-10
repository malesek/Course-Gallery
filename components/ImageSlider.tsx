import { useEffect, useState } from "react"
import { collection, DocumentData, query, getDocs, where } from "@firebase/firestore"
import { db } from "../firebase/firebase";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa"
import styled from "styled-components"

const Slider = styled.div`
position: relative;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IMG = styled.img`
  width:100%;
  height:100%;
  padding:0;
  margin:0;
  border-radius: 10px;
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

const PhotoDesc = styled.p`
    position: absolute;
    color: #fff;
    font-size: 30px;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ImageDiv = styled.div`
    position:relative;
    width:1000px;
    height:600px;
`

const DescSpan = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20%;
    background-color: rgba(0,0,0,0.8);
    border-radius: 0 0 10px 10px;
`

type Props = {
    courseId: string | string[] | undefined
}


const ImageSlider: React.FC<Props> = ({ courseId }) => {

    const [imgData, setImgData] = useState<DocumentData>([]);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        dbQuery()
    })

    const dbQuery = async () => {
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
                        {index == current &&
                            <ImageDiv>
                                <IMG src={image.url} alt={image.url} key={image.url} />
                                {image.photoDesc &&
                                    <DescSpan>
                                        <PhotoDesc>
                                            {image.photoDesc}
                                        </PhotoDesc>
                                    </DescSpan>
                                }
                            </ImageDiv>
                        }

                    </>
                )
            })}
        </Slider>
    )
}

export default ImageSlider