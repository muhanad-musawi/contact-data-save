import React,  {useState} from 'react'; 
import './User.css'
import './App.css';  




function User({id,name,email,onDelete,onEdit}) {

  const [isAddet ,setIsAddet ]= useState(false) //Toggle fuer is Added
  

  function handelDelete() {
   onDelete(id)

  } 

  function handelAddet() {
    setIsAddet(!isAddet);
    //if (isAddet === false ) {
      //setIsAddet(true)
    //}else { 
      //setIsAddet(false)
    //}
    //isEddet ? setIsAddet(true) : setIsEddet(false)
  }
  //const handleOnEditSubmit = (e)=>{}  ES6
  function handleOnEditSubmit(e){    // ES5
    e.preventDefault() // verhindert das automatische absenden vom gesamten Formular
   // console.log(id,e.target.name.value, e.target.email.value)
    onEdit(id,e.target.name.value, e.target.email.value);
    setIsAddet(false);
  }

  return (
    <div >
      {isAddet ? (
        <form onSubmit={handleOnEditSubmit}>
          <input name="name" defaultValue={name}/>
          <input name="email" defaultValue={email}/>
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ):(
        <div className='usersFeld'>  
       <div className='nameEmailFeld'>
          <div className=" name">{name}</div>
          <div className=" email">{email}</div> 
        </div>  
          <div className='editDeleteBTN'>
          <button className='btnFeld' onClick={handelAddet}>Edit</button>
          <button className='btnFeld'  onClick={handelDelete}>Delete</button> 
          </div>  
          <br/> 
        </div>
      )}
    </div>
  )
}

export default User