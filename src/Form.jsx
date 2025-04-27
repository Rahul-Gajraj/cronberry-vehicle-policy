import React, { useState } from "react";

import { FORM_DEFAULT_VALUES } from "./utils/constants";
import CustomerDetails from "./components/form/CustomerDetails";
import VehicleDetails from "./components/form/VehicleDetails";
import PolicyDetails from "./components/form/PolicyDetails";
import NewPolicyDetails from "./components/form/NewPolicyDetails";
import PaymentInsurance from "./components/form/PaymentInsurance";
import PaymentCustomer from "./components/form/PaymentCustomer";
import PUCDetails from "./components/form/PUCDetails";

export default function CustomerDetailsForm() {
  const [multiStepFormData, setMultiStepFormData] =
    useState(FORM_DEFAULT_VALUES);

  const [step, setStep] = useState(1);

  const onPrevStepChange = () => {
    setStep((prev) => prev - 1);
  };

  const onNextStepChange = (data) => {
    setMultiStepFormData((prev) => ({ ...prev, [`step${step}`]: data }));
    setStep((prev) => prev + 1);
  };

  const handleFormSubmit = async (data) => {
    const {
      customerType,
      title,
      customerName,
      ucName,
      fatherName,
      dob,
      companyName,
      primaryPhone,
      whatsappSame,
      whatsappNumber,
      pincode,
      country,
      state,
      city,
      locality,
      address,
      serviceNumber,
    } = multiStepFormData.step1;
    const {
      proposalType,
      policyType,
      receiptNumber,
      receiptDate,
      vehicleYear,
      registrationNumber,
      registrationDate,
      chassisNumber,
      engineNumber,
      manufacturingYear,
      rtoState,
      rtoCity,
      product,
      manufacturerType,
      model,
      varience,
      fuelType,
    } = multiStepFormData.step2;
    const {
      previousPolicyAvailable,
      previousPolicyType,
      previousInsurer,
      policyNumber,
      previousPolicyStartDate,
      previousPolicyEndDate,
      odOnlyPolicyStartDate,
      odOnlyPolicyEndDate,
      tpOnlyPolicyStartDate,
      tpOnlyPolicyEndDate,
      anyClaim,
      ncb,
    } = multiStepFormData.step3;
    const {
      newPolicyStartDate,
      newPolicyEndDate,
      newODPolicyStartDate,
      newODPolicyEndDate,
      newTPPolicyStartDate,
      newTPPolicyEndDate,
      newNcb,
      brockerName,
      newPolicyNumber,
      insurerName,
      policyIssueDate,
      ivd,
      addon,
      odAmount,
      tpAmount,
      odTpAmount,
      gstAmount,
      totalPremiumWithGST,
      breakingCharge,
      waiverAmount,
      netPayable,
    } = multiStepFormData.step4;
    const {
      modeOfInsurancePayment,
      selectedDebitCard,
      selectedCreditCard,
      selectedPhonePe,
      selectedNetBanking,
      selectedGooglePay,
      debitCardAmount,
      creditCardAmount,
      insuranceGoogleAmount,
      insurancePhonePeAmount,
      totalInsuranceAgencyAmount,
      insuranceNetBankingAmount,
      insuranceNeftAmount,
      insuranceChequeAmount,
      cashAmount,
      dateOfInsurancePayment,
      insuranceTransactionId,
    } = multiStepFormData.step5;
    const {
      modeOfCustomerPayment,
      paymentReceivedStatus,
      dueAmount,
      paymentClearDate,
      pendingPaymentComments,
      customerCashAmount,
      customerDebitCardAmount,
      customerCreditCardAmount,
      customerQrAmount,
      dateOfCustomerPayment,
      customerTransactionId,
      customerChequeAmount,
      customerGooglePayAmount,
      customerNetBankingAmount,
      customerPhonePeAmount,
      customerNeftAmount,
    } = multiStepFormData.step6;
    const {
      callExecutive,
      fieldExecutive,
      policyUnderwritterExecutive,
      pucCertificate,
      pucStartDate,
      pucEndDate,
      remarks,
    } = data;

    const payload = {
      projectKey: "VW50aXRsZSBQcm9qZWN0MTc0MDM4ODgxMjc0NQ==",
      email: "",
      mobile: primaryPhone,
      name: customerName,
      audienceId: "",
      paramList: {
        projectKey: "VW50aXRsZSBQcm9qZWN0MTc0MDM4ODgxMjc0NQ==",
        audienceId: "_id (number)",
        audience_id: "",
        ios_fcm_token: "",
        email: "",
        android_fcm_token: "",
        name: customerName,
        updated: "",
        web_fcm_token: "",
        mobile: primaryPhone,
        paramList: [
          {
            paramKey: "google_pay_amount_paid_by_customer",
            paramValue: customerGooglePayAmount,
          },
          {
            paramKey: "tp_policy_end_date",
            paramValue: tpOnlyPolicyEndDate,
          },
          {
            paramKey: "year",
            paramValue: vehicleYear,
          },
          {
            paramKey: "od_policy_start_date",
            paramValue: odOnlyPolicyStartDate,
          },
          {
            paramKey: "previous_policy_number",
            paramValue: policyNumber,
          },
          {
            paramKey: "mode_of_payment_by_customer",
            // paramValue: "",
            paramValue: modeOfCustomerPayment.join(","),
          },
          {
            paramKey: "insurer_name",
            paramValue: insurerName,
          },
          {
            paramKey: "uc_name",
            paramValue: ucName,
          },
          // {
          //   paramKey: "total_payout_by_insurance_company",
          //   paramValue: "",
          // },
          {
            paramKey: "new_policy_start_date",
            paramValue: newPolicyStartDate,
          },
          {
            paramKey: "gst_amount",
            paramValue: gstAmount,
          },
          {
            paramKey: "total_amount_paid_to_insurance_agency",
            paramValue: totalInsuranceAgencyAmount,
          },
          {
            paramKey: "google_pay_details",
            paramValue: selectedGooglePay,
          },
          {
            paramKey: "model",
            paramValue: model,
          },
          {
            paramKey: "state",
            paramValue: state,
          },
          {
            paramKey: "policy_issue_date",
            paramValue: policyIssueDate,
          },
          // {
          //   paramKey: "od_percent_to_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "cheque_amount_paid_by_customer",
            paramValue: customerChequeAmount,
          },
          {
            paramKey: "pincode",
            paramValue: pincode,
          },
          {
            paramKey: "mode_of_payment_to_insurance_company",
            // paramValue: "",
            paramValue: modeOfInsurancePayment.join(","),
          },
          // {
          //   paramKey: "manufacturing_month",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "prev_telecaller_name",
          //   paramValue: "",
          // },
          {
            paramKey: "cash_amount_paid_to_insurance_company",
            paramValue: cashAmount,
          },
          {
            paramKey: "locality",
            paramValue: locality,
          },
          {
            paramKey: "new_tp_policy_start_date",
            paramValue: newTPPolicyStartDate,
          },
          // {
          //   paramKey: "netbanking_details_of_customer",
          //   paramValue: "",
          // },
          {
            paramKey: "breaking_charge",
            paramValue: breakingCharge,
          },
          {
            paramKey: "policy_type",
            paramValue: policyType,
          },
          {
            paramKey: "total_amount_recieved", // customer all amounts sum
            paramValue: `${
              Number(debitCardAmount) +
              Number(creditCardAmount) +
              Number(insuranceGoogleAmount) +
              Number(insurancePhonePeAmount) +
              Number(totalInsuranceAgencyAmount) +
              Number(insuranceNetBankingAmount) +
              Number(insuranceNeftAmount) +
              Number(insuranceChequeAmount) +
              Number(cashAmount)
            }`,
          },
          {
            paramKey: "credit_card_amount_paid_to_insurance_company",
            paramValue: creditCardAmount,
          },
          {
            paramKey: "netbanking_amount_paid_by_customer",
            paramValue: customerNetBankingAmount,
          },
          // {
          //   paramKey: "vehicle_class",
          //   paramValue: "",
          // },
          {
            paramKey: "company_name",
            paramValue: companyName,
          },
          // {
          //   paramKey: "additional_contact_details",
          //   paramValue: "",
          // },
          {
            paramKey: "new_od_policy_end_date",
            paramValue: newODPolicyEndDate,
          },
          // {
          //   paramKey: "cubic_capacity",
          //   paramValue: "",
          // },
          {
            paramKey: "new_od_policy_start_date",
            paramValue: newODPolicyStartDate,
          },
          // {
          //   paramKey: "mode_of_payment",
          //   paramValue: "",
          // },
          {
            paramKey: "previous_policy",
            paramValue: previousPolicyAvailable,
          },
          {
            paramKey: "manufacturer_type",
            paramValue: manufacturerType,
          },
          {
            paramKey: "date_of_payment_to_insurance_company",
            paramValue: dateOfInsurancePayment,
          },
          // {
          //   paramKey: "total_payout_pending_to_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "netbanking_details",
            paramValue: selectedNetBanking,
          },
          {
            paramKey: "city",
            paramValue: city,
          },
          {
            paramKey: "tp_policy_start_date",
            paramValue: tpOnlyPolicyStartDate,
          },
          {
            paramKey: "date_of_birth",
            paramValue: dob,
          },
          {
            paramKey: "date_of_payment_by_customer",
            paramValue: dateOfCustomerPayment,
          },
          {
            paramKey: "new_tp_policy_end_date",
            paramValue: newTPPolicyEndDate,
          },
          // {
          //   paramKey: "od_and_net_percent_by_insurance_company",
          //   paramValue: "",
          // },
          {
            paramKey: "previous_policy_claim",
            paramValue: anyClaim,
          },
          {
            paramKey: "ncb",
            paramValue: ncb,
          },
          {
            paramKey: "debit_card_amount_paid_by_customer",
            paramValue: customerDebitCardAmount,
          },
          {
            paramKey: "phone_pe_amount_paid_by_customer",
            paramValue: customerPhonePeAmount,
          },
          {
            paramKey: "policy_number",
            paramValue: newPolicyNumber,
          },
          // {
          //   paramKey: "policy_end_date",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "payout_received_by_insurance_company",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "policy_start_date",
          //   paramValue: "",
          // },
          {
            paramKey: "utr_or_transaction_id_or_cheque_number",
            paramValue: insuranceTransactionId,
          },
          {
            paramKey: "cash_amount_paid_by_customer",
            paramValue: customerCashAmount,
          },
          // {
          //   paramKey: "net_percent_by_insurance_company",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "cheque_clear_on_own_bank_detail",
          //   paramValue: "",
          // },
          {
            paramKey: "phonepe_amount_paid_to_insurance_company",
            paramValue: insurancePhonePeAmount,
          },
          {
            paramKey: "utr_or_transaction_id_or_cheque_details_of_customer",
            paramValue: customerTransactionId,
          },
          {
            paramKey: "address",
            paramValue: address,
          },
          // {
          //   paramKey: "net_percent_to_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "netbanking_amount_paid_to_insurance_company",
            paramValue: insuranceNetBankingAmount,
          },
          {
            paramKey: "previous_policy_type",
            paramValue: previousPolicyType,
          },
          {
            paramKey: "pollution_under_control_certificate_number",
            paramValue: pucCertificate,
          },
          // {
          //   paramKey: "alternate",
          //   paramValue: "",
          // },
          {
            paramKey: "puc_end_date",
            paramValue: pucEndDate,
          },
          {
            paramKey: "credit_card_amount_paid_by_customer",
            paramValue: customerCreditCardAmount,
          },
          {
            paramKey: "receipt_number",
            paramValue: receiptNumber,
          },
          {
            paramKey: "call_executive_reference",
            // paramValue: "",
            paramValue: callExecutive.join(","),
          },
          {
            paramKey: "broker_or_agency_name",
            paramValue: brockerName,
          },
          {
            paramKey: "is_whatsapp_number_same_as_primary_number",
            paramValue: whatsappSame,
          },
          // {
          //   paramKey: "payout_pending_by_insurance_company",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "type_of_vehicle",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "financed_by",
          //   paramValue: "",
          // },
          {
            paramKey: "date",
            paramValue: receiptDate,
          },
          {
            paramKey: "country",
            paramValue: country,
          },
          {
            paramKey: "neft_or_rtgs_amount_paid_by_customer",
            paramValue: customerNeftAmount,
          },
          {
            paramKey: "service_book_number",
            paramValue: serviceNumber,
          },
          // {
          //   paramKey: "vehicle_category",
          //   paramValue: "",
          // },
          {
            paramKey: "chassis_number",
            paramValue: chassisNumber,
          },
          {
            paramKey: "customer_cheque_number",
            paramValue: customerTransactionId,
          },
          {
            paramKey: "qr_amount_paid_by_customer",
            paramValue: customerQrAmount,
          },
          {
            paramKey: "rto_city",
            paramValue: rtoCity,
          },
          {
            paramKey: "variant",
            paramValue: varience,
          },
          // {
          //   paramKey: "amount_due",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "tag",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "agent_code",
          //   paramValue: "",
          // },
          {
            paramKey: "fuel_type",
            paramValue: fuelType,
          },
          // {
          //   paramKey: "total_payout_received_by_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "field_executive_reference",
            // paramValue: "",
            paramValue: fieldExecutive.join(","),
          },
          {
            paramKey: "whatsapp_number",
            paramValue: whatsappNumber,
          },
          // {
          //   paramKey: "seat_including_driver",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "commission_detail_by_insurance_company",
          //   paramValue: "",
          // },
          {
            paramKey: "product_name",
            paramValue: product,
          },
          {
            paramKey: "debit_card_details",
            paramValue: selectedDebitCard, // need to discuss
          },
          // {
          //   paramKey: "customer_chq_date",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "financed",
          //   paramValue: "",
          // },
          {
            paramKey: "payment_received_status",
            paramValue: paymentReceivedStatus,
          },
          {
            paramKey: "google_pay_amount_paid_to_insurance_company",
            paramValue: insuranceGoogleAmount,
          },
          // {
          //   paramKey: "od_percent_by_insurance_company",
          //   paramValue: "",
          // },
          {
            paramKey: "registration_date",
            paramValue: registrationDate,
          },
          {
            paramKey: "credit_card_details",
            paramValue: selectedCreditCard,
          },
          {
            paramKey: "father_name",
            paramValue: fatherName,
          },
          {
            paramKey: "idv",
            paramValue: ivd,
          },
          {
            paramKey: "expected_pending_payment_clear_date",
            paramValue: paymentClearDate,
          },
          {
            paramKey: "customer_type",
            paramValue: customerType,
          },
          {
            paramKey: "rto_state",
            paramValue: rtoState,
          },
          {
            paramKey: "addon",
            paramValue: addon,
          },
          {
            paramKey: "registration_number",
            paramValue: registrationNumber,
          },
          {
            paramKey: "debit_card_amount_paid_to_insurance_company",
            paramValue: debitCardAmount,
          },
          {
            paramKey: "due_amount_left_by_customer",
            paramValue: dueAmount,
          },
          // {
          //   paramKey: "commission_detail_to_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "od_amount",
            paramValue: odAmount,
          },
          {
            paramKey: "tp_amount",
            paramValue: tpAmount,
          },
          {
            paramKey: "title",
            paramValue: title,
          },
          {
            paramKey: "manufacturing_year",
            paramValue: manufacturingYear,
          },
          // {
          //   paramKey: "customer_bank",
          //   paramValue: "",
          // },
          {
            paramKey: "pending_payment_comments",
            paramValue: pendingPaymentComments,
          },
          // {
          //   paramKey: "total_payout_to_agent",
          //   paramValue: "",
          // },
          {
            paramKey: "total_amount_paid_by_customer", // sum of all select amount paied by customer
            paramValue: `${
              Number(customerCashAmount) +
              Number(customerDebitCardAmount) +
              Number(customerCreditCardAmount) +
              Number(customerQrAmount) +
              Number(customerChequeAmount) +
              Number(customerGooglePayAmount) +
              Number(customerNetBankingAmount) +
              Number(customerPhonePeAmount) +
              Number(customerNeftAmount)
            }`,
          },
          {
            paramKey: "engine_number",
            paramValue: engineNumber,
          },
          {
            paramKey: "previous_policy_expiry_date",
            paramValue: previousPolicyEndDate,
          },
          // {
          //   paramKey: "company",
          //   paramValue: "",
          // },
          {
            paramKey: "waiver_amount",
            paramValue: waiverAmount,
          },
          // {
          //   paramKey: "source_name",
          //   paramValue: "",
          // },
          {
            paramKey: "proposal_type",
            paramValue: proposalType,
          },
          {
            paramKey: "puc_start_date",
            paramValue: pucStartDate,
          },
          {
            paramKey: "previous_insurer_name",
            paramValue: previousInsurer,
          },
          {
            paramKey: "new_policy_end_date",
            paramValue: newPolicyEndDate,
          },
          {
            paramKey: "neft_or_rtgs_amount_paid_to_insurance_company",
            paramValue: insuranceNeftAmount,
          },
          {
            paramKey: "phonepe_details",
            paramValue: selectedPhonePe,
          },
          {
            paramKey: "total_premimum_with_gst",
            paramValue: totalPremiumWithGST,
          },
          {
            paramKey: "net_total_of_od_and_tp",
            paramValue: odTpAmount,
          },
          // {
          //   paramKey: "message",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "od_and_net_percent_to_agent",
          //   paramValue: "",
          // },
          // {
          //   paramKey: "amount_recieved",
          //   paramValue: "",
          // },
          {
            paramKey: "cheque_amount_paid_to_insurance_company",
            paramValue: insuranceChequeAmount,
          },
          // {
          //   paramKey: "cheque_clear_on_date",
          //   paramValue: "",
          // },
          {
            paramKey: "ncb_for_new_policy",
            paramValue: newNcb,
          },
          {
            paramKey: "customer_cheque_amount",
            paramValue: customerChequeAmount,
          },
          {
            paramKey: "od_policy_end_date",
            paramValue: odOnlyPolicyEndDate,
          },
          {
            paramKey: "net_payable__amount",
            paramValue: netPayable,
          },
          {
            paramKey: "previous_policy_start_date",
            paramValue: previousPolicyStartDate,
          },
          {
            paramKey: "remarks",
            paramValue: remarks,
          },
          {
            paramKey: "policy_underwriter_executive_reference",
            paramValue: policyUnderwritterExecutive,
          },
        ],
      },
    };

    try {
      const response = await fetch(
        "https://register.cronberry.com/api/campaign/register-audience-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.status) {
        setStep(1);
        setMultiStepFormData(FORM_DEFAULT_VALUES);
        alert("Submitted successfully to Cronberry");
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error submitting to Cronberry:", error);
      alert("Error occurred while submitting");
    }
  };

  const renderStepBar = () => {
    const stepLabels = [
      "Customer Details",
      "Vehicle Details",
      "Policy Details",
      "New Policy Details",
      "Payment to Insurance Company",
      "Payment by Customer",
      "Executive & PUC Details",
    ];
    return (
      <div className="flex justify-center items-center mb-6">
        {stepLabels.map((label, index) => {
          const current = index + 1;
          const isActive = current === step;
          const isCompleted = current < step;
          return (
            <div key={label} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-medium text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : isCompleted
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                {current}
              </div>
              <span
                className={`ml-2 mr-4 text-sm font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {label}
              </span>
              {index < stepLabels.length - 1 && (
                <div className="w-6 h-0.5 bg-gray-300 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CustomerDetails
            defaultValues={multiStepFormData.step1}
            onNextStepChange={onNextStepChange}
          />
        );
      case 2:
        return (
          <VehicleDetails
            defaultValues={multiStepFormData.step2}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
          />
        );
      case 3:
        return (
          <PolicyDetails
            defaultValues={multiStepFormData.step3}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
            proposalType={multiStepFormData.step2.proposalType}
            policyType={multiStepFormData.step2.policyType}
          />
        );
      case 4:
        return (
          <NewPolicyDetails
            defaultValues={multiStepFormData.step4}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
            proposalType={multiStepFormData.step2.proposalType}
            policyType={multiStepFormData.step2.policyType}
            previousClaim={multiStepFormData.step3.anyClaim}
          />
        );
      case 5:
        return (
          <PaymentInsurance
            defaultValues={multiStepFormData.step5}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
          />
        );
      case 6:
        return (
          <PaymentCustomer
            defaultValues={multiStepFormData.step6}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
          />
        );
      case 7:
        return (
          <PUCDetails
            defaultValues={multiStepFormData.step7}
            onNextStepChange={onNextStepChange}
            onPrevStepChange={onPrevStepChange}
            handleFormSubmit={handleFormSubmit}
          />
        );
      default:
        return (
          <div className="text-center text-red-500">
            Invalid step. Please go back and try again.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto text-sm">
      {renderStepBar()}
      {renderStepContent()}
    </div>
  );
}
