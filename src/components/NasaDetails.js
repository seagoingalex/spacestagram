import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    color: "black"
  },
}));

function NasaDetails({ onApodSelection, isLoggedIn, setApodArray, apodArray, apiKey }) {
    const [apod, setApod] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { id } = useParams()

    const history = useHistory();
    
    function handleBack() {
        history.goBack()
    }

    useEffect(() => {
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((r) => r.json())
        .then(apod => {
          console.log(apod)
          setApod(apod);
          setIsLoaded(true);
        
        })
        .catch(e => {
          console.log(e);
        });
    }, [id]);

    if (!isLoaded) return <h2>Loading...</h2>;

    const enlistClickHandler = (e, hero) => {
      if(isLoggedIn) {
      //add hero to the heroSelectionArray & make this herocard disappear from RecruitList
      //callback fn defined on App.js
      onApodSelection(hero)
      console.log(hero)
      setApodArray(apodArray.filter(individual => individual.id !== hero.id))
      //push the page back to the home page 
      history.push('/')  
      } else {
        setAnchorEl(e.currentTarget)
      }
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const modalId = open ? 'simple-popover' : undefined;

    const apodImage = apod.url

  return (
    <>
    <div className="recruitDetailsContainer">

      <div className="detail-left-container">
        <img className="detail-img" src={apodImage}/>
       
        <div className="btngroup">
          <button className="detail-btn" onClick={handleBack}> Go Back</button>
          <button className="detail-btn" onClick={(e)=>{enlistClickHandler(e, apod)}}> Select</button>
        </div>
      </div>

      <div className="detail-right-container">
        <h2 className="detail-name"> {apod.date} | {apod.title}</h2>
        <h3 className="detail-description">Description:</h3>
        <p> {apod.explanation}</p>
      </div>

    </div>
    <Popover
        id={modalId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>You must be signed in to add images to your favorites!</Typography>
      </Popover>
    </>
  );
}

export default NasaDetails;