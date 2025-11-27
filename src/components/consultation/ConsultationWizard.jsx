import React, { useState, useEffect } from "react";
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
  Download,
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    key: "contact",
    titleEn: "Contact Info",
    titleAr: "معلومات الاتصال",
  },
  { id: 2, key: "service", titleEn: "Service Type", titleAr: "نوع الخدمة" },
  { id: 3, key: "schedule", titleEn: "Schedule", titleAr: "الجدولة" },
  { id: 4, key: "method", titleEn: "Method", titleAr: "الطريقة" },
  { id: 5, key: "duration", titleEn: "Duration", titleAr: "المدة" },
  { id: 6, key: "payment", titleEn: "Payment", titleAr: "الدفع" },
  { id: 7, key: "report", titleEn: "Report", titleAr: "التقرير" },
  { id: 8, key: "privacy", titleEn: "Privacy", titleAr: "الخصوصية" },
  { id: 9, key: "confirmation", titleEn: "Confirmation", titleAr: "التأكيد" },
];

function StepIndicator({ currentStep, language, t }) {
  return (
    <div className="mb-8">
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 px-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-medium ${
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

function Step1Contact({ register, watch, errors, language, t }) {
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

function Step2ServiceType({ register, watch, errors, language, t }) {
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

function Step3Schedule({ register, watch, errors, language, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step3.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step3.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t("consultation.step3.preferredDate")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("preferredDate", {
              required: t("consultation.step3.dateRequired"),
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
            {t("consultation.step3.preferredTime")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            {...register("preferredTime", {
              required: t("consultation.step3.timeRequired"),
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
              errors.preferredTime ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">{t("consultation.step3.selectTime")}</option>
            <option value="09:00">
              {t("consultation.step3.timeSlots.0900")}
            </option>
            <option value="10:00">
              {t("consultation.step3.timeSlots.1000")}
            </option>
            <option value="11:00">
              {t("consultation.step3.timeSlots.1100")}
            </option>
            <option value="14:00">
              {t("consultation.step3.timeSlots.1400")}
            </option>
            <option value="15:00">
              {t("consultation.step3.timeSlots.1500")}
            </option>
            <option value="16:00">
              {t("consultation.step3.timeSlots.1600")}
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

function Step4Method({ register, watch, errors, language, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step4.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step4.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {/* Phone Consultation */}
        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input
            type="radio"
            value="phone"
            {...register("consultationMethod", {
              required: t("consultation.step4.methodRequired"),
            })}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Phone className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t("consultation.step4.methods.phone.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step4.methods.phone.description")}
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
                {t("consultation.step4.methods.video.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step4.methods.video.description")}
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
                {t("consultation.step4.methods.inPerson.title")}
              </h3>
            </div>
            <p className="text-gray-600">
              {t("consultation.step4.methods.inPerson.description")}
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

function Step5Duration({ register, watch, errors, language, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step5.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step5.subtitle")}</p>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <Clock className="w-8 h-8 mr-3" />
          <div>
            <h3 className="text-xl font-semibold">
              {t("consultation.step5.standardPackage")}
            </h3>
            <p className="text-white/90">
              {t("consultation.step5.optimalSolution")}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step5.features.sessions")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step5.features.duration")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step5.features.flexibility")}</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-3" />
            <span>{t("consultation.step5.features.report")}</span>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">
              {t("consultation.step5.totalPrice")}
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
              required: t("consultation.step5.packageRequired"),
            })}
            className="mr-3"
          />
          <span className="text-gray-700">
            {t("consultation.step5.packageTerms")}
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
function Step6Payment({ register, watch, errors, language, t }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("consultation.step6.title")}
        </h2>
        <p className="text-gray-600">{t("consultation.step6.subtitle")}</p>
      </div>

      {/* Bank Details */}
      <div className="bg-light rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          {t("consultation.step6.bankDetails")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step6.bankName")}
            </label>
            <p className="text-gray-900 font-medium">Emirates NBD</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step6.accountNumber")}
            </label>
            <p className="text-gray-900 font-medium">1234567890</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("consultation.step6.accountName")}
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
          {t("consultation.step6.paymentReference")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("paymentReference", {
            required: t("consultation.step6.referenceRequired"),
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
            errors.paymentReference ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t("consultation.step6.paymentReferencePlaceholder")}
        />
        {errors.paymentReference && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paymentReference.message}
          </p>
        )}
      </div>
    </div>
  );
}

function Step7Report({ register, watch, errors, language, t }) {
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
          {/* <label className="flex items-center">
            <input
              type="radio"
              value="mail"
              {...register("deliveryMethod")}
              className="mr-3"
            />
            <span>{t("consultation.step7.deliveryOptions.mail")}</span>
          </label> */}
        </div>
      </div>
    </div>
  );
}

function Step8Privacy({ register, watch, errors, language, t }) {
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

function Step9Confirmation({ formData, language, t }) {
  const getServiceLabel = (value) => {
    return t(`consultation.services.${value}`);
  };

  const getMethodLabel = (value) => {
    return t(
      `consultation.step4.methods.${
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
              {t("consultation.step9.nextStepsItems.confirmation")}
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              3
            </div>
            <span className="text-gray-700">
              {t("consultation.step9.nextStepsItems.report")}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">
              {t("consultation.step9.bookingReference")} #ESN2024001
            </p>
            <p className="text-green-700 text-sm">
              {t("consultation.step9.keepReference")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationWizard() {
  const { lng } = useParams();
  const { t } = useTranslation();
  const language = lng || "en";
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
    watch,
    trigger,
  } = useForm();

  const formData = watch();

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Get the selected service name
      const selectedService = allServices.find(
        (s) => s.id === data.serviceType
      );
      const serviceName = selectedService
        ? t(`consultation.services.${selectedService.id}`)
        : data.serviceType || "General Consultation";

      // Generate booking reference
      const bookingRef = `ESN${Date.now()}`;

      // Prepare email data for consultation booking (to firm)
      const firmEmailData = {
        from_name: data.fullName,
        from_email: data.email,
        to_email: emailConfig.businessEmail, // Firm's email as recipient
        phone: data.phone,
        message: `
Consultation Booking Details:
Booking Reference: ${bookingRef}
Client Name: ${data.fullName}   
Client Email: ${data.email}     
Client Phone: ${data.phone}     

Service: ${serviceName}
Description: ${data.description || "Not provided"}

Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Consultation Method: ${data.consultationMethod}

Payment Reference: ${data.paymentReference}

This is a consultation booking request via the website.
        `,
        title: `Consultation Booking - ${serviceName}`,
        reply_to: data.email,
      };

      // Prepare confirmation email data for client
      const clientEmailData = {
        from_name: "Esnaad Legal Consultancy",
        from_email: emailConfig.businessEmail,
        to_email: data.email, // Client's email as recipient
        phone: data.phone,
        booking_reference: bookingRef,
        service_name: serviceName,
        consultation_date: data.preferredDate,
        consultation_time: data.preferredTime,
        consultation_method: data.consultationMethod,
        payment_reference: data.paymentReference,
        report_language: data.reportLanguage,
        delivery_method: data.deliveryMethod || "email",
        description: data.description || "Not provided",
        message: `
Dear ${data.fullName},

Thank you for booking a consultation with Esnaad Legal Consultancy. We have received your booking request and will confirm the appointment details shortly.

Booking Details:
- Booking Reference: ${bookingRef}
- Service: ${serviceName}
- Date & Time: ${data.preferredDate} at ${data.preferredTime}
- Method: ${data.consultationMethod}
- Payment Reference: ${data.paymentReference}

We will contact you within 24 hours to confirm your appointment and provide any additional details.

If you have any questions, please don't hesitate to contact us at +971 2 622 2210.

Best regards,
Esnaad Legal Consultancy Team
        `,
        title: `Consultation Booking Confirmation - ${bookingRef}`,
        reply_to: emailConfig.businessEmail,
      };

      // Send email to firm
      const firmResult = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        firmEmailData
      );

      console.log("Firm notification email sent successfully:", firmResult);

      // Send confirmation email to client
      const clientResult = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        clientEmailData
      );

      console.log("Client confirmation email sent successfully:", clientResult);

      setIsCompleted(true);
    } catch (error) {
      console.error("Booking error:", error);

      // Show error message to user
      let errorMessage =
        language === "ar"
          ? "حدث خطأ في حجز الاستشارة. يرجى المحاولة مرة أخرى."
          : "Failed to book consultation. Please try again.";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t("consultation.completion.success")}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t("consultation.completion.thankYou")}
            </p>
            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentStep(1);
              }}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              {t("consultation.completion.newConsultation")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-800/95 backdrop-blur-md text-white pt-60 pb-20 -mt-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("consultation.title")}</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            {t("consultation.subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-large p-8"
        >
          <StepIndicator currentStep={currentStep} language={language} t={t} />

          {currentStep === 1 && (
            <Step1Contact
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 2 && (
            <Step2ServiceType
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}

          {currentStep === 3 && (
            <Step3Schedule
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 4 && (
            <Step4Method
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 5 && (
            <Step5Duration
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 6 && (
            <Step6Payment
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 7 && (
            <Step7Report
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 8 && (
            <Step8Privacy
              register={register}
              watch={watch}
              errors={errors}
              language={language}
              t={t}
            />
          )}
          {currentStep === 9 && (
            <Step9Confirmation formData={formData} language={language} t={t} />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {language === "ar" ? (
                  <>
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {t("consultation.navigation.previous")}
                  </>
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t("consultation.navigation.previous")}
                  </>
                )}
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                {language === "ar" ? (
                  <>
                    {t("consultation.navigation.next")}
                    <ChevronLeft className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    {t("consultation.navigation.next")}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/50 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("consultation.navigation.confirming")}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t("consultation.navigation.confirmBooking")}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
