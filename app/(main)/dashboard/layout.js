import React, { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader } from "react-spinners";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-4xl sm:text-5xl font-bold gradient-title md:text-6xl">Dashboard</h1>
      {/* Dashboard Page */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
