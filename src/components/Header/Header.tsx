import headerCloseProjectIcon from "../../assets/icons/header-close-project.svg";
import headerShareIcon from "../../assets/icons/header-share.svg";
import headerProjectsToggleIcon from "../../assets/icons/header-projects-toggle-icon.svg";

import "./Header.scss";

const Header = () => {
  return (
    <header className="workspace__header">
      <div className="workspace__header-settings">
        <button className="workspace__header-button">
          <img src={headerCloseProjectIcon} alt="header-close-project-icon" />
        </button>
        <button className="workspace__header-button">
          <img src={headerShareIcon} alt="header-share-icon" />
        </button>
        <button className="workspace__header-button workspace__header-button--active">
          Просмотр
        </button>
        <button className="workspace__header-button">Управление</button>
      </div>
      <div className="workspace__header-projects">
        <div className="workspace__header-projects-toggle">
          <p>
            Название проекта <span>Аббревиатура</span>
          </p>
          <button>
            <img
              src={headerProjectsToggleIcon}
              alt="header-projects-toggle-icon"
            />
          </button>
        </div>
        <div className="workspace__header-projects-project">
          <ul className="workspace__header-projects-project-list">
            <li className="workspace__header-projects-project-item">
              <button className="workspace__header-projects-project-btn">
                <h2 className="workspace__header-projects-project-title">
                  Строительно-монтажные работы
                </h2>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
