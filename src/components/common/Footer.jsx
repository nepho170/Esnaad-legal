import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Footer() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const lang = lng || "en";

  return (
    <footer className="bg-primary text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-semibold">Esnaad</h4>
          <p className="text-sm mt-2">
            {t("footer.description") ||
              "Esnaad Legal & Administrative Consultancy"}
          </p>
        </div>

        <div>
          <h5 className="font-semibold">{t("footer.quickLinks")}</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li>
              <Link to={`/${lang}`}>{t("header.home")}</Link>
            </li>
            <li>
              <Link to={`/${lang}/services`}>{t("header.services")}</Link>
            </li>
            <li>
              <Link to={`/${lang}/about`}>{t("header.about")}</Link>
            </li>
            <li>
              <Link to={`/${lang}/consultation`}>
                {t("header.consultation")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${lang}/contact`}
                className="hover:text-white transition-colors"
              >
                {t("header.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">{t("footer.contact")}</h5>
          <p className="text-sm mt-2">{t("contact.addressContent")}</p>
          <p className="text-sm mt-2">
            Tel:{" "}
            <a
              href="tel:+97126222210"
              className="hover:text-white transition-colors"
            >
              +971 2 622 2210
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:esnaaduae@gmail.com"
              className="hover:text-white transition-colors"
            >
              esnaaduae@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Esnaad. All rights reserved.
      </div>
    </footer>
  );
}
