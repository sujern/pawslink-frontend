import { useTranslation } from "react-i18next";
import logo1 from "/logo1.png";

const SidebarLogo = () => {
  const { t } = useTranslation()

  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
        <img src={logo1} className="w-25 h-20" />
        {t("appName")}
      </h1>
    </div>
  )
  
}

export default SidebarLogo;