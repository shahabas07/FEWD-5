import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from "./components/Forms";
import Books from "./components/Books";
import React from "react";

export default class App extends React.Component{

  render(){
    return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/register" element={<Forms/>} />
        </Routes>
      </div>
    </BrowserRouter>
    )
  }  
}