import React from "react";
import ApodCard from "./ApodCard";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function ProfileMemberList({ apodArray, onDisselectBtnClickInTeamPage }) {
  
  // Material UI
  const classes = useStyles();

  const xsNum = 6;
  const smNum = 3;
  const seletedMemberCard = "seletedMemberCard";

   const disselectBtnId = "disselectBtnId"

  return (
    <div className="flex-container">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {apodArray.map(apod => <ApodCard 
                                    key={apod.id} 
                                    apod={apod} 
                                    apodTitle = {apod.title}
                                    apodImage={apod.url}
                                    apodId={apod.date}
                                    xsNum={xsNum}
                                    smNum={smNum}
                                    seletedMemberCard={seletedMemberCard}
                                    onDisselectBtnClick={onDisselectBtnClickInTeamPage}
                                    link={`profile/${apod.id}`}
                                    disselectBtnId={disselectBtnId}
                                    />)}
          </Grid>
        </div>
    </div>
  );
}

export default ProfileMemberList;