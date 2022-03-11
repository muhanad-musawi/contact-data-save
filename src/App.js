import React, {useState , useEffect }  from 'react';
import './components/App.css'; 
import User from './components/User'  
import AddUser from './components/AddUser'

function App() { 
 
  async function onAdd(name,email){
    await  fetch(`https://jsonplaceholder.typicode.com/users`,{  
      method: 'post', 
      body: JSON.stringify({
        name: name,
        email:email
      }),
      header:{
        "Content-type":"application/json: charset=UTF-8",
      },
    })
    .then((response)=>{
      if(response.status !== 201){ //Created
        return;
      } else{
        return response.json();
      }
    })
    .then((data)=>{
      // fetchUserData()
      const newObject = {
        name: name,
        email:email
      }
      const newUsers = [...users,newObject]
      setUsers(newUsers)
    })
    .catch((error)=>console.log(error))
  }

  async function onEdit(id,name,email){ 

    await  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{  
      method: 'put', 
      // VORHER: JavaScript Objekt {name:"florian", email:"test@test"} 
      body: JSON.stringify({
        name: name,
        email:email
      }),
      //NACHHER: JSON Objekt {"name":"florian","email":"test@test"}
      header:{
        "Content-type":"application/json: charset=UTF-8",
      },
    })
  .then((response)=>{
    if(response.status !== 200){
      return
    } else{
      return response.json();
    }
  })
  .then((data)=>{
    //Wenn wir wir API selber besitzen
    // setUsers((user)=>[...users, data])
    //fetchUserData()
    const updatedUsers = users.map((user) => { 
      if (user.id === id ) {
        user.name = name
      user.email = email
      }
      return user 
    })
    setUsers((users)=>updatedUsers)
  })
  .catch((error)=>console.log(error))
  }

 async function onDelete(id) {
    let check = prompt("Type YES to delete");
    if (check === "YES" || check ==="yes"){
    
  await  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{  
    method: 'delete',  
  })
  .then(response => { 
    if (response.status !== 200) {
      return 
    }else {  
      //Wenn wir die API selber besitzen
      //fetchUserData()
      setUsers(
        users.filter((user)=>{
          return user.id !== id;
        })
      )
    }
  })
  .catch((error)=>console.log(error))
} else {
  alert("Wrong Delete")
}
  }

const [users , setUsers] = useState([]) //Standard Wert fuer users definieren
const [isLoading, setIsLoading] = useState(false) //Standard Wert für Boolean wird immer mit
const [isUserToggle,setIsUserToggle]= useState(false)

useEffect(()=>{     //Callback
  fetchUserData();
},[]);  //Dependency Array ist leer fuer einmaliges laden der Componente


 async function fetchUserData() {
    await setIsLoading(true);
    await fetch('https://jsonplaceholder.typicode.com/users') //Promise ->fullfilled, rejected, pending
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(Error => console.log(Error));
    await setIsLoading(false)
 }

 //JSON Objekt und JavaScript Objekt bestehe aus Key Value
 //Der Weg von der API -> GET
 //JSON {"name":"florian"}  res.json() => Client Person.name
 //JavaScript {name:"florian"} Person.name
 //Der Weg zur API -> PUT POST
 //JavaScript {name:"florian"} Person.name
 //JSON {"name":"florian"}  req.stringify() => Server Person.name
 
 const handleAddUserToggle = () => {
   setIsUserToggle(!isUserToggle)
 }

 if(isLoading){
   return(
     <div className='loading'>
       Currently Loading Data please wait...
     </div>
   )
 } else{
  return (
    <div className="App">
     <h1>Benutzer</h1> 
     {!isUserToggle?( 
    <div className='btnCenter'>
     <button className='userAddBTN' onClick={handleAddUserToggle}>
     Benutzer Hinzufügen +
     </button> 
     </div>
     ):(
     <AddUser  
      handleAddUserToggle={handleAddUserToggle}
      onAdd={onAdd}
     />
     )}
     <div className='usersList'>
       <p className='usersLength'>Aktuell sind <span >{users.length}</span> Benutzer registriert.</p>
      {
        users && users.map((user) => (  
          <User
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}  
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      }
     </div>
    </div>
  );
 }
}

export default App;
