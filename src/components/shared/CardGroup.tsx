const CardGroup = () => {
  return (
    <li className="shadow-2xl rounded-b-2xl">
      <div className="bg-[#2F49D1] rounded-t-2xl py-[18px]">
        <h3 className="text-center text-xl font-semibold text-white">Matemadika</h3>
      </div>
      <div className="p-3 pb-6">
        <div className="flex gap-3 mb-8">
          <img className="shrink-0" src="/assets/images/matem.png" width={80} height={80} alt="" />
          <div className="flex flex-col">
            <div className="flex justify-end gap-3 grow">
              <h4 className="text-[#001062] font-bold">O’qituvchi:</h4>
              <p className="text-right">Muxamadaliyev Ibroxim</p>
            </div>
            <div className="flex justify-end gap-3">
              <h4 className="text-[#001062] font-bold">Tell raqam:</h4>
              <p className="text-right">+998900113861</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars kunlari:</strong>
          <p>DU-CHOR-JUMA</p>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars vaqti:</strong>
          <p>14:00-16:00</p>
        </div>
        <div className="flex justify-between">
          <strong className="text-[#001062]">O’quvchilar soni:</strong>
          <p>25ta</p>
        </div>
      </div>
    </li>
  );
};

export default CardGroup;
