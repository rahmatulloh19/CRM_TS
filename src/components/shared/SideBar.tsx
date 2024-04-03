import { sideBarLink } from "@/constants";
import { ISideBarLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <div className="bg-[#2F49D1] text-white">
      <div className="mx-5 py-5 mb-8 flex items-center border-b border-white">
        <img className="mr-5" src="/assets/icons/logo.svg" alt="Logo image" />
        <h1 className="text-2xl font-bold">CRM PANEL</h1>
        <img src="/assets/icons/toggle.svg" alt="Toggle image" />
      </div>
      <ul>
        {sideBarLink.map((link: ISideBarLink) => {
          return (
            <li className={`w-full ${pathname === link.route ? "bg-[#01265F]" : ""} transition`} key={link.label}>
              <NavLink
                className={`flex pl-5 pt-5 pb-3  gap-4 text-sm leading-[34px] font-medium items-center w-full after:w-1 after:h-9 after:content-[''] after:${
                  pathname === link.route ? "bg-white" : ""
                } pr-1 after:rounded-full after:transition`}
                to={link.route}
              >
                <img src={link.imageUrl} width={20} height={20} alt={`${link.label}'s icon`} />
                <p className="grow">{link.label}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
