import './App.less';
import Header from './components/Header/Header';
import Middle from './components/Middle/Middle';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

function App() {

  const [username, setUsername] = useState("登录")

  return (
    <div className="App">
      <Header username={username} setUsername={setUsername} />
      <Middle setUsername={setUsername} />
      <Footer />
    </div>
  );
}

export default App;
