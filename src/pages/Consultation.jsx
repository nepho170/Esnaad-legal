import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ConsultationWizard from "../components/consultation/ConsultationWizard";

export default function Consultation() {
  return (
    <div className="min-h-screen bg-light">
      <Header />
      <ConsultationWizard />
      <Footer />
    </div>
  );
}
