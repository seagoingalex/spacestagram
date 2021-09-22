import React from "react";
import ApodSelection from "./ApodSelection"
import NasaList from "./NasaList"



function Home({ isLoadedImages, apodArray, apodSelectionArray, onAddToProfileBtnClick, onDisselectBtnClickInSelection, apodArrayParse, setApodArrayParse, currentProfile, nasaImage }) {

  return (
    <div className="HomeContainer">
      {
        apodSelectionArray.length === 0 ?
        <h1 className="home-h2">Select a galactic image to learn more! </h1>
        :
        <ApodSelection apodSelectionArray={apodSelectionArray}
                       onAddToProfileBtnClick={onAddToProfileBtnClick}
                       onDisselectBtnClickInSelection={onDisselectBtnClickInSelection}
                       currentProfile={currentProfile}
        />
      }
        <NasaList isLoadedImages={isLoadedImages} apodArray={apodArray} apodArrayParse={apodArrayParse} setApodArrayParse={setApodArrayParse} nasaImage={nasaImage}/>
    </div>
  );
}

export default Home;