import ProfileLayout from "../../Components/ProfileLayout";
import { useState } from "react";
import "../../Styles/MyOrders.css";
import processing from "../../Components/MyOrders/processing";
import ToShip from "../../Components/MyOrders/ToShip";

const tabs = [
  { id: "processing", label: "Processing", component: processing },
  { id: "ship", label: "To Ship", component: ToShip },
  { id: "completed", label: "Completed", component: "" },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  return (
    <ProfileLayout>
      <section className="order-body">
        <nav className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="tab-content">
          {ActiveComponent && <ActiveComponent />}
        </section>
      </section>
    </ProfileLayout>
  );
};

export default MyOrders;
