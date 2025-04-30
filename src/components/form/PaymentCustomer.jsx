import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CREDIT_CARD_DETAILS,
  DEBIT_CARD_DETAILS,
  MODES,
  MODS_REQUIRING_UTR,
  NET_BANKING_DETAILS,
  PHONEPE_DETAILS,
} from "../../utils/constants";

const PaymentCustomer = ({
  defaultValues,
  onNextStepChange,
  onPrevStepChange,
}) => {
  const {
    control,
    watch,
    setValue,
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const modeOfCustomerPayment = watch("modeOfCustomerPayment");
  const paymentReceivedStatus = watch("paymentReceivedStatus");

  const onSubmit = (data) => {
    onNextStepChange({
      ...defaultValues,
      ...data,
    });
  };

  return (
    <div className="rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          <div>
            <Label>Payment Received Status</Label>
            <Controller
              name="paymentReceivedStatus"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    reset();
                    newValue && onChange(newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Payment Received">
                      Full Payment Received
                    </SelectItem>
                    <SelectItem value="Partial Payment Received">
                      Partial Payment Received
                    </SelectItem>
                    <SelectItem value="Total Amount Due">
                      Total Amount Due
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paymentReceivedStatus && (
              <p className="text-red-600">
                {errors.paymentReceivedStatus.message}
              </p>
            )}
          </div>

          {paymentReceivedStatus.length > 0 && (
            <>
              {paymentReceivedStatus != "Total Amount Due" && (
                <div className="col-span-2">
                  <Label className="block text-base mb-2 font-medium text-gray-700">
                    Payment by Customer
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {MODES.map((mode) => (
                      <Controller
                        key={mode}
                        name="modeOfCustomerPayment"
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
                  </div>
                </div>
              )}

              {paymentReceivedStatus != "Total Amount Due" && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Date of Payment By Customer
                  </Label>
                  <Controller
                    name="dateOfCustomerPayment"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input {...field} type="date" className="h-8" />
                    )}
                  />
                  {errors.dateOfCustomerPayment && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.dateOfCustomerPayment.message}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {paymentReceivedStatus != "Full Payment Received" && (
                <>
                  <div>
                    <Label className="text-sm text-gray-600">
                      Due Amount Left By Customer
                    </Label>
                    <Controller
                      name="dueAmount"
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
                          placeholder="Enter Due Amount"
                        />
                      )}
                    />
                    {errors.dueAmount && (
                      <div className="flex">
                        <p className="text-red-600">
                          {errors.dueAmount.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      Expected Pending Payment Clear Date
                    </Label>
                    <Controller
                      name="paymentClearDate"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <Input
                          value={field.value}
                          type="date"
                          onChange={field.onChange}
                          className="h-8"
                          placeholder="Enter Due Amount"
                        />
                      )}
                    />
                    {errors.paymentClearDate && (
                      <div className="flex">
                        <p className="text-red-600">
                          {errors.paymentClearDate.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-600">
                      Pending Payment Comments
                    </Label>
                    <Controller
                      name="pendingPaymentComments"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <Textarea
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                          }}
                          className="h-8"
                          placeholder="Enter Comment"
                        />
                      )}
                    />
                    {errors.pendingPaymentComments && (
                      <div className="flex">
                        <p className="text-red-600">
                          {errors.pendingPaymentComments.message}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {modeOfCustomerPayment.includes("Cheque") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Cheque Amount Paid By Customer
                  </Label>
                  <Controller
                    name="customerChequeAmount"
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
                        placeholder="Enter Cheque Amount"
                      />
                    )}
                  />
                  {errors.customerChequeAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerChequeAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("NEFT/RTGS") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    NEFT Or RTGS Amount Paid by Customer
                  </Label>
                  <Controller
                    name="customerNeftAmount"
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
                  {errors.customerNeftAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerNeftAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("Google Pay") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Google Pay Amount Paid By Customer
                  </Label>
                  <Controller
                    name="customerGooglePayAmount"
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
                  {errors.customerGooglePayAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerGooglePayAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("Cash") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Cash Amount Paid by Customer
                  </Label>
                  <Controller
                    name="customerCashAmount"
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
                  {errors.customerCashAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerCashAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("Debit Card") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Debit Card Amount Paid By Customer
                  </Label>
                  <Controller
                    name="customerDebitCardAmount"
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
                  {errors.customerDebitCardAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerDebitCardAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("Credit Card") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    Credit Card Amount Paid by Customer
                  </Label>
                  <Controller
                    name="customerCreditCardAmount"
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
                  {errors.customerCreditCardAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerCreditCardAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("Netbanking") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    NetBanking Amount Paid by Customer
                  </Label>
                  <Controller
                    name="customerNetBankingAmount"
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
                        placeholder="Enter NetBanking Amount"
                      />
                    )}
                  />
                  {errors.customerNetBankingAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerNetBankingAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("PhonePe") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    PhonePe Amount Paid By Customer
                  </Label>
                  <Controller
                    name="customerPhonePeAmount"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="h-8"
                        placeholder="Enter PhonePe Amount"
                      />
                    )}
                  />
                  {errors.customerPhonePeAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerPhonePeAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {modeOfCustomerPayment.includes("QR Code") && (
                <div>
                  <Label className="text-sm text-gray-600">
                    QR Amount Paid by Customer
                  </Label>
                  <Controller
                    name="customerQrAmount"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="h-8"
                        placeholder="Enter QR Amount"
                      />
                    )}
                  />
                  {errors.customerQrAmount && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerQrAmount.message}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {modeOfCustomerPayment.some((mode) =>
                MODS_REQUIRING_UTR.includes(mode)
              ) && (
                <div>
                  <Label className="text-sm text-gray-600">
                    UTR / Transaction ID / Cheque Details
                  </Label>
                  <Controller
                    name="customerTransactionId"
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
                  {errors.customerTransactionId && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.customerTransactionId.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between w-full mt-6">
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

export default PaymentCustomer;
