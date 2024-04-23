import homeIcon from "@/assets/images/homeIcon.png";
import chartIcon from "@/assets/images/chartIcon.png";
import moneyIcon from "@/assets/images/moneyIcon.png";
import groupIcon from "@/assets/images/groupIcon.png";
import widgetIcon from "@/assets/images/widgetIcon.png";
import notificationIcon from "@/assets/images/notificationIcon.png";
import chatIcon from "@/assets/images/chatIcon.png";
export const headerMenu = {
  menu_one: [
    { label: "Home", icon: homeIcon, variant: "transparent" },
    { label: "Analytics", icon: chartIcon, variant: "transparent" },
    { label: "Revenue", icon: moneyIcon, variant: "primary" },
    { label: "CRM", icon: groupIcon, variant: "transparent" },
    { label: "Apps", icon: widgetIcon, variant: "transparent" },
  ],
  menu_two: [{ icon: notificationIcon }, { icon: chatIcon }],
};
