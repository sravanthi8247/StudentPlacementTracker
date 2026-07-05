import './AuthLayout.css';

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-page__panel auth-page__panel--brand">
        <div className="auth-page__brand-content">
          <div className="auth-page__logo">
            <span className="auth-page__logo-icon">SPT</span>
            <span>Student Placement Tracker</span>
          </div>
          <h1 className="auth-page__headline">
            Manage campus placements with clarity and confidence
          </h1>
          <p className="auth-page__tagline">
            Track drives, student profiles, and placement outcomes in one professional
            platform built for colleges and recruiters.
          </p>
        </div>
      </div>

      <div className="auth-page__panel auth-page__panel--form">
        <div className="auth-page__form-wrapper">
          <div className="auth-page__form-header">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
