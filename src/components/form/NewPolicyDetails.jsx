import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  ADDONS_LIST,
  BROKERS_LIST,
  INSURERS_LIST,
} from "../../utils/constants";

const NewPolicyDetails = ({
  defaultValues,
  onNextStepChange,
  onPrevStepChange,
  proposalType,
  policyType,
  previousClaim,
}) => {
  const {
    control,
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { brokers, insurers, addons } = defaultValues;
  const [options, setOptions] = useState({
    brokers,
    insurers,
    addons,
  });

  useEffect(() => {
    if (options.brokers.length == 0) {
      setOptions((prev) => ({ ...prev, brokers: BROKERS_LIST }));
    }
    if (options.insurers.length == 0) {
      setOptions((prev) => ({ ...prev, insurers: INSURERS_LIST }));
    }
    if (options.addons.length == 0) {
      setOptions((prev) => ({ ...prev, addons: ADDONS_LIST }));
    }
  }, []);

  const onSubmit = (data) => {
    onNextStepChange({
      ...defaultValues,
      ...data,
      ...options,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposalType === "Renewal" &&
            ["Package Policy", "TP Only Policy"].includes(policyType) && (
              <>
                <div>
                  <Label>New Policy Start Date</Label>
                  <Controller
                    name="newPolicyStartDate"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input
                        type="date"
                        className="h-8"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.newPolicyStartDate && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.newPolicyStartDate.message}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <Label>New Policy End Date</Label>
                  <Controller
                    name="newPolicyEndDate"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input
                        type="date"
                        className="h-8"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.newPolicyEndDate && (
                    <div className="flex">
                      <p className="text-red-600">
                        {errors.newPolicyEndDate.message}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          {((proposalType === "New" && policyType === "1+5 Bundle Policy") ||
            (proposalType === "Renewal" &&
              policyType === "OD only Policy")) && (
            <>
              <div>
                <Label>New OD Policy Start Date</Label>
                <Controller
                  name="newODPolicyStartDate"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      className="h-8"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.newODPolicyStartDate && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.newODPolicyStartDate.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label>New OD Policy End Date</Label>
                <Controller
                  name="newODPolicyStartDate"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      className="h-8"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.newODPolicyStartDate && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.newODPolicyStartDate.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {((proposalType === "New" &&
            ["1+5 Bundle Policy", "5 Year TP only Policy"].includes(
              policyType
            )) ||
            (proposalType === "Renewal" &&
              policyType === "OD only Policy")) && (
            <>
              <div>
                <Label>New TP Policy Start Date</Label>
                <Controller
                  name="newTDPolicyStartDate"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      className="h-8"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.newTDPolicyStartDate && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.newTDPolicyStartDate.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Label>New TP Policy End Date</Label>
                <Controller
                  name="newTDPolicyEndDate"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      className="h-8"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.newTDPolicyEndDate && (
                  <div className="flex">
                    <p className="text-red-600">
                      {errors.newTDPolicyEndDate.message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {previousClaim === "no" && (
            <div>
              <Label>NCB For New Policy</Label>
              <Controller
                name="newNcb"
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
                      {["0", "20", "25", "35", "45", "50"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.newNcb && (
                <div className="flex">
                  <p className="text-red-600">{errors.newNcb.message}</p>
                </div>
              )}
            </div>
          )}

          <div>
            <Label>Broker or Agency Name</Label>
            <Controller
              name="brockerName"
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
                    {[...new Set(options.brokers.map((p) => p))].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.brockerName && (
              <div className="flex">
                <p className="text-red-600">{errors.brockerName.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Policy Number</Label>
            <Controller
              name="newPolicyNumber"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8"
                  placeholder="Enter Policy Number"
                />
              )}
            />
            {errors.newPolicyNumber && (
              <div className="flex">
                <p className="text-red-600">{errors.newPolicyNumber.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Insurer Name</Label>
            <Controller
              name="insurerName"
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
                    {[...new Set(options.insurers.map((p) => p))].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.insurerName && (
              <div className="flex">
                <p className="text-red-600">{errors.insurerName.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Policy Issue Date</Label>
            <Controller
              name="policyIssueDate"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input type="date" className="h-8" {...field} />
              )}
            />
            {errors.policyIssueDate && (
              <div className="flex">
                <p className="text-red-600">{errors.policyIssueDate.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>IDV (Insured Declared Value)</Label>
            <Controller
              name="ivd"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.ivd && (
              <div className="flex">
                <p className="text-red-600">{errors.ivd.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Addon</Label>
            <Controller
              name="addon"
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
                    {[...new Set(options.addons.map((p) => p))].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.addon && (
              <div className="flex">
                <p className="text-red-600">{errors.addon.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>OD Amount</Label>
            <Controller
              name="odAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "") || 0;
                    const tpAmount = getValues("tpAmount") || 0;
                    const gstAmount = getValues("gstAmount") || 0;
                    const breakingCharge = getValues("breakingCharge") || 0;
                    const waiverAmount = getValues("waiverAmount") || 0;
                    setValue("odTpAmount", Number(tpAmount) + Number(value));
                    setValue(
                      "totalPremiumWithGST",
                      Number(tpAmount) + Number(gstAmount) + Number(value)
                    );
                    setValue(
                      "netPayable",
                      Number(tpAmount) +
                        Number(gstAmount) +
                        Number(value) +
                        Number(breakingCharge) -
                        Number(waiverAmount)
                    );

                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.odAmount && (
              <div className="flex">
                <p className="text-red-600">{errors.odAmount.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>TP Amount</Label>
            <Controller
              name="tpAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "") || 0;
                    const odAmount = getValues("odAmount") || 0;
                    const gstAmount = getValues("gstAmount") || 0;
                    const breakingCharge = getValues("breakingCharge") || 0;
                    const waiverAmount = getValues("waiverAmount") || 0;
                    setValue("odTpAmount", Number(odAmount) + Number(value));
                    setValue(
                      "totalPremiumWithGST",
                      Number(odAmount) + Number(gstAmount) + Number(value)
                    );
                    setValue(
                      "netPayable",
                      Number(odAmount) +
                        Number(gstAmount) +
                        Number(value) +
                        Number(breakingCharge) -
                        Number(waiverAmount)
                    );
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.tpAmount && (
              <div className="flex">
                <p className="text-red-600">{errors.tpAmount.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Net Total (OD + TP)</Label>
            <Controller
              name="odTpAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  disabled
                  className="h-8"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.odTpAmount && (
              <div className="flex">
                <p className="text-red-600">{errors.odTpAmount.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>GST Amount</Label>
            <Controller
              name="gstAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "") || 0;
                    const odAmount = getValues("odAmount") || 0;
                    const tpAmount = getValues("tpAmount") || 0;
                    const breakingCharge = getValues("breakingCharge") || 0;
                    const waiverAmount = getValues("waiverAmount") || 0;
                    setValue(
                      "totalPremiumWithGST",
                      Number(odAmount) + Number(tpAmount) + Number(value)
                    );
                    setValue(
                      "netPayable",
                      Number(odAmount) +
                        Number(tpAmount) +
                        Number(value) +
                        Number(breakingCharge) -
                        Number(waiverAmount)
                    );
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.gstAmount && (
              <div className="flex">
                <p className="text-red-600">{errors.gstAmount.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Total Premium with GST</Label>
            <Controller
              name="totalPremiumWithGST"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  disabled
                  onChange={field.onChange}
                />
              )}
            />
            {errors.totalPremiumWithGST && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.totalPremiumWithGST.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label>Breaking Charge</Label>
            <Controller
              name="breakingCharge"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "") || 0;
                    const odAmount = getValues("odAmount") || 0;
                    const tpAmount = getValues("tpAmount") || 0;
                    const gstAmount = getValues("gstAmount") || 0;
                    const waiverAmount = getValues("waiverAmount") || 0;
                    setValue(
                      "netPayable",
                      Number(odAmount) +
                        Number(tpAmount) +
                        Number(value) +
                        Number(gstAmount) -
                        Number(waiverAmount)
                    );
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.breakingCharge && (
              <div className="flex">
                <p className="text-red-600">{errors.breakingCharge.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Waiver Amount</Label>
            <Controller
              name="waiverAmount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  placeholder="Enter Amount"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "") || 0;
                    const odAmount = getValues("odAmount") || 0;
                    const tpAmount = getValues("tpAmount") || 0;
                    const gstAmount = getValues("gstAmount") || 0;
                    const breakingCharge = getValues("breakingCharge") || 0;
                    setValue(
                      "netPayable",
                      Number(odAmount) +
                        Number(tpAmount) +
                        Number(gstAmount) +
                        Number(breakingCharge) -
                        Number(value)
                    );
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.waiverAmount && (
              <div className="flex">
                <p className="text-red-600">{errors.waiverAmount.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Net Payable</Label>
            <Controller
              name="netPayable"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  disabled
                  onChange={field.onChange}
                />
              )}
            />
            {errors.netPayable && (
              <div className="flex">
                <p className="text-red-600">{errors.netPayable.message}</p>
              </div>
            )}
          </div>
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

export default NewPolicyDetails;
