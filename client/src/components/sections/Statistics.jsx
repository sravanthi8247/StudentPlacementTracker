import StatCard from '../ui/StatCard';
import './Statistics.css';

const stats = [
  { value: '1,500+', label: 'Students Placed' },
  { value: '120+', label: 'Partner Companies' },
  { value: '95%', label: 'Placement Success Rate' },
  { value: '50+', label: 'Campus Drives Annually' },
];

function Statistics() {
  return (
    <section className="statistics">
      <div className="container">
        <div className="statistics__grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
