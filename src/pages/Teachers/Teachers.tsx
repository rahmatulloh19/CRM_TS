import TeachersForm from "@/components/forms/TeachersForm";
import { Caption } from "@/components/shared";
import TeachersTable from "@/components/tables/TeachersTable/TeachersTable";

const Teachers = () => {
  return (
    <div>
      <Caption>O'qtuvchilar</Caption>

      <div className="px-20 mt-8 mb-[60px]">
        <TeachersForm />
      </div>
      <TeachersTable />
    </div>
  );
};

export default Teachers;
