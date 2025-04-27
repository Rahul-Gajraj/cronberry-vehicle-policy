import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  CREDIT_CARD_DETAILS,
  DEBIT_CARD_DETAILS,
  MODES,
  MODS_REQUIRING_UTR,
  NET_BANKING_DETAILS,
  PHONEPE_DETAILS,
} from "../../utils/constants";

const PaymentInsurance = ({
  defaultValues,
  onNextStepChange,
  onPrevStepChange,
}) => {
  const {
    control,
    watch,
    setValue,
    setError,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const modeOfInsurancePayment = watch("modeOfInsurancePayment");

  const onSubmit = (data) => {
    if (modeOfInsurancePayment.length == 0) {
      setError("modeOfInsurancePayment", {
        type: "custom",
        message: "Select One Payment Method",
      });
      return;
    }
    onNextStepChange({
      ...defaultValues,
      ...data,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <Label className="block text-base mb-2 font-medium text-gray-700">
              Mode of Payment to Insurance Company
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MODES.map((mode) => (
                <Controller
                  key={mode}
                  name="modeOfInsurancePayment"
                  control={control}
                  render={({ field }) => {
                    const isChecked = field.value.includes(mode);
                    return (
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, mode]);
                            } else {
                              field.onChange(
                                field.value.filter((m) => m !== mode)
                              );
                            }
                          }}
                        />
                        {mode}
                      </label>
                    );
                  }}
                />
              ))}
              {errors.modeOfInsurancePayment && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.modeOfInsurancePayment.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600">
              Total Amount Paid to Insurance Agency
            </Label>
            <Controller
              name="totalInsuranceAgencyAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value);
                  }}
                  className="h-8"
                  placeholder="Enter Insurance Agency Amount"
                />
              )}
            />
            {errors.totalInsuranceAgencyAmount && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.totalInsuranceAgencyAmount.message}
                </p>
              </div>
            )}
          </div>

          {modeOfInsurancePayment.includes("Cheque") && (
            <div>
              <Label className="text-sm text-gray-600">
                Cheque Amount Paid To Insurance Company
              </Label>
              <Controller
                name="insuranceChequeAmount"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="Enter Cheque Amount"
                  />
                )}
              />
              {errors.insuranceChequeAmount && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.insuranceChequeAmount.message}
                  </p>
                </div>
              )}
            </div>
          )}
          {modeOfInsurancePayment.includes("NEFT/RTGS") && (
            <div>
              <Label className="text-sm text-gray-600">
                NEFT Or RTGS Amount Paid to Insurance Company
              </Label>
              <Controller
                name="insuranceNeftAmount"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="Enter NEFT/RTGS Amount"
                  />
                )}
              />
              {errors.insuranceNeftAmount && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.insuranceNeftAmount.message}
                  </p>
                </div>
              )}
            </div>
          )}
          {modeOfInsurancePayment.includes("Google Pay") && (
            <>
              <div>
                <Label>Select Google Pay Detail</Label>
                <Controller
                  name="selectedGooglePay"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue) => {
                        newValue && onChange(newValue);
                      }}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {NET_BANKING_DETAILS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedGooglePay && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.selectedGooglePay.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Google Pay Amount Paid to Insurance Company
                </Label>
                <Controller
                  name="insuranceGoogleAmount"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                      className="h-8"
                      placeholder="Enter Google Pay Amount"
                    />
                  )}
                />
                {errors.insuranceGoogleAmount && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.insuranceGoogleAmount.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {modeOfInsurancePayment.includes("Cash") && (
            <div>
              <Label className="text-sm text-gray-600">
                Cash Amount Paid to Insurance Company
              </Label>
              <Controller
                name="cashAmount"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="Enter Cash Amount"
                  />
                )}
              />
              {errors.cashAmount && (
                <div className="flex">
                  <p className="text-red-600">{errors.cashAmount.message}</p>
                </div>
              )}
            </div>
          )}
          {modeOfInsurancePayment.includes("Debit Card") && (
            <>
              <div>
                <Label className="text-sm text-gray-600">
                  Debit Card Amount Paid to Insurance Company
                </Label>
                <Controller
                  name="debitCardAmount"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="h-8"
                      placeholder="Enter Debit Card Amount"
                    />
                  )}
                />
                {errors.debitCardAmount && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.debitCardAmount.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label>Select Debit Card</Label>
                <Controller
                  name="selectedDebitCard"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue) => {
                        newValue && onChange(newValue);
                      }}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEBIT_CARD_DETAILS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedDebitCard && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.selectedDebitCard.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {modeOfInsurancePayment.includes("Credit Card") && (
            <>
              <div>
                <Label className="text-sm text-gray-600">
                  Credit Card Amount Paid to Insurance Company
                </Label>
                <Controller
                  name="creditCardAmount"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="h-8"
                      placeholder="Enter Credit Card Amount"
                    />
                  )}
                />
                {errors.creditCardAmount && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.creditCardAmount.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label>Select Credit Card</Label>
                <Controller
                  name="selectedCreditCard"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue) => {
                        newValue && onChange(newValue);
                      }}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {CREDIT_CARD_DETAILS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedCreditCard && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.selectedCreditCard.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {modeOfInsurancePayment.includes("Netbanking") && (
            <>
              <div>
                <Label>Select Netbanking Detail</Label>
                <Controller
                  name="selectedNetBanking"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue) => {
                        newValue && onChange(newValue);
                      }}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {NET_BANKING_DETAILS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedNetBanking && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.selectedNetBanking.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Netbanking Amount Paid to Insurance Company
                </Label>
                <Controller
                  name="insuranceNetBankingAmount"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                      className="h-8"
                      placeholder="Enter Insurance Netbanking Amount"
                    />
                  )}
                />
                {errors.insuranceNetBankingAmount && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.insuranceNetBankingAmount.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {modeOfInsurancePayment.includes("PhonePe") && (
            <>
              <div>
                <Label>Select PhonePe Detail</Label>
                <Controller
                  name="selectedPhonePe"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue) => {
                        newValue && onChange(newValue);
                      }}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {PHONEPE_DETAILS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedPhonePe && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.selectedPhonePe.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Phonepe Amount Paid to Insurance Company
                </Label>
                <Controller
                  name="insurancePhonePeAmount"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                      className="h-8"
                      placeholder="Enter Insurance PhonePe Amount"
                    />
                  )}
                />
                {errors.insurancePhonePeAmount && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.insurancePhonePeAmount.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <Label className="text-sm text-gray-600">
              Date of Payment to Insurance Company
            </Label>
            <Controller
              name="dateOfInsurancePayment"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input {...field} type="date" className="h-8" />
              )}
            />
            {errors.dateOfInsurancePayment && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.dateOfInsurancePayment.message}
                </p>
              </div>
            )}
          </div>

          {/* {modeOfInsurancePayment.includes("QR Code") && (
            <div>
              <Label className="text-sm text-gray-600">
                UTR / Transaction ID / Cheque Details
              </Label>
              <Controller
                name="insuranceTransactionId"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="Enter UTR / Transaction ID / Cheque Details"
                  />
                )}
              />
              {errors.insuranceTransactionId && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.insuranceTransactionId.message}
                  </p>
                </div>
              )}
            </div>
          )} */}

          {modeOfInsurancePayment.some((mode) =>
            MODS_REQUIRING_UTR.includes(mode)
          ) && (
            <div>
              <Label className="text-sm text-gray-600">
                UTR / Transaction ID / Cheque Details
              </Label>
              <Controller
                name="insuranceTransactionId"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    placeholder="Enter UTR / Transaction ID / Cheque Details"
                    {...field}
                    className="h-8"
                  />
                )}
              />
              {errors.insuranceTransactionId && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.insuranceTransactionId.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onPrevStepChange}
          >
            Previous
          </Button>
          <Button className="cursor-pointer">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentInsurance;
