"use client";
import DashboardTemplate2 from "@/components/web/dashboardTemplate2";
import { Provider } from "@/Context/store";
import 'react-tooltip/dist/react-tooltip.css'



const DashboardApp = () => {

  return (
    <Provider>
      <DashboardTemplate2 />
    </Provider>
  )
};

export default DashboardApp;
