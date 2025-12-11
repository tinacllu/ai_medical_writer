import { MainContainer } from "./MainContainer";
import { Sidebar } from "./Sidebar/Sidebar";

export const HomePage = () => {
  return (
    <div className="bg-pastel-bg font-poppins text-pastel-text p-0 flex flex-row">
      <div className="flex w-1/8 flex-none bg-pastel-secondary h-screen p-8">
        <Sidebar />
      </div>
      <div className="flex flex-col grow p-8">
        <h1 className="text-3xl pb-8">Medical Writer Assistant</h1>
        <MainContainer />
      </div>
    </div>
  );
};
