import { ChartNoAxesGantt, LanguagesIcon, HistoryIcon, PawPrint, UserRound,} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/pets", labelKey: "myPet", icon: PawPrint },
  { to: "/contact", labelKey: "myContact", icon: UserRound },
  { to: "/history", labelKey: "history", icon: HistoryIcon },
  { to: "/overview", labelKey: "overview", icon: ChartNoAxesGantt },
];

const SidebarLinks = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };

  return (
    <ul className="space-y-4 font-medium">
      <div className="px-4">
        <hr className="border-gray-300" />
      </div>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <li className="px-4" key={link.to}>
            <Link
              to={link.to}
              className={`flex py-2 px-3 rounded-xl transition-colors ${
                location.pathname === link.to
                  ? "bg-goodBlue text-white"
                  : "hover:bg-goodBlue hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {t(link.labelKey)}
            </Link>
          </li>
        );
      })}

      <div className="px-4">
        <hr className="border-gray-300" />
      </div>

      <li className="flex items-center gap-2 py-2 px-7">
        <LanguagesIcon className="w-5 h-5 mr-2" />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="py-1 px-3 rounded-md border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-goodBlue"
        >
          <option value="en">English</option>
          <option value="th">ไทย</option>
        </select>
      </li>
    </ul>
  );
};

export default SidebarLinks;
