import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import List from "./Components/List";

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
window.particlesJS.load('particles-js', '/particles.js-master/particlesjs-config.json', function() {
  console.log('callback - particles-js config loaded');
});

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div id="particles-js">
      <ReturnDiv>
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <List searchInput={searchInput} />
      </ReturnDiv>
    </div>
  );
}

export default App;

const ReturnDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
