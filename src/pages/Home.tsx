import { type FC } from "react";
import ThemeTable from "@/features/themes/ThemeTable";
import AddTheme from "@/features/themes/addTheme";

const Home: FC = () => {
  return (
    <section>
      <h2>Home</h2>
      <AddTheme />
      <ThemeTable />
    </section>
  );
};

export default Home;
