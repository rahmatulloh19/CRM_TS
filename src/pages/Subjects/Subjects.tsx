import SubjectsForm from "@/components/forms/SubjectsForm";
import { Caption } from "@/components/shared";
import SubjectsTable from "@/components/tables/SubjectsTable/SubjectsTable";

const Subjects = () => {
  return (
    <div>
      <Caption>Fanlar</Caption>
      <div className="px-20 mt-8 mb-14">
        <SubjectsForm />
      </div>

      <SubjectsTable />
    </div>
  );
};

export default Subjects;
