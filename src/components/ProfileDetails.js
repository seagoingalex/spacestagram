import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'

function ProfileDetails() {
    const [apod, setApod] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const { id } = useParams()

    const history = useHistory();
    
    function handleBack() {
        history.goBack()
    }

    useEffect(() => {
      fetch(`http://localhost:3000/teamMember/${id}`)
      .then((r) => r.json())
      .then((apod) => {
        setApod(apod);
        setIsLoaded(true);
      });
  }, [id]);

    const deselectClickHandler = () => {
        fetch(`http://localhost:3000/teamMember/${id}`, {
            method: 'DELETE',
            headers: {
              "Content-Type":"application/json"
            }
            })
        // .then(history.goBack())
        .catch(error => console.error('Error:', error))
          
        //push to Team page
        // history.goBack();
        history.push("/")
    }

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div className="recruitDetailsContainer">

      <div className="detail-left-container">
        <img className="detail-img" src={apod.url} />

        <div className="btngroup">
          <button className="detail-btn" onClick={handleBack}> Go Back</button>
          <button className="detail-btn" onClick={() =>{deselectClickHandler()}}>Remove from Favorites </button>
        </div>

      </div>

      <div className="detail-right-container">
        <h2 className="detail-name"> {apod.date} | {apod.title}</h2>
        <h3 className="detail-description" >Description:</h3>
        <p> {apod.explanation}</p>
      </div>
    </div>
  );
}

export default ProfileDetails;