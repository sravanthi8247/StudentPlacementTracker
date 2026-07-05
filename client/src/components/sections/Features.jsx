import FeatureCard from '../ui/FeatureCard';
import './Features.css';

const features = [
  {
    icon: '📋',
    title: 'Student Profile Management',
    description:
      'Maintain comprehensive student records including academics, skills, resumes, and placement status in one dashboard.',
  },
  {
    icon: '🏢',
    title: 'Company Drive Tracking',
    description:
      'Organize recruitment drives, job roles, eligibility criteria, and application deadlines with real-time updates.',
  },
  {
    icon: '📊',
    title: 'Analytics & Reports',
    description:
      'Generate placement statistics, department-wise insights, and exportable reports for administration and accreditation.',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description:
      'Keep students and coordinators informed with alerts for new drives, interview schedules, and result announcements.',
  },
];

function Features() {
  return (
    <section id="features" className="section features">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything You Need for Placements</h2>
          <p className="section-description">
            Powerful tools designed for placement cells, faculty coordinators, and
            students to stay aligned throughout the recruitment season.
          </p>
        </header>
        <div className="features__grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
