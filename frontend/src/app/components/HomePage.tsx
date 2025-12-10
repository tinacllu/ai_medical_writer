import { SearchContainer } from "./SearchContainer";
import { Sidebar } from "./Sidebar/Sidebar";

export const HomePage = () => {
  return (
    <div>
      <div>
        <h1>Medical Writer Assistant</h1>
        <SearchContainer />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};
