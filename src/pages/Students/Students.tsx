import { Caption } from "@/components/shared";
import StudentsForm from "@/components/forms/StudentsForm";
import StudentsTable from "@/components/tables/StudentTable/StudentsTable";

const Students = () => {
  return (
    <div>
      <Caption>O’quvchilar</Caption>
      <div className=" p-20 pt-8">
        <StudentsForm />
      </div>
      <StudentsTable />
    </div>
  );
};

export default Students;
