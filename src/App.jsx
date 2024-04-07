import "./App.css";
import Contacts from './Contacts';
import contacts from './contacts.json';
import React, { useState } from 'react';


function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));
  
  //3
  const addRandomContact = () => {
    const remainingContacts = contacts.filter(contact => !contactsList.some(c => c.id === contact.id));
    if (remainingContacts.length === 0) return; // No more contacts to add.
  
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setContactsList([...contactsList, randomContact]);
  };

  const sortByName = () => {
    const sortedContacts = [...contactsList].sort((a, b) => a.name.localeCompare(b.name));
    setContactsList(sortedContacts);
  };
  
  const sortByPopularity = () => {
    const sortedContacts = [...contactsList].sort((a, b) => b.popularity - a.popularity);
    setContactsList(sortedContacts);
  };
  
  const deleteContact = (contactId) => {
    const updatedContactsList = contactsList.filter(contact => contact.id !== contactId);
    setContactsList(updatedContactsList);
  };

  
  return (
    <div className="App">
    <h1>IronContacts</h1>
    
    <button onClick={addRandomContact}>+ Random Contact</button>
    <button onClick={sortByName}>Sort by name</button>
    <button onClick={sortByPopularity}>Sort by popularity</button>

    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
          
        </tr>
      </thead>
      <tbody>
        {contactsList.map((contact) => (
          <tr key={contact.id}>
            <td><img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px' }} /></td>
            <td  className="left">{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>{contact.wonOscar ? '🏆' : ''}</td>
            <td>{contact.wonEmmy ? '🌟' : ''}</td>
            <td>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );

}

export default App;
