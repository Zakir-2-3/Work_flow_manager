import sidebarItemIcon from "../../assets/icons/sidebar-item-icon.svg";

import "./Aside.scss";

const Aside = () => {
  const sidebarItems = [
    "По проекту",
    "Объекты",
    "РД",
    "МТО",
    "СМР",
    "График",
    "МиМ",
    "Рабочие",
    "Капвложения",
    "Бюджет",
    "Финансирование",
    "Панорамы",
    "Камеры",
    "Поручения",
    "Контрагенты",
  ];

  return (
    <aside className="workspace__sidebar">
      <div className="workspace__sidebar-projects">
        <ul className="workspace__sidebar-projects-list">
          {sidebarItems.map((text, index) => (
            <li key={index} className="workspace__sidebar-projects-item">
              <button className="workspace__sidebar-projects-btn">
                <img src={sidebarItemIcon} alt="sidebar-item-icon" />
                <h2 className="workspace__sidebar-projects-title">{text}</h2>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
