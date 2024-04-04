import { sideBarLink } from "@/constants";
import { ISideBarLink } from "@/types";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-[#2F49D1] text-white">
      <div className=" sticky top-0">
        <div className="mx-5 py-5 mb-8 flex items-center border-b border-white">
          <Link className="flex items-center" to="/">
            <img className="mr-5" src="/assets/icons/logo.svg" alt="Logo image" />
            <h1 className="text-2xl font-bold">CRM PANEL</h1>
          </Link>
          <img src="/assets/icons/toggle.svg" alt="Toggle image" />
        </div>
        <ul className="">
          {sideBarLink.map((link: ISideBarLink) => {
            return (
              <li className="w-full" key={link.label}>
                <NavLink
                  className={({ isActive }) => {
                    return `flex pl-5 pt-5 pb-3  gap-4 text-sm leading-[34px] font-medium items-center w-full after:w-1 transition  after:h-9 after:content-[''] pr-1 after:rounded-full after:transition after:block ${
                      isActive ? "after:bg-white" : ""
                    } ${isActive ? "bg-[#01265F]" : ""}`;
                  }}
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
    </div>
  );
};

export default SideBar;
