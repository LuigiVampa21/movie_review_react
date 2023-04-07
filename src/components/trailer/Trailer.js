import React from 'react';
import './Trailer.css';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';



const Trailer = () => {

  const params = useParams();
  const link = params.id;
  const linkIsValid = link !== null && link !== undefined;

  return (
    <div className='react-player-container'>
      {linkIsValid && (
        <ReactPlayer controls="true" playing={true} url={`https://www.youtube.com/watch?v=${link}`} width='100%' height='100%' />
      )}
    </div>
  )
}

export default Trailer
