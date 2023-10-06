// src/main.jsx
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { UserContext } from './context/userContext'


const root = createRoot(document.getElementById("root"))
root.render(
        <App user={UserContext}/>
);
