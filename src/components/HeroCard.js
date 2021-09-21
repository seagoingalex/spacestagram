import React from "react";

// react-router-dom Imports
import { Link } from 'react-router-dom';

//import css from material ui
import Grid from '@material-ui/core/Grid';

function HeroCard( {hero, xsNum, smNum, seletedMemberCard, disselectBtnId, onDisselectBtnClick, heroImage, heroId,link, hoverEffectDisabledId} ) {

  //handle the disselectBtn
  const handleDisselectBtn = () => {
    //callback fn that declare on App
    onDisselectBtnClick(hero)
  }
  
  // const heroImage = hero.thumbnail.path + "." + hero.thumbnail.extension

  return (
 
      <Grid item xs={xsNum} sm={smNum} >
        <Link to={link} id={hoverEffectDisabledId}> 
          <div className="flex-card" id={seletedMemberCard}>
              <img className="img-in-card" src={heroImage} />
              <div className="hero-info-container">
                <h3 className="hero-name">{hero.name}</h3>
                {/* <h4 className="hero-location">Hero Id: {heroId}</h4>              */}
              </div>
          </div>
        </Link>
        <button className="del-btn" id={disselectBtnId} onClick={()=>{handleDisselectBtn()}}> Deselect</button>
      </Grid>
  );
}

export default HeroCard;
