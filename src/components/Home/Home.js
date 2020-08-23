import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Home(props) {
  return (
    <div className="app__home">
      {/* <Link to="/classify" className="app__sidebaritem-link">
        <span className="app__sidebaritem-label">Let's Go</span>
      </Link> */}
      <div className="app__home-container">
        <div className="app__home-text-container">
          <h1 className="app__home-heading"> FIGHT COVID-19</h1>
          <p className="app__home-text">
            <div className="app__home-text-headline">
              Level up your Covid fight skills
            </div>
            <ul className="app__home-text-list">
              <li>Classify Patient chest X-ray as Covid/Pneumonia/Normal</li>
              <li>
                Learn how Covid X-ray differs from other chest infections{" "}
              </li>
              <li>Study publicly available Covid chest X-ray images</li>
              <li>
                Make a note of your observations and generate shareable report
              </li>
            </ul>
          </p>
          <div className="app__home-button-container">
            <Button className="app__home-button">
              <Link to="/classify" className="app__sidebaritem-link">
                <span className="app__sidebaritem-label">Let's Go</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="app__home-image"></div>
      </div>
    </div>
  );
}

export default Home;
