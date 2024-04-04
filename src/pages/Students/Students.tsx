import { Caption } from "@/components/shared";
import StudentsForm from "@/components/forms/StudentsForm";

const Students = () => {
  return (
    <div>
      <Caption>O’quvchilar</Caption>
      <div className=" p-20 pt-8">
        <StudentsForm />
      </div>
    </div>
  );
};

export default Students;
