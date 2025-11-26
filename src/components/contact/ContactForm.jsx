import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { emailConfig } from "../../config/emailConfig";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactForm() {
  const { t } = useTranslation();
  const { lng } = useParams();
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

  const services = [
    {
      value: "administrative-cases",
      labelEn: "Administrative Cases",
      labelAr: "القضايا الإدارية",
    },
    {
      value: "labor-disputes",
      labelEn: "Labor Disputes",
      labelAr: "منازعات العمل",
    },
    {
      value: "rental-cases",
      labelEn: "Rental Cases",
      labelAr: "قضايا الإيجار",
    },
    {
      value: "contract-drafting",
      labelEn: "Contract Drafting",
      labelAr: "صياغة العقود",
    },
    {
      value: "civil-cases",
      labelEn: "Civil Cases",
      labelAr: "القضايا المدنية",
    },
    {
      value: "criminal-cases",
      labelEn: "Criminal Cases",
      labelAr: "القضايا الجنائية",
    },
    {
      value: "commercial-cases",
      labelEn: "Commercial Cases",
      labelAr: "القضايا التجارية",
    },
    {
      value: "personal-status",
      labelEn: "Personal Status Cases",
      labelAr: "قضايا الأحوال الشخصية",
    },
    { value: "arbitration", labelEn: "Arbitration", labelAr: "التحكيم" },
    {
      value: "penal-cases",
      labelEn: "Penal Cases",
      labelAr: "القضايا الجزائية",
    },
    {
      value: "debt-collection",
      labelEn: "Debt Collection",
      labelAr: "تحصيل الديون",
    },
    {
      value: "administrative-services",
      labelEn: "Administrative Services",
      labelAr: "الخدمات الإدارية",
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Prepare the email data to match your EmailJS template variables
    const emailData = {
      name: data.fullName, // matches {{name}} in your template
      email: data.email, // matches {{email}} in your template
      message: `
Phone: ${data.phone}
Service Requested: ${
        services.find((s) => s.value === data.serviceInterest)?.[
          lng === "ar" ? "labelAr" : "labelEn"
        ] ||
        data.serviceInterest ||
        "General Inquiry"
      }
Preferred Contact: ${data.preferredContact}

Message:
${data.message}
      `, // matches {{message}} in your template
      title:
        services.find((s) => s.value === data.serviceInterest)?.[
          lng === "ar" ? "labelAr" : "labelEn"
        ] || "General Inquiry", // matches {{title}} in subject
      reply_to: data.email,
    };

    try {
      // Send email using EmailJS (with proper initialization)
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailData
      );

      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Email sending error:", error);

      // More specific error message based on error type
      let errorMessage =
        lng === "ar"
          ? "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى."
          : "Failed to send message. Please try again.";

      if (error.status === 403) {
        errorMessage =
          lng === "ar"
            ? "خطأ في التفويض. تحقق من إعدادات EmailJS."
            : "Authorization error. Please check EmailJS settings.";
      } else if (error.status === 400) {
        errorMessage =
          lng === "ar" ? "خطأ في البيانات المرسلة." : "Invalid data sent.";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {lng === "ar"
              ? "تم إرسال رسالتك بنجاح"
              : "Message Sent Successfully!"}
          </h3>
          <p className="text-gray-600 mb-6">
            {lng === "ar"
              ? "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن."
              : "Thank you for contacting us. We will get back to you as soon as possible."}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {lng === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
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
        {lng === "ar" ? "نموذج الاتصال" : "Contact Form"}
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
          {lng === "ar" ? "الاسم الكامل" : "Full Name"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("fullName", {
            required:
              lng === "ar" ? "الاسم الكامل مطلوب" : "Full name is required",
            minLength: {
              value: 2,
              message:
                lng === "ar"
                  ? "الاسم يجب أن يكون حرفين على الأقل"
                  : "Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message:
                lng === "ar"
                  ? "الاسم يجب أن يكون أقل من 50 حرف"
                  : "Name must be less than 50 characters",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={
            lng === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"
          }
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
          {lng === "ar" ? "البريد الإلكتروني" : "Email Address"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required:
              lng === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message:
                lng === "ar"
                  ? "البريد الإلكتروني غير صحيح"
                  : "Invalid email address",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={
            lng === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address"
          }
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
          {lng === "ar" ? "رقم الهاتف" : "Phone Number"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register("phone", {
            required:
              lng === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required",
            validate: validateUAEPhone,
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={lng === "ar" ? "+971 50 123 4567" : "+971 50 123 4567"}
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
          {lng === "ar" ? "الخدمة المهتم بها" : "Service Interest"}
        </label>
        <select
          {...register("serviceInterest")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
        >
          <option value="">
            {lng === "ar" ? "اختر الخدمة" : "Select a service"}
          </option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {lng === "ar" ? service.labelAr : service.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lng === "ar" ? "الموضوع" : "Subject"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("subject", {
            required: lng === "ar" ? "الموضوع مطلوب" : "Subject is required",
            minLength: {
              value: 5,
              message:
                lng === "ar"
                  ? "الموضوع يجب أن يكون 5 أحرف على الأقل"
                  : "Subject must be at least 5 characters",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={
            lng === "ar"
              ? "أدخل موضوع رسالتك"
              : "Enter the subject of your message"
          }
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
          {lng === "ar" ? "الرسالة" : "Message"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          {...register("message", {
            required: lng === "ar" ? "الرسالة مطلوبة" : "Message is required",
            minLength: {
              value: 50,
              message:
                lng === "ar"
                  ? "الرسالة يجب أن تكون 50 حرف على الأقل"
                  : "Message must be at least 50 characters",
            },
            maxLength: {
              value: 1000,
              message:
                lng === "ar"
                  ? "الرسالة يجب أن تكون أقل من 1000 حرف"
                  : "Message must be less than 1000 characters",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={
            lng === "ar" ? "أدخل رسالتك هنا..." : "Enter your message here..."
          }
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
          {lng === "ar" ? "طريقة الاتصال المفضلة" : "Preferred Contact Method"}
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
            {lng === "ar" ? "البريد الإلكتروني" : "Email"}
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="phone"
              {...register("preferredContact")}
              className="mr-2"
            />
            <Phone className="w-4 h-4 mr-1" />
            {lng === "ar" ? "الهاتف" : "Phone"}
          </label>
        </div>
      </div>

      {/* Preferred Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lng === "ar" ? "الوقت المفضل للاتصال" : "Preferred Time to Contact"}
        </label>
        <select
          {...register("preferredTime")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
        >
          <option value="">{lng === "ar" ? "أي وقت" : "Any time"}</option>
          <option value="morning">
            {lng === "ar" ? "الصباح (8-12)" : "Morning (8-12)"}
          </option>
          <option value="afternoon">
            {lng === "ar" ? "بعد الظهر (12-17)" : "Afternoon (12-5)"}
          </option>
          <option value="evening">
            {lng === "ar" ? "المساء (17-20)" : "Evening (5-8)"}
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
            {lng === "ar" ? "جار الإرسال..." : "Sending..."}
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {lng === "ar" ? "إرسال الرسالة" : "Send Message"}
          </>
        )}
      </button>
    </form>
  );
}
