import { Caption } from "@/components/shared";
import { useGetGroupsQuery, useGetStudentsQuery, useGetSubjectsQuery, useGetTeachersQuery } from "@/lib/queries";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { data: students } = useGetStudentsQuery(undefined);
  const { data: teachers } = useGetTeachersQuery(undefined);
  const { data: subjects } = useGetSubjectsQuery(undefined);
  const { data: groups } = useGetGroupsQuery(undefined);

  return (
    <section>
      <Caption>Xisobot</Caption>
      <ol className="p-8 grid grid-cols-2 gap-8">
        <li className="relative bg-white drop-shadow rounded-2xl p-5 pb-[105px] cursor-pointer" onClick={() => navigate("/students")}>
          <h3 className="text-3xl font-medium mb-5">Jami o’quvchilar soni:</h3>
          <strong className="text-3xl mb-5">{students?.data ? students?.data.length : 0} ta</strong>
          <img className="absolute bottom-5 right-5" src="/assets/icons/statistic.svg" alt="Statistic icon" width={100} height={100} />
        </li>
        <li className="relative bg-white drop-shadow rounded-2xl p-5 pb-[105px] cursor-pointer" onClick={() => navigate("/teachers")}>
          <h3 className="text-3xl font-medium mb-5">O’qituvchilar soni:</h3>
          <strong className="text-3xl mb-5">{teachers?.data ? teachers?.data.length : 0} ta</strong>
          <img className="absolute bottom-5 right-5" src="/assets/icons/statistic.svg" alt="Statistic icon" width={100} height={100} />
        </li>
        <li className="relative bg-white drop-shadow rounded-2xl p-5 pb-[105px] cursor-pointer" onClick={() => navigate("/subjects")}>
          <h3 className="text-3xl font-medium mb-5">Jami fanlar soni:</h3>
          <strong className="text-3xl mb-5">{subjects?.data ? subjects?.data.length : 0} ta</strong>
          <img className="absolute bottom-5 right-5" src="/assets/icons/statistic.svg" alt="Statistic icon" width={100} height={100} />
        </li>
        <li className="relative bg-white drop-shadow rounded-2xl p-5 pb-[105px] cursor-pointer" onClick={() => navigate("/groups")}>
          <h3 className="text-3xl font-medium mb-5">Jami guruhlar soni</h3>
          <strong className="text-3xl mb-5">{groups?.data ? groups?.data.length : 0} ta</strong>
          <img className="absolute bottom-5 right-5" src="/assets/icons/statistic.svg" alt="Statistic icon" width={100} height={100} />
        </li>
      </ol>
    </section>
  );
};

export default Home;
