import React from "react";
import ApodCard from "./ApodCard"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function NasaList({ isLoadedImages, apodArray, onApodSelection, apodArrayParse, setApodArrayParse, nasaImage}) {
  const classes = useStyles();

  const xsNum = 6;
  const smNum = 2;
  
  const disselectBtnId = "disselectBtnId"

  const handleNext = () => {
    setApodArrayParse(apodArrayParse + 1)
  }

  if (!isLoadedImages) return <h2>Loading...</h2>

  return (
    <div className="flex-container">
      
        <div className={classes.root}>
          <button onClick={handleNext} className="next-btn-in-list">Next</button>
          <Grid container spacing={3}>
            {nasaImage.map(apod => <ApodCard 
                                              key={apod.date} 
                                              apod={apod} 
                                              apodTitle = {apod.title}
                                              apodId={apod.date}
                                              onApodSelection={onApodSelection}
                                              xsNum={xsNum}
                                              smNum={smNum}
                                              disselectBtnId={disselectBtnId}
                                              apodImage={apod.url}
                                              link={`/nasa/${apod.date}`}
                                              />)}
          </Grid>

          <button onClick={handleNext} className="next-btn-in-list">Next</button>
        </div>
    </div>
  );
}

export default NasaList;