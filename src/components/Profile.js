import React,{ useEffect,useState } from "react";
import ProfileMemberList from "./ProfileMemberList";

function Profile({ currentProfile, isLoggedIn }) {
  
  const [profileArray, setProfileArray] = useState([])

  const onDisselectBtnClickInTeamPage = (disselectedHero) => {
    //Delete from database 
    fetch(`http://localhost:3001/teamMember/${disselectedHero.id}`, {
      method: 'DELETE',
      })
      .catch(error => console.error('Error:', error))
    
    //Delete from teamArray
    setProfileArray(profileArray.filter(teamMember=> teamMember.name !== disselectedHero.name))
  }

  useEffect(()=>{
    fetch("http://localhost:3001/teamMember")
	  .then(res => res.json())
    .then(data => setProfileArray(data.filter(teamMember => teamMember.userId === currentProfile)) )
    .catch(error => console.error('Error:', error))
  },[])

  return (
    <div className="teamPage">
        {isLoggedIn ?
        <>
        <h1>{currentProfile}</h1>
        <ProfileMemberList apodArray={profileArray}
                        onDisselectBtnClickInTeamPage={onDisselectBtnClickInTeamPage}
                        />
        </>
        :
        <>
        <h1>Log in to your profile to see your favorite astronomy pics of the day!</h1>
        <br></br>
        </>
        }
    </div>
  );
}

export default Profile;