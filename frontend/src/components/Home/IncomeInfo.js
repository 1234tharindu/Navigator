import { useState } from "react";

const IncomeInfo = ({ data }) => {
  const { deductionData, earningData } = data;
  const [view, setView] = useState("Earnings");

  const toggleView = (newView) => {
    setView(newView);
  };

  const totalEarnings = earningData
    ? earningData.reduce((total, data) => total + data.Amount, 0)
    : 0;
  const totalDeductions = deductionData
    ? deductionData.reduce((total, data) => total + data.Amount, 0)
    : 0;

  const NetSalary = (totalEarnings - totalDeductions).toFixed(2);

  return (
    <div className="animate-fade-up animate-once">
      <div className="font-bold ">
        <div className="flex items-center justify-center ">
          <div className="mx-4 max-w-[1000px] flex-1">
            <div className="flex w-[100%] mt-4">
              <div className="w-[50%]">Total Earnings</div>
              <div>:</div>
              <div className="w-[50%] flex justify-end">
                {totalEarnings.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="mx-4 max-w-[1000px] flex-1">
            <div className="flex w-[100%] mt-4">
              <div className="w-[50%]">Total Deductions</div>
              <div>:</div>
              <div className="w-[50%] flex justify-end">
                -{totalDeductions.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="mx-4 max-w-[1000px] flex-1">
            <div className="flex w-[100%] mt-4">
              <div className="w-[50%]">Net Salary</div>
              <div>:</div>
              <div className="w-[50%] flex justify-end">{NetSalary}</div>
            </div>
            <div className="mt-2 border-b border-black border-dashed"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center m-5">
        <button
          className={`md:w-[130px] max-md:w-[100px] py-1 ${
            view === "Earnings"
              ? "bg-primary2 "
              : " bg-primary1 hover:bg-slate-300"
          } text-white rounded-l-full drop-shadow-lg`}
          onClick={() => toggleView("Earnings")}
        >
          Earnings
        </button>
        <button
          className={`md:w-[130px] max-md:w-[100px] py-1 ${
            view === "Deductions"
              ? "bg-primary2 "
              : " bg-primary1 hover:bg-slate-300"
          } text-white rounded-r-full drop-shadow-lg `}
          onClick={() => toggleView("Deductions")}
        >
          Deductions
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <div className="mx-4 max-w-[1000px] flex-1">
          {view === "Earnings" && (
            <div className="">
              {earningData &&
                earningData.map((data, index) => (
                  <div
                    key={index}
                    className="flex w-[100%] mt-4 animate-fade-up animate-once"
                  >
                    <div className="w-[50%]">{data.Description}</div>
                    <div>:</div>
                    <div className="w-[50%] flex justify-end">
                      {data.Amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              {/* Total Earnings */}
              <div className="flex mt-4 w-[100%] animate-fade-up animate-once">
                <div className="w-[50%] font-bold">Total Earnings</div>
                <div>:</div>
                <div className="w-[50%] flex justify-end font-bold">
                  {totalEarnings.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {view === "Deductions" && (
            <div className="">
              {deductionData &&
                deductionData.map((data, index) => (
                  <div
                    key={index}
                    className="flex w-[100%] mt-4 animate-fade-up animate-once"
                  >
                    <div className="w-[50%]">{data.Description}</div>
                    <div>:</div>
                    <div className="w-[50%] flex justify-end">
                      {data.Amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              {/* Total Deductions */}
              <div className="flex mt-4 w-[100%] animate-fade-up animate-once">
                <div className="w-[50%] font-bold ">Total Deductions</div>
                <div>:</div>
                <div className="w-[50%] flex justify-end font-bold">
                  {totalDeductions.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeInfo;
