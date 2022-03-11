import React, { useState } from 'react'; 
import './AddUser.css';
 
//input = Öffnendes HTML Tag Element mit dem Namen INPUT
// placeholder = Atribut von einem Tag Element besteht aus key und value (schlüssel und wert)
// name oder e-mail = value (Wert)
//onSubmit = DOM Event - JSX Event
//DOM Event Beispiele: click, change, submit, keydown
function AddUser({onAdd, handleAddUserToggle}) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    onAdd(name,email)
    //console.log(name,email)
  }

  return (
    <form onSubmit={handleOnSubmit}> 
    <div className='addUserHTwoBtn'> 
    <button className='addUserBtn' onClick={handleAddUserToggle}>X</button>
      <div className='hTwo'><h2>Neuer Benutzer</h2></div>   
     
      </div>  
      
      
      <div className='inputform'>   
      <div>
      <label for="fname">Vollständigen Namen:</label>
      <input onChange={e => setName(e.target.value)} placeholder='name' name="name"/> 
      </div> 
      <div> 
      <label for="fname">E-Mail Adresse:</label>
      <input onChange={e => setEmail(e.target.value)}  placeholder='e-mail' name="email"/> 
      </div>
      <button onSubmit={handleOnSubmit}>+</button>
      </div>
      
    </form>
  )
}

export default AddUser