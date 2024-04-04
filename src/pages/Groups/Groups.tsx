import GroupsForm from "@/components/forms/GroupsForm";
import { Caption, CardGroup } from "@/components/shared";

const Groups = () => {
  return (
    <div>
      <Caption>Guruhlar</Caption>
      <div className="px-20 mt-5 mb-9">
        <GroupsForm />
      </div>
      <div className="px-20">
        <h3 className="text-[#0061F7] font-bold text-4xl leading-[44px] mb-[34px]">Mavjud guruhlar</h3>
        <ul className="grid grid-cols-3 gap-8 mb-8">
          <CardGroup />
          <CardGroup />
          <CardGroup />
        </ul>
      </div>
    </div>
  );
};

export default Groups;
