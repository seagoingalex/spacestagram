import React from "react";

// react-router-dom Imports
import { Link } from 'react-router-dom';

//import css from material ui
import Grid from '@material-ui/core/Grid';

function ApodCard( {apod, xsNum, smNum, seletedMemberCard, disselectBtnId, onDisselectBtnClick, apodImage, apodId, link, hoverEffectDisabledId} ) {

  const handleDisselectBtn = () => {
    onDisselectBtnClick(apod)
  }

  return (
 
      <Grid item xs={xsNum} sm={smNum} >
        <Link to={link} id={hoverEffectDisabledId}> 
          <div className="flex-card" id={seletedMemberCard}>
              <img className="img-in-card" src={apodImage} />
              <div className="hero-info-container">
                <h3 className="hero-name">{apod.title}</h3>
              </div>
          </div>
        </Link>
        <button className="del-btn" id={disselectBtnId} onClick={()=>{handleDisselectBtn()}}> Deselect</button>
      </Grid>
  );
}

export default ApodCard;
