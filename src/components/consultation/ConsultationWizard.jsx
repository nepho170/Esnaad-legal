import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { emailConfig } from "../../config/emailConfig";
import { allServices } from "../../utils/constants";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  Calendar,
  Clock,
  CreditCard,
  Phone,
  Video,
  MapPin,
  FileText,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  // Download, // Removed unused icon
} from "lucide-react";

// --- START: SHARED CONSTANTS (KEEPING FOR COMPLETENESS) ---
const STEPS = [
  {
    id: 1,
    key: "contact",
    titleEn: "Contact Info",
    titleAr: "معلومات الاتصال",
    fields: ["fullName", "email", "phone"],
  },
  {
    id: 2,
    key: "service",
    titleEn: "Service Type",
    titleAr: "نوع الخدمة",
    fields: ["serviceType", "description"],
  },
  {
    id: 3,
    key: "payment",
    titleEn: "Payment",
    titleAr: "الدفع",
    fields: ["paymentReference"],
  },
  {
    id: 4,
    key: "schedule",
    titleEn: "Schedule",
    titleAr: "الجدولة",
    fields: ["preferredDate", "preferredTime"],
  },
  {
    id: 5,
    key: "method",
    titleEn: "Method",
    titleAr: "الطريقة",
    fields: ["consultationMethod"],
  },
  {
    id: 6,
    key: "duration",
    titleEn: "Duration",
    titleAr: "المدة",
    fields: ["packageAccepted"],
  },
  {
    id: 7,
    key: "report",
    titleEn: "Report",
    titleAr: "التقرير",
    fields: ["reportLanguage", "deliveryMethod"],
  },
  {
    id: 8,
    key: "privacy",
    titleEn: "Privacy",
    titleAr: "الخصوصية",
    fields: ["privacyAccepted"],
  },
  { id: 9, key: "confirmation", titleEn: "Confirmation", titleAr: "التأكيد" },
];
// --- END: SHARED CONSTANTS ---

// --- START: STEP COMPONENTS (Unchanged, retaining original structure) ---

function StepIndicator({ currentStep, language, t }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-center gap-y-2 mb-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                step.id < currentStep
                  ? "bg-green-500 text-white"
                  : step.id === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                step.id
              )}
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`h-1 w-4 md:w-8 mx-1 ${
                  step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {t(`consultation.steps.${STEPS[currentStep - 1].key}`)}
        </h3>
        <p className="text-sm text-gray-500">
          {t("consultation.stepIndicator.step")} {currentStep}{" "}
          {t("consultation.stepIndicator.of")} {STEPS.length}
        </p>
      </div>
    </div>
  );
}

function Step1Contact({ register, errors, t }) {
  const validateUAEPhone = (value) => {
    const uaePhoneRegex = /^(\+971|971|0)?[1-9][0-9]{8}$/;
    return (
      uaePhoneRegex.test(value.replace(/\s/g, "")) ||
      t("consultation.step1.phoneInvalid")
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step1.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step1.subtitle")}</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("consultation.step1.fullName")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("fullName", {
            required: t("consultation.step1.fullNameRequired"),
            minLength: {
              value: 2,
              message: t("consultation.step1.fullNameMinLength"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("consultation.step1.fullNamePlaceholder")}
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
          {t("consultation.step1.email")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: t("consultation.step1.emailRequired"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("consultation.step1.emailInvalid"),
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("consultation.step1.emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("consultation.step1.phone")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: t("consultation.step1.phoneRequired"),
            validate: validateUAEPhone,
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="+971 50 123 4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phone.message}
          </p>
        )}
      </div>
    </div>
  );
}

function Step2ServiceType({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step2.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step2.subtitle")}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step2.serviceType")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          {...register("serviceType", {
            required: t("consultation.step2.required"),
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.serviceType ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{t("consultation.step2.selectService")}</option>
          {allServices.map((service) => (
            <option key={service.id} value={service.id}>
              {t(`consultation.services.${service.id}`)}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.serviceType.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step2.description")}
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          placeholder={t("consultation.step2.descriptionPlaceholder")}
        />
      </div>
    </div>
  );
}

function Step3Payment({
  register,
  errors,
  paymentReceipt,
  setPaymentReceipt,
  t,
}) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(t("consultation.step3.fileTooLarge"));
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(t("consultation.step3.invalidFileType"));
        return;
      }

      setPaymentReceipt(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step3.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step3.subtitle")}</p>
      </div>

      {/* Bank Details */}
      <div className="bg-light rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          {t("consultation.step3.bankDetails")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step3.bankName")}
            </label>
            <p className="text-gray-900 font-medium">Emirates NBD</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step3.accountNumber")}
            </label>
            <p className="text-gray-900 font-medium">1234567890</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step3.accountName")}
            </label>
            <p className="text-gray-900 font-medium">
              Esnaad Legal Consultancy
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              IBAN
            </label>
            <p className="text-gray-900 font-medium">AE070331234567890</p>
          </div>
        </div>
      </div>

      {/* Payment Confirmation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step3.paymentReference")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("paymentReference", {
            required: t("consultation.step3.referenceRequired"),
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.paymentReference ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("consultation.step3.paymentReferencePlaceholder")}
        />
        {errors.paymentReference && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paymentReference.message}
          </p>
        )}
      </div>

      {/* Upload Receipt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step3.uploadReceipt")}
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            paymentReceipt ? "border-green-300 bg-green-50" : "border-gray-300"
          }`}
        >
          <Upload
            className={`w-8 h-8 mx-auto mb-4 ${
              paymentReceipt ? "text-green-500" : "text-gray-400"
            }`}
          />
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="receipt-upload"
          />
          {!paymentReceipt ? (
            <>
              <label
                htmlFor="receipt-upload"
                className="cursor-pointer text-primary hover:text-primary/80"
              >
                {t("consultation.step3.chooseFile")}
              </label>
              <p className="text-sm text-gray-500 mt-2">
                {t("consultation.step3.fileFormat")}
              </p>
            </>
          ) : (
            <div className="space-y-2">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
              <p className="text-sm font-medium text-green-600">
                {paymentReceipt.name}
              </p>
              <p className="text-xs text-gray-500">
                {(paymentReceipt.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => setPaymentReceipt(null)}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                {t("consultation.step3.removeFile")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step4Schedule({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step4.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step4.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t("consultation.step4.preferredDate")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("preferredDate", {
              required: t("consultation.step4.dateRequired"),
            })}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
              errors.preferredDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.preferredDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t("consultation.step4.preferredTime")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            {...register("preferredTime", {
              required: t("consultation.step4.timeRequired"),
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
              errors.preferredTime ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">{t("consultation.step4.selectTime")}</option>
            <option value="09:00">
              {t("consultation.step4.timeSlots.0900")}
            </option>
            <option value="10:00">
              {t("consultation.step4.timeSlots.1000")}
            </option>
            <option value="11:00">
              {t("consultation.step4.timeSlots.1100")}
            </option>
            <option value="14:00">
              {t("consultation.step4.timeSlots.1400")}
            </option>
            <option value="15:00">
              {t("consultation.step4.timeSlots.1500")}
            </option>
            <option value="16:00">
              {t("consultation.step4.timeSlots.1600")}
            </option>
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-red-600">
              {errors.preferredTime.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Step5Method({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step5.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step5.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {/* Phone Consultation */}
        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input
            type="radio"
            value="phone"
            {...register("consultationMethod", {
              required: t("consultation.step5.methodRequired"),
            })}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Phone className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t("consultation.step5.methods.phone.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step5.methods.phone.description")}
            </p>
            <p className="text-sm text-gray-500 mt-1">+971 2 622 2210</p>
          </div>
        </label>

        {/* Video Meeting */}
        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input
            type="radio"
            value="video"
            {...register("consultationMethod")}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Video className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t("consultation.step5.methods.video.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step5.methods.video.description")}
            </p>
          </div>
        </label>

        {/* In-Person Meeting */}
        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input
            type="radio"
            value="in-person"
            {...register("consultationMethod")}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t("consultation.step5.methods.inPerson.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step5.methods.inPerson.description")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Hamdan Street, Al Building No. 6, Abu Dhabi
            </p>
          </div>
        </label>
      </div>

      {errors.consultationMethod && (
        <p className="text-sm text-red-600">
          {errors.consultationMethod.message}
        </p>
      )}
    </div>
  );
}

function Step6Duration({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step6.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step6.subtitle")}</p>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <Clock className="w-8 h-8 mr-3" />
          <div>
            <h3 className="text-xl font-semibold">
              {t("consultation.step6.standardPackage")}
            </h3>
            <p className="text-white/90">
              {t("consultation.step6.optimalSolution")}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step6.features.sessions")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step6.features.duration")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step6.features.flexibility")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step6.features.report")}</span>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">
              {t("consultation.step6.totalPrice")}
            </span>
            {/* <span className="text-2xl font-bold">2,000 AED</span> */}
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("packageAccepted", {
              required: t("consultation.step6.packageRequired"),
            })}
            className="mr-3"
          />
          <span className="text-gray-700">
            {t("consultation.step6.packageTerms")}
          </span>
        </label>
        {errors.packageAccepted && (
          <p className="mt-1 text-sm text-red-600">
            {errors.packageAccepted.message}
          </p>
        )}
      </div>
    </div>
  );
}

function Step7Report({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step7.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step7.subtitle")}</p>
      </div>

      <div className="bg-light rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-primary mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("consultation.step7.reportIncludes")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <span className="text-gray-700">
              {t("consultation.step7.includes.analysis")}
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <span className="text-gray-700">
              {t("consultation.step7.includes.recommendations")}
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <span className="text-gray-700">
              {t("consultation.step7.includes.opinion")}
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
            <span className="text-gray-700">
              {t("consultation.step7.includes.nextSteps")}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step7.reportLanguage")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          {...register("reportLanguage", {
            required: t("consultation.step7.languageRequired"),
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.reportLanguage ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{t("consultation.step7.selectLanguage")}</option>
          <option value="arabic">
            {t("consultation.step7.languages.arabic")}
          </option>
          <option value="english">
            {t("consultation.step7.languages.english")}
          </option>
          <option value="both">{t("consultation.step7.languages.both")}</option>
        </select>
        {errors.reportLanguage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.reportLanguage.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("consultation.step7.deliveryMethod")}
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="email"
              {...register("deliveryMethod")}
              className="mr-3"
              defaultChecked
            />
            <span>{t("consultation.step7.deliveryOptions.email")}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="pickup"
              {...register("deliveryMethod")}
              className="mr-3"
            />
            <span>{t("consultation.step7.deliveryOptions.pickup")}</span>
          </label>
          {/* Removed unused option for mail */}
        </div>
      </div>
    </div>
  );
}

function Step8Privacy({ register, errors, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step8.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step7.subtitle")}</p>
      </div>

      {/* Confidentiality Agreement */}
      <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 mr-3" />
          <h3 className="text-xl font-semibold">
            {t("consultation.step8.confidentialityAgreement")}
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-white/90">
            {t("consultation.step8.confidentialityText1")}
          </p>
          <p className="text-white/90">
            {t("consultation.step8.confidentialityText2")}
          </p>
        </div>
      </div>

      {/* Equal Treatment */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("consultation.step8.individualDifferences")}
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            {t("consultation.step8.equalTreatment.background")}
          </p>
          <p className="text-gray-700">
            {t("consultation.step8.equalTreatment.professional")}
          </p>
          <p className="text-gray-700">
            {t("consultation.step8.equalTreatment.cultural")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register("privacyAccepted", {
              required: t("consultation.step8.privacyRequired"),
            })}
            className="mt-1 mr-3"
          />
          <span className="text-gray-700">
            {t("consultation.step8.agreements.privacy")}
          </span>
        </label>

        {(errors.privacyAccepted || errors.dataProtectionAccepted) && (
          <div className="text-sm text-red-600">
            {errors.privacyAccepted?.message ||
              errors.dataProtectionAccepted?.message}
          </div>
        )}
      </div>
    </div>
  );
}

function Step9Confirmation({ formData, t }) {
  const getServiceLabel = (value) => {
    return t(`consultation.services.${value}`);
  };

  const getMethodLabel = (value) => {
    return t(
      `consultation.step5.methods.${
        value === "in-person" ? "inPerson" : value
      }.title`
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step9.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step9.subtitle")}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-primary text-white p-4">
          <h3 className="text-lg font-semibold">
            {t("consultation.step9.bookingSummary")}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("consultation.step9.serviceType")}
              </label>
              <p className="text-gray-900">
                {getServiceLabel(formData.serviceType)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("consultation.step9.consultationMethod")}
              </label>
              <p className="text-gray-900">
                {getMethodLabel(formData.consultationMethod)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("consultation.step9.dateTime")}
              </label>
              <p className="text-gray-900">
                {formData.preferredDate} at {formData.preferredTime}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("consultation.step9.reportLanguage")}
              </label>
              <p className="text-gray-900 capitalize">
                {formData.reportLanguage}
              </p>
            </div>
          </div>

          {formData.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("consultation.step9.caseDescription")}
              </label>
              <p className="text-gray-900">{formData.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-light rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {t("consultation.step9.nextSteps")}
        </h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              1
            </div>
            <span className="text-gray-700">
              {t("consultation.step9.nextStepsItems.email")}
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              2
            </div>
            <span className="text-gray-700">
              {t("consultation.step9.nextStepsItems.prepare")}
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              3
            </div>
            <span className="text-gray-700">
              {t("consultation.step9.nextStepsItems.consultation")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map step ID to component
const StepComponents = {
  1: Step1Contact,
  2: Step2ServiceType,
  3: Step3Payment,
  4: Step4Schedule,
  5: Step5Method,
  6: Step6Duration,
  7: Step7Report,
  8: Step8Privacy,
  9: Step9Confirmation,
};
// --- END: STEP COMPONENTS ---

/**
 * Main ConsultationForm Component
 */
function ConsultationForm() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const formRef = useRef(null); // Ref for the form element

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [paymentReceipt, setPaymentReceipt] = useState(null); // File state
  const { initialServiceId } = useParams(); // Get initial service from URL

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      serviceType: initialServiceId || "",
      // Initialize other fields if needed
      deliveryMethod: "email", // Default for step 7
      consultationMethod: "phone", // Default for step 5
      reportLanguage: "english", // Default for step 7
    },
  });

  const formData = watch();

  useEffect(() => {
    if (initialServiceId) {
      // Potentially set service type if not already done by defaultValues
    }
  }, [initialServiceId]);

  // Function to scroll to the top of the form
  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * Handles moving to the next step, triggering validation for the current step's fields.
   */
  const handleNext = async () => {
    const currentStepConfig = STEPS.find((step) => step.id === currentStep);
    if (!currentStepConfig) return;

    // Trigger validation for fields in the current step
    const isValid = await trigger(currentStepConfig.fields);

    if (isValid) {
      // Special validation for Step 3: Payment Receipt upload
      if (currentStep === 3 && !paymentReceipt) {
        // Only require paymentReference validation via react-hook-form,
        // but alert/warn if no receipt is uploaded, though not strictly
        // blocking if the user has a reference number. For this implementation,
        // let's assume the receipt is highly recommended/required if a reference is provided.
        // For simplicity, we'll allow skipping the file upload if no server side upload logic is defined.
        // If a receipt is mandatory for the flow, add an error state here.
      }

      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        scrollToTop(); // Scroll to top on step change
      }
    } else {
      // Focus on the first invalid field (optional but good UX)
      // The trigger function should handle focus on error if configured, but explicit scrolling
      // ensures the user sees the error context.
      scrollToTop();
    }
  };

  /**
   * Handles moving back to the previous step.
   */
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop(); // Scroll to top on step change
    }
  };

  /**
   * Submits the form data. This function is called after the final step's validation passes.
   * @param {object} data - The validated form data.
   */
  const onSubmit = async (data) => {
    if (currentStep !== STEPS.length - 1) {
      // This should ideally not happen if the next button is handled correctly,
      // but acts as a safeguard.
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    // Prepare data for email
    const templateParams = {
      ...data,
      service_type_name: t(`consultation.services.${data.serviceType}`),
      consultation_method_name: t(
        `consultation.step5.methods.${
          data.consultationMethod === "in-person"
            ? "inPerson"
            : data.consultationMethod
        }.title`
      ),
      receipt_info: paymentReceipt
        ? `File uploaded: ${paymentReceipt.name} (${(
            paymentReceipt.size /
            1024 /
            1024
          ).toFixed(2)} MB)`
        : "No receipt uploaded.",
      // Add other necessary fields for the email template
    };

    try {
      // This is a placeholder for actual email sending logic.
      // emailjs usually doesn't handle file attachments directly in the same way as a full backend.
      // For production, the file (paymentReceipt) should be uploaded to a cloud storage (e.g., S3)
      // and the resulting URL should be sent in the email parameters.
      // Since this is a client-side component, we'll simulate the process without complex file upload.

      // Simulate API call for form data
      // await sendFormDataToServer(data, paymentReceipt);

      // Simulate email sending
      await emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        templateParams,
        emailConfig.publicKey
      );

      // Move to the final confirmation step
      setCurrentStep(STEPS.length);
      reset(data); // Optionally reset form or keep data for confirmation page display
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError(t("consultation.submissionError"));
      setCurrentStep(STEPS.length - 1); // Stay on the last step before confirmation
    } finally {
      setIsSubmitting(false);
      scrollToTop(); // Scroll to the top to show the submission result/confirmation
    }
  };

  const CurrentStepComponent = StepComponents[currentStep];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="space-y-8"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <StepIndicator currentStep={currentStep} language={language} t={t} />

        <div className="p-4 md:p-6 border border-gray-200 rounded-xl">
          {CurrentStepComponent && (
            <CurrentStepComponent
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
              setPaymentReceipt={setPaymentReceipt}
              paymentReceipt={paymentReceipt}
              formData={formData} // Pass all form data for the confirmation step
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < STEPS.length && (
          <div className="flex justify-between pt-4 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                {language === "ar" ? (
                  <ChevronRight className="w-5 h-5 ml-2" />
                ) : (
                  <ChevronLeft className="w-5 h-5 mr-2" />
                )}
                {t("consultation.back")}
              </button>
            )}

            {currentStep < STEPS.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors ml-auto"
                disabled={isSubmitting}
              >
                {t("consultation.next")}
                {language === "ar" ? (
                  <ChevronLeft className="w-5 h-5 mr-2" />
                ) : (
                  <ChevronRight className="w-5 h-5 ml-2" />
                )}
              </button>
            )}

            {currentStep === STEPS.length - 1 && (
              <button
                type="submit"
                className={`flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                  currentStep > 1 ? "ml-auto" : "w-full justify-center"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("consultation.submitting")
                  : t("consultation.submit")}
                <Check className="w-5 h-5 ml-2" />
              </button>
            )}
            {/* Conditional styling to ensure the Next/Submit button aligns right when Back button is present */}
            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full justify-center"
                disabled={isSubmitting}
              >
                {t("consultation.next")}
                {language === "ar" ? (
                  <ChevronLeft className="w-5 h-5 mr-2" />
                ) : (
                  <ChevronRight className="w-5 h-5 ml-2" />
                )}
              </button>
            )}
          </div>
        )}

        {submissionError && (
          <div className="text-red-600 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {submissionError}
          </div>
        )}
      </form>
      {currentStep === STEPS.length && (
        <div className="text-center pt-8">
          <button
            onClick={() => {
              reset();
              setCurrentStep(1);
              setPaymentReceipt(null);
              scrollToTop();
            }}
            className="px-6 py-3 mt-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center mx-auto"
          >
            <Users className="w-5 h-5 mr-2" />
            {t("consultation.startNew")}
          </button>
        </div>
      )}
    </div>
  );
}

export default ConsultationForm;
