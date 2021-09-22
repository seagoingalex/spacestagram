import React, { useEffect, useState } from "react";
import '../assets/App.css';
import Header from "./Header"
import Home from "./Home"
import Profile from "./Profile"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import NasaDetails from "./NasaDetails"
import NewApodForm from "./NewApodForm"
import ProfileDetails from "./ProfileDetails"

import { Route, Switch, useHistory } from 'react-router-dom'

const apiKey = "quqeczazJ4D6huLcVhNJljA58RhApMCyv3KleLZk"

function App() {
  const [apodArray, setApodArray] = useState([])
  const [apodArrayParse, setApodArrayParse ] = useState(0)
  const [apodSelectionArray, setApodSelectionArray] = useState([])
  const [isLoggedIn, setLogIn] = useState(false)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [isLoadedImages, setIsLoadedImages] = useState(false)
  const [nasaImage, setNasaImage] = useState(null)

  const history = useHistory();

  //callback function pass down to RecruitDetail page for the Enlist Btn
  let flag = true;
  const onApodSelection = (selectedApod) => {
      setApodSelectionArray([...apodSelectionArray, selectedApod])
    
      if (apodSelectionArray.length === 0 ) {
        setApodSelectionArray([...apodSelectionArray, selectedApod])
      } else { apodSelectionArray.map(apod => {
                if (apod.id === selectedApod.id) {
                    flag = false; 
          }
    })
    if (flag){
      setApodSelectionArray([...apodSelectionArray, selectedApod])
      
    }
  }
    //make this herocard disappear from RecruitList
    const apodArrayAfterSelect = apodArray.filter(apod=>apod.id !== selectedApod.id)
    setApodArray(apodArrayAfterSelect)
  }

  const onAddToProfileBtnClick = (apodSelectionArray) => {
    
    apodSelectionArray.map(apod => {
      fetch("http://localhost:3000/teamMember", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentProfile,
          date: apod.date,
          title: apod.title,
          url: apod.url,
          explanation: apod.explanation
          })
      })
      .catch(error => console.error('Error:', error))
    })    
    // clear out heroSelectionArray 
    setApodSelectionArray([]);
    history.push("/")
    // Code is pushing to home for now, as pushing to team fails to render additions first
    // history.push("/team")
  }

  const onDisselectBtnClickInSelection = (disselectedApod) => {
    setApodSelectionArray(apodSelectionArray.filter(selectedApod => selectedApod.name !== disselectedApod.name))
    setApodArray([...apodArray, disselectedApod])
  }

  const handleLogIn = (signedInProfile) => {
    setLogIn(true)
    setCurrentProfile(signedInProfile)
  }

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=24`)
    // Alternative approach below, using start and end dates instead of randomized 24 count
    // fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2021-09-01&end_date=2021-09-21`)
    .then(response => response.json())
    .then(apodData => {
      setNasaImage(apodData)
      setIsLoadedImages(true)
    })
  }, [apodArrayParse])

  if (!isLoadedImages) return <h2>Loading...</h2>

  return (
    <div >
      <Header isLoggedIn={isLoggedIn} setLogIn={setLogIn} currentProfile={currentProfile} />
      <Switch>

        <Route exact path="/" component={() => <Home apodArray={apodArray} 
                                                    //  displayArray={displayArray}
                                                     nasaImage={nasaImage}
                                                     apodSelectionArray={apodSelectionArray} 
                                                     onAddToProfileBtnClick={onAddToProfileBtnClick}
                                                     onDisselectBtnClickInSelection={onDisselectBtnClickInSelection}
                                                     apodArrayParse={apodArrayParse}
                                                     setApodArrayParse={setApodArrayParse}
                                                     isLoadedImages={isLoadedImages}
                                                     currentProfile={currentProfile}
                                                     /> }  />
        <Route path="/nasa/:id" component={() => <NasaDetails apiKey={apiKey} isLoggedIn={isLoggedIn} onApodSelection={onApodSelection} setApodArray={setApodArray} apodArray={apodArray}/> }  />
        <Route path="/profile/:id" component={() => <ProfileDetails onApodSelection={onApodSelection} /> }  />
        <Route exact path="/profile" component={() => <Profile currentProfile={currentProfile} isLoggedIn={isLoggedIn}/> }  />
        <Route exact path="/addfavorite" component={() => <NewApodForm currentProfile={currentProfile} isLoggedIn={isLoggedIn}/> }  />
        <Route exact path="/signin" component={() => <SignIn onExistingProfileLogIn={handleLogIn} /> }  />
        <Route exact path="/signup" component={() => <SignUp onNewProfileSubmit={handleLogIn} /> }  />
      </Switch>
    </div>
  );
}

export default App;
