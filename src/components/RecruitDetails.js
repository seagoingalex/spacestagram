import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from 'react-router-dom'
import Comics from "./Comics"
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    color: "black"
  },
}));

function RecruitDetails({ onHeroSelection, isLoggedIn, setHeroArray, heroArray }) {
    const [hero, setHero] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { id } = useParams()

    const history = useHistory();
    
    function handleBack() {
        history.goBack()
    }

    useEffect(() => {
      fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=c8d257c5c8de3331d6de741ea71c6a3a`)
        .then((r) => r.json())
        .then((hero) => {
          setHero(hero.data.results[0]);
          setIsLoaded(true);
        });

    }, [id]);

    if (!isLoaded) return <h2>Loading...</h2>;

    const enlistClickHandler = (e, hero) => {
      if(isLoggedIn) {
      //add hero to the heroSelectionArray & make this herocard disappear from RecruitList
      //callback fn defined on App.js
      onHeroSelection(hero)
      console.log(hero)
      setHeroArray(heroArray.filter(individual => individual.id !== hero.id))
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

    const heroImage = hero.thumbnail.path + "." + hero.thumbnail.extension


  return (
    <>
    <div className="recruitDetailsContainer">

      <div className="detail-left-container">
        <img className="detail-img" src={heroImage}/>
       
        <div className="btngroup">
          <button className="detail-btn" onClick={handleBack}> Go Back</button>
          <button className="detail-btn" onClick={(e)=>{enlistClickHandler(e, hero)}}> Enlist</button>
        </div>
      </div>

      <div className="detail-right-container">
        <h2 className="detail-name"> {hero.name}</h2>
        <h3 className="detail-description">Description:</h3>
        { hero.description ==="" ?
        <p> Sorry, it doesn't seem like Marvel cares about this super hero enough to give him/her a description 😔 </p>
        :
        <p> {hero.description}</p>
        }
        <Comics id={id}/>
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
        <Typography className={classes.typography}>You must be signed in to add heroes to your team!</Typography>
      </Popover>
    </>
  );
}

export default RecruitDetails;