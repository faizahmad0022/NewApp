import React from "react";
import DashboardPageWrapper from "@/components/dashboardPageWrapper";
import NewsMainComponent from "@/components/news-page/news-main-component";

export default function NewsPage() {
    return (
        <div>
            <DashboardPageWrapper>
                <NewsMainComponent />
            </DashboardPageWrapper>
            
        </div>  
    );
}