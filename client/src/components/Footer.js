import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <section className="social-icons-wrapper d-flex flex-column flex-md-row justify-content-center my-3">
          
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/ShiftoSnag" className="icon shiftoSnag" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} flip size="3x" style={{ color: 'green' }} />
            </a>
            <a href="https://github.com/ShiftoSnag" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@ShiftoSnag</span>
            </a>
          </div>
          
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/u0914295" className="icon u0914295" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} beat size="3x" style={{ color: 'purple' }} />
            </a>
            <a href="https://github.com/u0914295" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@u0914295</span>
            </a>
          </div>
         
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/DanielDiazLo" className="icon DanielDiazLo" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} bounce size="3x" style={{ color: 'orange' }} />
            </a>
            <a href="https://github.com/DanielDiazLo" target="_blank" rel="noreferrer">
            <span className="d-inline-block mx-1 name">@DanielDiazLo</span>
            </a>
          </div>
        </section>
        <section className="footer" id="footer">
          <section className="form-footer">
            <h5 className="text-center mb-2">
              test
            </h5>
            <p className="text-center mb-0">
              <h6>&copy; {new Date().getFullYear()} All rights reserved.</h6>
            </p>
          </section>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
