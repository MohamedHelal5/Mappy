import { Link } from "react-router-dom"
import '../App.css';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="col-3 page-title" style={{ textAlign: 'center' }}>
                        <span className="title">
                            <span>M</span>
                            <span>a</span>
                            <span>p</span>
                            <span>p</span>
                            <span>y</span>
                        </span>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}
export { Navbar }