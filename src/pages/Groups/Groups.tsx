import GroupsForm from "@/components/forms/GroupsForm";
import { Caption, CardGroup } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import { useGetGroupsQuery } from "@/lib/queries";
import { IGroup } from "@/types";

const Groups = () => {
  const { data: groups, isLoading } = useGetGroupsQuery(undefined);

  return (
    <div>
      <Caption>Guruhlar</Caption>
      <div className="px-20 mt-5 mb-9">
        <GroupsForm />
      </div>
      <div className="px-20">
        <h3 className="text-[#0061F7] font-bold text-4xl leading-[44px] mb-[34px]">Mavjud guruhlar</h3>
        <ul className="grid grid-cols-3 gap-8 mb-8">
          {isLoading ? (
            <li className="text-center w-full col-span-3">
              <Loader className="mx-auto" width={100} height={100} />
            </li>
          ) : groups.data.length ? (
            groups.data.map((group: IGroup) => <CardGroup key={group.id} group={group} />)
          ) : (
            <li className="text-center w-full col-span-3 text-lg">Guruhlar yo'q</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Groups;
