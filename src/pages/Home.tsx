import { type FC } from "react";
import ThemeDashBoard from "@/features/themes/ThemeDashboard";

const Home: FC = () => {
  return (
    <section>
      <h2>ダッシュボード</h2>
      <ThemeDashBoard />
    </section>
  );
};

export default Home;
