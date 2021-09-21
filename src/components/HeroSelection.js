import React from "react";
import HeroCard from "./HeroCard";
import { useHistory } from "react-router-dom"

//import things for css
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function HeroSelection({ heroSelectionArray, onAddToTeamBtnClick, onDisselectBtnClickInSelection, currentTeam }) {
  //material ui thing
  const classes = useStyles();

  //props to pass down for css purpose
  const xsNum = 6;
  const smNum = 3;
  const seletedMemberCard = "seletedMemberCard";

  //useHistory for the AddToTeamBtn
  const history = useHistory();

  //Add To Team Btn handler
  const handleAddToTeamBtn = () => {
    
    //pass heroSelectionArray up the App.js for 1.POST to the database 2.filter out the heroArray when load 
    onAddToTeamBtnClick(heroSelectionArray)
    //push to team page
    history.push("/team")
  }


    return (
      
   
        <div className="flex-container">
          <h1>{currentTeam}</h1>
          <br></br>
            <div className={classes.root}>
              <Grid container spacing={3}>
                {heroSelectionArray.map(hero => <HeroCard 
                                                    key={hero.id} 
                                                    hero={hero} 
                                                    heroImage={hero.thumbnail.path + "." + hero.thumbnail.extension}
                                                    heroId={hero.id}
                                                    // link={`/recruit/${hero.id}`}
                                                    linke={""}
                                                    hoverEffectDisabledId={"hoverEffectDisabledId"}
                                                    xsNum={xsNum}
                                                    smNum={smNum}
                                                    seletedMemberCard={seletedMemberCard}
                                                    onDisselectBtnClick={onDisselectBtnClickInSelection}
                                                    />)}
              </Grid>
            </div>    
            <button className="add-to-team-btn" onClick={()=>{handleAddToTeamBtn()}}>Add To Your Team</button>
        </div>
  );
}

export default HeroSelection;
