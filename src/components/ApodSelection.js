import React from "react";
import ApodCard from "./ApodCard";
import { useHistory } from "react-router-dom"

//import items for css
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function ApodSelection({ apodSelectionArray, onAddToProfileBtnClick, onDisselectBtnClickInSelection, currentProfile }) {
  
  //Material UI
  const classes = useStyles();

  //props to pass down for css purposes
  const xsNum = 6;
  const smNum = 3;
  const seletedMemberCard = "seletedMemberCard";

  //useHistory for the AddToTeamBtn
  const history = useHistory();

  const handleAddToProfileBtn = () => {
    onAddToProfileBtnClick(apodSelectionArray)
    // history.push("/team")
  }

    return (
        <div className="flex-container">
          <h1>{currentProfile}</h1>
          <br></br>
            <div className={classes.root}>
              <Grid container spacing={3}>
                {apodSelectionArray.map(apod => <ApodCard 
                                                    key={apod.date} 
                                                    apod={apod} 
                                                    apodTitle = {apod.title}
                                                    apodImage={apod.url}
                                                    apodId={apod.date}
                                                    linke={""}
                                                    hoverEffectDisabledId={"hoverEffectDisabledId"}
                                                    xsNum={xsNum}
                                                    smNum={smNum}
                                                    seletedMemberCard={seletedMemberCard}
                                                    onDisselectBtnClick={onDisselectBtnClickInSelection}
                                                    />)}
              </Grid>
            </div>    
            <button className="add-to-team-btn" onClick={()=>{handleAddToProfileBtn()}}>Save Current Selection To Favorites</button>
        </div>
  );
}

export default ApodSelection;
