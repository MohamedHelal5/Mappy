import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <>
      {/* start footer */}
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="span1">
            <span className="footer-span-one">
              &copy; 2024
              <span className="footer-tit" style={{ paddingLeft : '10px' }}>GISLoader</span>
              <br />
              By: Mohamed Helal | GIS Developer
              <a href="https://www.linkedin.com/in/mohamed-a-helal-" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none',paddingLeft : '10px' }}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="mailto:moahamed.a.helal@gmail.com?subject=contact" className="link" style={{ textDecoration: 'none',paddingLeft : '10px' }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </span>
          </div>
          <div className="span2">
            <span className="footer-span-two">
              <div className="span2">
                <span className="footer-span-two">
                  Copyright &copy; All Right Reserved
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
      {/* end footer */}
    </>
  );
}

export { Footer };
