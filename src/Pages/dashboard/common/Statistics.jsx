import React from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import UserStatistics from "../../../components/dashboard/statistics/UserStatistics"
import VendorStatistics from "../../../components/dashboard/statistics/VendorStatistics";
import AdminStatistics from "../../../components/dashboard/statistics/AdminStatistics";

const Statistics = () => {
    const { role, roleLoading } = useAuth();

    if (roleLoading) return <LoadingSpinner />;

    return (
        <div>
            {role === "user" && <UserStatistics />}
            {role === "vendor" && <VendorStatistics />}
            {role === "admin" && <AdminStatistics />}
        </div >
    );
};

export default Statistics;
