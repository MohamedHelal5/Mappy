import './EsriMap.css';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faEarthAfrica } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Sidebar() {
    return (
        <>
            <div className="side">
                <ul className="list-unstyled">
                    <li className="open">
                        <Link to={`/opensource`}>Open Source</Link>
                        <span className="globe-icon"><FontAwesomeIcon icon={faGlobe} bounce style={{ color: "#0D6EFD", paddingLeft: '5px' }} /></span>
                    </li>
                    <li className="closed">
                        <Link to={"/#"}>Closed Source</Link>
                        <span className="earth-icon"><FontAwesomeIcon icon={faEarthAfrica} bounce style={{ color: "#0D6EFD", paddingLeft: '5px' }} /></span>
                    </li>
                </ul>
                {/* start footer */}
                <div className="footer" id="footer">
                    <div className="footer-content">
                        <div className="span1">
                            <span className="footer-span-one">
                                &copy; 2024
                                <span className="footer-tit" style={{ paddingLeft: '10px' }}>Mappy</span>
                                <br />
                                Mohamed Helal | GIS Developer
                                <a href="https://www.linkedin.com/in/mohamed-a-helal-" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', paddingLeft: '10px' }}>
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                                <a href="mailto:moahamed.a.helal@gmail.com?subject=contact" className="link" style={{ textDecoration: 'none', paddingLeft: '10px' }}>
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
            </div>
        </>
    )
}

export { Sidebar }