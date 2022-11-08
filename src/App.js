import './App.css';
import React, { useState, useEffect } from 'react';
import { Stack, TextField, MenuItem, Button, Alert } from "@mui/material";

const requestUrl = "https://frontend-take-home.fetchrewards.com/form";

function App() {
  const [usStateOptions, setUSStateOptions] = useState(['']);
  const [occupationOptions, setOccupationOptions] = useState(['']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [usState, setUSState] = useState('');
  const [submissionComplete, setSubmissionComplete] = useState(false);
  
  useEffect(()=> {
    const fetchData = async() => {
      const data = await fetch(requestUrl);
      const {occupations, states} = await data.json();
      setUSStateOptions(states);
      setOccupationOptions(occupations);
    }
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },     
      body: JSON.stringify({
        name,
        email,
        password,
        occupation,
        state: usState
      })
    });
    if (response.status === 201) {
      setSubmissionComplete(true)
    } else {
    console.log("Fail")
    }
  }

  return (
    <Stack direction="column" spacing={2} sx={{maxWidth: 400, margin: 2}} component="form"onSubmit={onSubmit}>
        <TextField label="Name" value={name} required onChange={(e)=>setName(e.target.value)}/>
        <TextField label="Email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
        <TextField label="Password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        <TextField label="Occupation" value={occupation} select required onChange={(e)=>setOccupation(e.target.value)}>
            {occupationOptions.map((occupation)=>(
              <MenuItem key={`{occupation}-occupation-key`} value={occupation}>{occupation}</MenuItem>
            ))}
        </TextField>
        <TextField label="State" value={usState} select required onChange={(e)=>setUSState(e.target.value)}>
            {usStateOptions.map((state)=>(
              <MenuItem key={`{state.name}-state-key`} value={state.name}>{state.name}</MenuItem>
            ))}
        </TextField>
        <Button variant="outlined" size="large" type="submit">Submit</Button>
        {submissionComplete &&
        <Alert severity="success">Form submitted successfully</Alert>}
    </Stack>
  );
}

export default App;