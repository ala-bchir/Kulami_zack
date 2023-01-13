import * as React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import pieceSixItem from '../../../assets/images/slider/six.png';

import styled from 'styled-components';



const ImgItem = styled.div`
    position: absolute;
    transform: scale(0.9);
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 195px;
    height: 291px;
    // background: url('../../../assets/images/slider/6.png') no-repeat center;
    background-size: fit-content;
    border-radius: 25px;
    // -webkit-box-shadow: -2px 5px 19px 5px #433F53; 
    // box-shadow: -2px 5px 19px 5px #433F53;
    cursor: grab;
`;


const Slider = () => {
    const [rotation, setRotation] = React.useState(0);

    const angle = 90;

    let activePiece: HTMLElement | null = null;

    let piece6 = [1,2,3,4];

    

    function grabPiece(e : React.MouseEvent){
        console.log(e.target);
        console.log(e);
        const element = e.target as HTMLElement;

        
        element.style.position = "absolute";
        const x = e.clientX - element.offsetWidth/2;
        const y = e.clientY - element.offsetHeight/2;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }

    function movePiece(e : React.MouseEvent){
        
        if(activePiece){
            activePiece.style.position = "absolute";
            const x = e.clientX - activePiece.offsetWidth/2;
            const y = e.clientY - activePiece.offsetHeight/2;

            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
            
        }

    }

    function dropPiece(e : React.MouseEvent){
        if(activePiece) activePiece = null;
    }

    function rotateImage(e: any){

        e.preventDefault();        
        const element = e.target;

        setRotation((rotation + angle) % 360) ;

        element.style.transform = `scale(0.9) rotate(${rotation}deg)`;
    }


    const listOfSixPiece = piece6.map(i =>{
        return <ImgItem key={i} onContextMenu={(e) => rotateImage(e)} onMouseUp={(e) => dropPiece(e)}  onMouseMove={(e) => movePiece(e)} style={{background:`url(${pieceSixItem})`}} onMouseDown={(e) => grabPiece(e) }></ImgItem>
     })
  return (<div className='gm-drag-img-content'>

    {/* <span className='gm-arrow-left'><AiOutlineArrowLeft/></span> */}
    {/* <span className='gm-arrow-right'><AiOutlineArrowRight/></span> */}
    
    {listOfSixPiece}
    
   
</div>);
};

export default Slider;
