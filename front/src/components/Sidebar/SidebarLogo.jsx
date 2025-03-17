import { useTranslation } from "react-i18next";
import logo from "/logo.png";

const SidebarLogo = () => {
  const { t } = useTranslation()

  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
        <img src={logo} className="w-20 h-20" />
        {t("appName")}
      </h1>
    </div>
  )
  
}

export default SidebarLogo;