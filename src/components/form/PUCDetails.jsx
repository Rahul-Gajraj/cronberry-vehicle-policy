import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { MultiSelect } from "primereact/multiselect";

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
  CALL_EXECUTIVES,
  FIELD_EXECUTIVES,
  POLICY_UNDERWRITTER,
} from "../../utils/constants";

const PUCDetails = ({
  defaultValues,
  onNextStepChange,
  onPrevStepChange,
  handleFormSubmit,
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

  const onSubmit = (data) => {
    handleFormSubmit({
      ...defaultValues,
      ...data,
    });
  };

  return (
    <div className="rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <Label className="text-sm text-gray-600 mb-2 block">
                Call Executive Reference
              </Label>
              <Controller
                name="callExecutive"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                    options={CALL_EXECUTIVES}
                    // optionLabel="label"
                    placeholder="Select Call Executives"
                    display="chip"
                    filter
                    className="w-full p-multiselect"
                    panelClassName="max-h-60 overflow-y-auto"
                  />
                )}
              />
              {errors.callExecutive && (
                <div className="flex">
                  <p className="text-red-600">{errors.callExecutive.message}</p>
                </div>
              )}
            </div>
            <div className="w-full">
              <Label className="text-sm text-gray-600 mb-2 block">
                Field Executive Reference
              </Label>
              <Controller
                name="fieldExecutive"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                    options={FIELD_EXECUTIVES}
                    // optionLabel="label"
                    placeholder="Select Field Executives"
                    display="chip"
                    filter
                    className="w-full p-multiselect"
                    panelClassName="max-h-60 overflow-y-auto"
                  />
                )}
              />
              {errors.fieldExecutive && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.fieldExecutive.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Policy underwriter Executive Reference</Label>
              <Controller
                name="policyUnderwritterExecutive"
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
                      {POLICY_UNDERWRITTER.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.policyUnderwritterExecutive && (
                <div className="flex">
                  <p className="text-red-600">
                    {errors.policyUnderwritterExecutive.message}
                  </p>
                </div>
              )}
            </div>
            <div>
              <Label className="text-sm text-gray-600">
                PUC Certificate Number
              </Label>
              <Controller
                name="pucCertificate"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="Enter PUC Certificate Number"
                  />
                )}
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">PUC Start Date</Label>
              <Controller
                name="pucStartDate"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    className="h-8"
                    placeholder="Enter PUC Certificate Number"
                  />
                )}
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">PUC End Date</Label>
              <Controller
                name="pucEndDate"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    className="h-8"
                    placeholder="Enter PUC Certificate Number"
                  />
                )}
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-gray-600">Remarks</Label>
            <Controller
              name="remarks"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8"
                  placeholder="Enter remarks here"
                />
              )}
            />
            {errors.remarks && (
              <div className="flex">
                <p className="text-red-600">{errors.remarks.message}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full mt-6">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onPrevStepChange}
          >
            Previous
          </Button>
          <Button className="cursor-pointer">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default PUCDetails;
