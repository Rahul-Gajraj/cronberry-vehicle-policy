import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomerDetailsForm from "./Form";
import Form2 from "./Form2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CustomerDetailsForm />
      {/* <Form2 /> */}
    </>
  );
}

export default App;
