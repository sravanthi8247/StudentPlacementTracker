import Button from '../ui/Button';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Streamline Campus Placements</span>
          <h1 className="hero__title">
            Track Student Placements with{' '}
            <span className="hero__highlight">Confidence</span>
          </h1>
          <p className="hero__description">
            A centralized platform for colleges to manage student profiles, company
            drives, interview schedules, and placement outcomes — all in one place.
          </p>
          <div className="hero__actions">
            <Button href="#features" variant="primary" size="lg">
              Get Started
            </Button>
            <Button href="#about" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card hero__card--main">
            <div className="hero__card-header">
              <span className="hero__dot hero__dot--green" />
              <span className="hero__dot hero__dot--yellow" />
              <span className="hero__dot hero__dot--red" />
            </div>
            <div className="hero__card-body">
              <div className="hero__stat-row">
                <span>Placed Students</span>
                <strong>1,248</strong>
              </div>
              <div className="hero__stat-row">
                <span>Active Drives</span>
                <strong>36</strong>
              </div>
              <div className="hero__stat-row">
                <span>Partner Companies</span>
                <strong>89</strong>
              </div>
              <div className="hero__progress">
                <div className="hero__progress-bar" />
              </div>
            </div>
          </div>
          <div className="hero__card hero__card--float">
            <span className="hero__float-label">Placement Rate</span>
            <strong className="hero__float-value">92%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
