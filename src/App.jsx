import { useState } from 'react';
import Intro from './components/Intro.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Audiences from './components/Audiences.jsx';
import About from './components/About.jsx';
import Timeline from './components/Timeline.jsx';
import Join from './components/Join.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <div className={`page ${introDone ? 'is-ready' : ''}`}>
        <Nav />
        <main>
          <Hero ready={introDone} />
          <Audiences />
          <About />
          <Timeline />
          <Join />
        </main>
        <Footer />
      </div>
    </>
  );
}
