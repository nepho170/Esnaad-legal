import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-gray-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-semibold">Esnaad</h4>
          <p className="text-sm mt-2">
            {t("footer.description") ||
              "Esnaad Legal & Administrative Consultancy"}
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li>Home</li>
            <li>Services</li>
            <li>About Us</li>
            <li>Consultation</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Services</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li>Legal Services</li>
            <li>Administrative Services</li>
            <li>Debt Collection</li>
            <li>HR Consulting</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="text-sm mt-2">
            Hamdan Street, Al Building No. 6<br />
            Abu Dhabi, UAE
          </p>
          <p className="text-sm mt-2">
            Tel: +971 2 622 2210
            <br />
            Email: esnaaduae@gmail.com
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Esnaad. All rights reserved.
      </div>
    </footer>
  );
}
