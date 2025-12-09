import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// Removed: import { useParams } from "react-router-dom"; // REMOVED
import emailjs from "@emailjs/browser";
import { emailConfig } from "../../config/emailConfig";
import { Send, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react";

export default function ContactForm() {
  const { t, i18n } = useTranslation(); // Added i18n for current language access
  const lng = i18n.language; // Use i18n.language instead of useParams().lng
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init({
      publicKey: emailConfig.publicKey,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Defined services with keys for translation
  const services = [
    {
      value: "administrative-cases",
      key: "contactService.administrativeCases",
    },
    { value: "labor-disputes", key: "contactService.laborDisputes" },
    { value: "rental-cases", key: "contactService.rentalCases" },
    { value: "contract-drafting", key: "contactService.contractDrafting" },
    { value: "civil-cases", key: "contactService.civilCases" },
    { value: "criminal-cases", key: "contactService.criminalCases" },
    { value: "commercial-cases", key: "contactService.commercialCases" },
    { value: "personal-status", key: "contactService.personalStatus" },
    { value: "arbitration", key: "contactService.arbitration" },
    { value: "penal-cases", key: "contactService.penalCases" },
    { value: "debt-collection", key: "contactService.debtCollection" },
    {
      value: "administrative-services",
      key: "contactService.administrativeServices",
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Get translated service label
    const selectedService = services.find(
      (s) => s.value === data.serviceInterest
    );
    const serviceLabel = selectedService
      ? t(selectedService.key)
      : t("contact.form.generalInquiry");

    // Prepare the email data to match your EmailJS template variables
    const emailData = {
      from_name: data.fullName, // matches {{from_name}} in your template
      from_email: data.email, // matches {{from_email}} in your template
      phone: data.phone, // matches {{phone}} in your template
      service: serviceLabel, // matches {{service}} in your template
      preferred_contact: data.preferredContact
        ? t(`contact.form.contactMethod.${data.preferredContact}`)
        : t("contact.form.preferredTime.any"), // matches {{preferred_contact}} in your template
      subject: data.subject, // matches {{subject}} in your template
      preferred_time: data.preferredTime
        ? t(`contact.form.preferredTime.${data.preferredTime}`)
        : t("contact.form.preferredTime.any"), // matches {{preferred_time}} in your template
      message: data.message, // matches {{message}} in your template
      to_email: emailConfig.businessEmail, // matches {{to_email}} in your template
    };

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailData
      );

      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Email sending error:", error);

      // More specific error message based on error type, using t()
      let errorMessage = t("contact.form.error");

      if (error.status === 403) {
        errorMessage = t("contact.form.errors.authorization");
      } else if (error.status === 400 || error.status === 422) {
        errorMessage = t("contact.form.errors.invalidData");
        if (error.text) {
          console.error("EmailJS error details:", error.text);
          errorMessage += " " + error.text;
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Using t() for error message in phone validation
  const validateUAEPhone = (value) => {
    const uaePhoneRegex = /^(\+971|971|0)?[1-9][0-9]{8}$/;
    return (
      uaePhoneRegex.test(value.replace(/\s/g, "")) ||
      t("contact.form.errors.phoneInvalid")
    );
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-medium">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("contact.form.successTitle")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("contact.form.successMessage")}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("contact.form.sendAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-8 shadow-medium space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t("contact.form.formTitle")}
      </h2>

      {/* Honeypot field for spam protection */}
      <input
        type="text"
        style={{ display: "none" }}
        {...register("honeypot")}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.nameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("fullName", {
            required: t("contact.form.errors.nameRequired"),
            minLength: {
              value: 2,
              message: t("contact.form.errors.nameMinLength"),
            },
            maxLength: {
              value: 50,
              message: t("contact.form.errors.nameMaxLength"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("contact.form.namePlaceholder")}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.emailLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: t("contact.form.errors.emailRequired"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("contact.form.errors.emailInvalid"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("contact.form.emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.phoneLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: t("contact.form.errors.phoneRequired"),
            validate: validateUAEPhone,
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="+971 50 123 4567" // Keeping placeholder static as it's a format hint
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Service Interest */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.serviceInterestLabel")}
        </label>
        <select
          {...register("serviceInterest")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
        >
          <option value="">{t("contact.form.selectService")}</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {t(service.key)}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.subjectLabel")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("subject", {
            required: t("contact.form.errors.subjectRequired"),
            minLength: {
              value: 5,
              message: t("contact.form.errors.subjectMinLength"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("contact.form.subjectPlaceholder")}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.messageLabel")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          {...register("message", {
            required: t("contact.form.errors.messageRequired"),
            minLength: {
              value: 50,
              message: t("contact.form.errors.messageMinLength"),
            },
            maxLength: {
              value: 1000,
              message: t("contact.form.errors.messageMaxLength"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("contact.form.messagePlaceholder")}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message.message}
            </p>
          ) : (
            <span></span>
          )}
          <span className="text-sm text-gray-500">
            {watch("message")?.length || 0}/1000
          </span>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("contact.form.preferredContactLabel")}
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="email"
              {...register("preferredContact")}
              className="mr-2"
            />
            <Mail className="w-4 h-4 mr-1" />
            {t("contact.form.contactMethod.email")}
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="phone"
              {...register("preferredContact")}
              className="mr-2"
            />
            <Phone className="w-4 h-4 mr-1" />
            {t("contact.form.contactMethod.phone")}
          </label>
        </div>
      </div>

      {/* Preferred Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("contact.form.preferredTimeLabel")}
        </label>
        <select
          {...register("preferredTime")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
        >
          <option value="">{t("contact.form.preferredTime.any")}</option>
          <option value="morning">
            {t("contact.form.preferredTime.morning")}
          </option>
          <option value="afternoon">
            {t("contact.form.preferredTime.afternoon")}
          </option>
          <option value="evening">
            {t("contact.form.preferredTime.evening")}
          </option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/50 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {t("contact.form.submit")}
          </>
        )}
      </button>
    </form>
  );
}
