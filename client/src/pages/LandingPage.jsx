import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Statistics from '../components/sections/Statistics';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Statistics />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
