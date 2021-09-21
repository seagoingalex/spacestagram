import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from 'react-router-dom'

function TeamDetails({ onHeroSelection }) {
    const [hero, setHero] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const { id } = useParams()

    const history = useHistory();
    
    function handleBack() {
        history.goBack()
    }

    useEffect(() => {
      fetch(`http://localhost:3000/teamMember/${id}`)
      .then((r) => r.json())
      .then((hero) => {
        setHero(hero);
        setIsLoaded(true);
      });
  }, [id]);

  if (!isLoaded) return <h2>Loading...</h2>;

    const deselectClickHandler = () => {
        //delete request 
        fetch(`http://localhost:3000/teamMember/${id}`, {
            method: 'DELETE',
            headers: {
              "Content-Type":"application/json"
            }
            })
        // .then(history.goBack())
        .catch(error => console.error('Error:', error))
          
        //push to Team page
        history.goBack();
    }

  return (
    <div className="recruitDetailsContainer">

      <div className="detail-left-container">
        <img className="detail-img" src={hero.image} />

        <div className="btngroup">
          <button className="detail-btn" onClick={handleBack}> Go Back</button>
          <button className="detail-btn" onClick={() =>{deselectClickHandler()}}>Remove from team </button>
        </div>

      </div>

      <div className="detail-right-container">
        <h2 className="detail-name">{hero.name}</h2>
        <h3 className="detail-description" >Description:</h3>
        { hero.description ==="" ?
        <p> Sorry, it doesn't seem like Marvel cares about this super hero enough to give him/her a description 😔 </p>
        :
        <p> {hero.description}</p>
        }
      </div>


    </div>
  );
}

export default TeamDetails;