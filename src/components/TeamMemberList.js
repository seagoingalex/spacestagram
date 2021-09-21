import React from "react";
import HeroCard from "./HeroCard";

//import things for css
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function TeamMemberList({ heroArray, onDisselectBtnClickInTeamPage }) {
  //material ui thing
  const classes = useStyles();

  //props to pass down for css purpose
  const xsNum = 6;
  const smNum = 3;
  const seletedMemberCard = "seletedMemberCard";

   //props that pass that to hide the button
   const disselectBtnId = "disselectBtnId"

  return (
    <div className="flex-container">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {heroArray.map(hero => <HeroCard 
                                    key={hero.id} 
                                    hero={hero} 
                                    heroImage={hero.image}
                                    heroId={hero.heroId}
                                    xsNum={xsNum}
                                    smNum={smNum}
                                    seletedMemberCard={seletedMemberCard}
                                    onDisselectBtnClick={onDisselectBtnClickInTeamPage}
                                    link={`team/${hero.id}`}
                                    disselectBtnId={disselectBtnId}
                                    />)}
          </Grid>
        </div>
    </div>
  );
}

export default TeamMemberList;