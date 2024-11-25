body {
  font-family: "Exo 2", sans-serif;
  background-color: #29272e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

h1 {
  color: white;
}

.banner {
  width: 600px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0);
  outline: 4px solid white;
  border-radius: 8px;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 50% 100%);
}

.emblem {
  height: 60%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: white;
  margin-left: 20px;
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Exo 2", sans-serif;
}

.controls button {
  padding: 5px 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 5px;
  font-family: "Exo 2", sans-serif;
}

.controls a {
  padding: 10px 0px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  color: black;
  border: 0px solid black;
  border-radius: 5px;
  display: none;
}

#colorPicker {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
