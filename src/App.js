import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";


import "./App.css";
import {
  Contacts,
  Contact,
  AddContact,
  EditContact,
  ViewContact,
  DeleteContact,
  Search,
  Navbar,
} from "./components/index";

import { getAllContacts, getAllGroups, createContact, deleteContact } from "./services/contactsService";
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./helpers/color";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false)
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([])
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });



  const {query , setQuery} = useState({text : ""})

 
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData)
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        
        setFilteredContacts(contactsData)
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender])

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({})
        setForceRender(!forceRender)
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err.message)
    }
  }


  const confirm = (contactId, contactFullname)=>{
    confirmAlert({
      customUI: ({ onClose }) => (
        <div  style={{ backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em" , padding: "15px"}}>
          <h3 style={{ color: YELLOW }}>پاک کردن مخاطب</h3>
          <p style={{ color: FOREGROUND }}>ایا از حذف <span style={{color : "red"}}>{contactFullname}</span> اطمینان دارید</p>
          <button className="btn-ok"  onClick={() => {
            removeContact(contactId)
            onClose()
          }}>تایید</button>
          <button className="btn-no" onClick={onClose}>انصراف</button>
        </div>
      )
    })
  }
  const removeContact = async (contactId) => {
    try {
      setLoading(true)
      const respons = await deleteContact(contactId)
      if (respons) {
        const { data: contactsData } = await getAllContacts()
        setContacts(contactsData)
        
        setFilteredContacts(contactsData)
        setLoading(false)
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }


  const contactSearch = (event) =>{
    setQuery ({...query , text : event.target.value})
    const allContacts = getContacts.filter((contact)=>{
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredContacts(allContacts)
  }

  return (
    <div>
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={<Contacts contacts={getFilteredContacts} loading={loading} confirmDelete={confirm} />}
        />
        <Route path="/contacts/:contactId" element={<Contact />} />
        <Route path="/contacts/add" element={<AddContact createContactForm={createContactForm} groups={getGroups} contact={getContact} setContactInfo={setContactInfo} />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
