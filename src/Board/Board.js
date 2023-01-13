
import { useState } from 'react';


import MapCarre from '../Maps/MapCarre';
import { UserContext } from './components/Player';
import { LastContext } from './components/Lastpick';
import { FirstContext } from './components/First';
import { PlayedContext } from './components/PlayedPlacement';
import { BeforeLastContext} from './components/BeforeLastpick';
import  {Maps}  from '../Maps/MapRandom';
import { get } from 'https';


function Board() {
  const NbPieces = 17;
  const [player,setPlayer] = useState(true)
  const [lastpick,setLastpick] = useState({x:0,y:0,piece:""})
  const [beforelastpick,setBeforeLastpick] = useState({x:0,y:0,piece:""})
  const [first,setFirst] = useState(true)
  const [played,setPlayed] = useState([])
  const [map,setMap] = useState(true)//_________________________________

  const [score,setScore] = useState(new Array(NbPieces).fill(0));
  const [scoreP1,setScoreP1] = useState(0);
  const [scoreP2,setScoreP2] = useState(0);
  const [p1,setP1] = useState([]);
  const [p2,setP2] = useState([]);
  const [winner,setWinner] = useState("Winner:")
  

  
  function calculScore() {
    /*Calcule de score pour chaque piece (le tableau new score contient 9 cases , chaque case présente le socre d'une seule pièce  )
    on parcours le tableau des emplacement et pour chaque bille placé on regarde le joueur qui l'a placé et la piece ou elle appartient */
    const newScore = new Array(NbPieces).fill(0);
    // calcule le vainqueur de chaque piece 
    played.forEach(element => {
      
      if(element.player === true){
        console.log("rouge")
        newScore[element.piece] += 1;
        setScore(newScore);
      }
      if(element.player === false){
        console.log("noir")
        newScore[element.piece] -= 1 ;
        setScore(newScore);
      }
      
    })
    // atributer a chaque joueur la piece qui l'a emporté 
    for(let i = 0;i < newScore.length;i++){
      console.log(i)
      if(newScore[i]>0){
        setP1(prev=>{
          return [...prev,i]
        })
      }
      if(newScore[i]<0){
        setP2(prev=>{
          return [...prev,i]
        })
      }

    }
    // derterminer le score de chaque joueur 
    p1.forEach(e=>{
      for(let i = 0 ; i< played.length;i++){
        if(e===played[i].piece){
          setScoreP1(prev=>{
            return prev+= played[i].type
          })
          break ;
        }
      
      }
    })

    p2.forEach(e=>{
      for(let i = 0 ; i< played.length;i++){
        if(e===played[i].piece){
          setScoreP2(prev=>{
            return prev+= played[i].type
          })
          break ;
        }
      
      }
    })

    // determiner le vainqueur : 
    if (scoreP1>scoreP2){setWinner("Winner : Rouge")}
    else if (scoreP1<scoreP2){setWinner("Winner : Noir")}
    else if (scoreP1 === scoreP2){setWinner("Winner : Match Null")}

    



    console.log(played)
    console.log("pieces appartenant à  p1: "+ p1)
    console.log("pieces appartenant à p2: "+p2)
    console.log("score du rouge :"+scoreP1)
    console.log("score du Noir: "+scoreP2)
    console.log("pieces appartenant à : "+ p1)
    console.log("pieces appartenant à : "+p2)
    


   
    
  }
  
  function getRandomMap(){
    let i = Math.floor(Math.random() * 5)
    return Maps[i]
  }

  function choisirMap() {
    if(map === true){
      return (
        <MapCarre/>
      )
    }else{
      return getRandomMap();
    }
  }



  

  return (
    
    <div className="App">
      

      <BeforeLastContext.Provider value={{beforelastpick,setBeforeLastpick}}>
      <FirstContext.Provider value={{first,setFirst}}>
      <LastContext.Provider value={{lastpick,setLastpick}}>
      <UserContext.Provider value={{player,setPlayer}}>
      <PlayedContext.Provider value ={{played,setPlayed}}>
      
      {choisirMap()}
      
      
      
      </PlayedContext.Provider>
      </UserContext.Provider>
      </LastContext.Provider>
      </FirstContext.Provider>
      </BeforeLastContext.Provider>
      
      <div>{player?"Current Player: 1":"Current Player: 2"}</div>
      <button onClick={calculScore}>click me ! </button>
      <div>{winner}</div>
      <div>{`Joueur Rouge ${scoreP1}`}</div>
      <div>{`Joueur noir ${scoreP2}`}</div>
      
      
      
      
     

    </div>
    
  
  );
}

export default Board;
