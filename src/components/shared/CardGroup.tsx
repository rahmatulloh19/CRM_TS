import { BASE_URL } from "@/lib/queries";
import { IGroup } from "@/types";

const CardGroup = ({ group }: { group: IGroup }) => {
  return (
    <li className="shadow-2xl rounded-b-2xl">
      <div className="bg-[#2F49D1] rounded-t-2xl py-[18px]">
        <h3 className="text-center text-xl font-semibold text-white">{group.group_name}</h3>
      </div>
      <div className="p-3 pb-6">
        <div className="flex gap-3 mb-8">
          <img className="shrink-0 rounded-full" src={`${BASE_URL}${group.teachers?.img}` || "/assets/images/matem.png"} width={80} height={80} alt="" />
          <div className="flex flex-col">
            <div className="flex justify-end gap-3 grow">
              <h4 className="text-[#001062] font-bold">O’qituvchi:</h4>
              <p className="text-right">{`${group.teachers?.first_name} ${group.teachers?.last_name}`}</p>
            </div>
            <div className="flex justify-between gap-3">
              <h4 className="text-[#001062] font-bold">Tell raqam:</h4>
              <p className="text-right">{group.teachers?.phone_number}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars kunlari:</strong>
          <p>{group.weeks?.week_name}</p>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars vaqti:</strong>
          <p>{`${group.group_time_start}-${group.group_time_stop}`}</p>
        </div>
        <div className="flex justify-between">
          <strong className="text-[#001062]">O’quvchilar soni:</strong>
          <p>{group.students?.length} ta</p>
        </div>
      </div>
    </li>
  );
};

export default CardGroup;
