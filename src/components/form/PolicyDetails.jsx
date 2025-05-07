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
import { INSURERS_LIST } from "../../utils/constants";

const PolicyDetails = ({
  defaultValues,
  onNextStepChange,
  onPrevStepChange,
  proposalType,
  policyType,
}) => {
  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [options, setOptions] = useState({
    insurers: defaultValues.insurers,
  });

  const previousPolicyAvailable = watch("previousPolicyAvailable");
  const previousPolicyType = watch("previousPolicyType");
  const anyClaim = watch("anyClaim");

  useEffect(() => {
    if (options.insurers.length == 0) {
      setOptions((prev) => ({ ...prev, insurers: INSURERS_LIST }));
    }
  }, []);

  const onSubmit = (data) => {
    onNextStepChange({
      ...defaultValues,
      ...data,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposalType === "Renewal" &&
            ["Package Policy", "OD only Policy", "TP Only Policy"].includes(
              policyType
            ) && (
              <>
                <div>
                  <Label>Previous Policy Available</Label>
                  <Controller
                    name="previousPolicyAvailable"
                    control={control}
                    rules={{ required: "Please select an option" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.previousPolicyAvailable && (
                    <div className="flex">
                      <p className="text-red-500 text-sm">
                        {errors.previousPolicyAvailable.message}
                      </p>
                    </div>
                  )}
                </div>
                {previousPolicyAvailable === "yes" && (
                  <>
                    <div>
                      <Label>Previous Policy Type</Label>
                      <Controller
                        name="previousPolicyType"
                        control={control}
                        rules={{ required: "Please select policy type" }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-8 w-full">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="OD Policy">
                                OD Policy
                              </SelectItem>
                              {!(
                                proposalType === "Renewal" &&
                                policyType === "Package Policy"
                              ) && (
                                <SelectItem value="TP Policy">
                                  TP Policy
                                </SelectItem>
                              )}
                              <SelectItem value="Package Policy">
                                Package Policy
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.previousPolicyType && (
                        <div className="flex">
                          <p className="text-red-500 text-sm">
                            {errors.previousPolicyType.message}
                          </p>
                        </div>
                      )}
                    </div>
                    {previousPolicyType.length > 0 ? (
                      <>
                        <div>
                          <Label>Previous Insurer</Label>
                          <Controller
                            name="previousInsurer"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field: { value, onChange } }) => (
                              // <Input
                              //   value={field.value}
                              //   onChange={field.onChange}
                              //   className="h-8"
                              //   placeholder="Previous Insurer"
                              // />
                              <Select
                                value={value}
                                onValueChange={(newValue) => {
                                  newValue && onChange(newValue);
                                }}
                              >
                                <SelectTrigger className="h-8 w-full">
                                  <SelectValue placeholder="Previous Insurer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    ...new Set(options.insurers.map((p) => p)),
                                  ].map((p) => (
                                    <SelectItem key={p} value={p}>
                                      {p}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.previousInsurer && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.previousInsurer.message}
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label>Policy Number</Label>
                          <Controller
                            name="policyNumber"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <Input
                                value={field.value}
                                onChange={field.onChange}
                                className="h-8"
                                placeholder="Policy Number"
                              />
                            )}
                          />
                          {errors.policyNumber && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.policyNumber.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {previousPolicyType === "OD Policy" && (
                      <>
                        {policyType === "OD only Policy" ? (
                          <>
                            <div>
                              <Label>OD Policy Start Date</Label>
                              <Controller
                                name="odOnlyPolicyStartDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.odOnlyPolicyStartDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.odOnlyPolicyStartDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <Label>OD Policy End Date</Label>
                              <Controller
                                name="odOnlyPolicyEndDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.odOnlyPolicyEndDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.odOnlyPolicyEndDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <Label>Previous Policy Start Date</Label>
                              <Controller
                                name="previousPolicyStartDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.previousPolicyStartDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.previousPolicyStartDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <Label>Previoius Policy End Date</Label>
                              <Controller
                                name="previousPolicyEndDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.previousPolicyEndDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.previousPolicyEndDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        <div>
                          <Label>Any Claim?</Label>
                          <Controller
                            name="anyClaim"
                            control={control}
                            rules={{ required: "Please select an option" }}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="h-8 w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.anyClaim && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.anyClaim.message}
                              </p>
                            </div>
                          )}
                        </div>
                        {anyClaim === "no" && (
                          <div>
                            <Label>NCB %</Label>
                            <Controller
                              name="ncb"
                              control={control}
                              rules={{ required: "Please select an option" }}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="h-8 w-full">
                                    <SelectValue placeholder="Select NCB %" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["0", "20", "25", "35", "45", "50"].map(
                                      (n) => (
                                        <SelectItem key={n} value={n}>
                                          {n}%
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.ncb && (
                              <div className="flex">
                                <p className="text-red-500 text-sm">
                                  {errors.ncb.message}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    {previousPolicyType === "TP Policy" && (
                      <>
                        {policyType === "OD only Policy" ? (
                          <>
                            <div>
                              <Label>TP Policy Start Date</Label>
                              <Controller
                                name="tpOnlyPolicyStartDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.tpOnlyPolicyStartDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.tpOnlyPolicyStartDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <Label>TP Policy End Date</Label>
                              <Controller
                                name="tpOnlyPolicyEndDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.tpOnlyPolicyEndDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.tpOnlyPolicyEndDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            {/* <div>
                              <Label>TP Policy Expiry Date</Label>
                              <Input
                                value={field.value}
                                onChange={field.onChange}
                                className="h-8"
                                type="date"
                              />
                            </div> */}
                          </>
                        ) : (
                          <>
                            <div>
                              <Label>Previous Policy Start Date</Label>
                              <Controller
                                name="previousPolicyStartDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.previousPolicyStartDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.previousPolicyStartDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <Label>Previous Policy End Date</Label>
                              <Controller
                                name="previousPolicyEndDate"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                  <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="h-8"
                                    type="date"
                                  />
                                )}
                              />
                              {errors.previousPolicyEndDate && (
                                <div className="flex">
                                  <p className="text-red-500 text-sm">
                                    {errors.previousPolicyEndDate.message}
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {previousPolicyType === "Package Policy" && (
                      <>
                        <div>
                          <Label>Previous Policy Start Date</Label>
                          <Controller
                            name="previousPolicyStartDate"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <Input
                                value={field.value}
                                onChange={field.onChange}
                                className="h-8"
                                type="date"
                              />
                            )}
                          />
                          {errors.previousPolicyStartDate && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.previousPolicyStartDate.message}
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label>Previous Policy End Date</Label>
                          <Controller
                            name="previousPolicyEndDate"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <Input
                                value={field.value}
                                onChange={field.onChange}
                                className="h-8"
                                type="date"
                              />
                            )}
                          />
                          {errors.previousPolicyEndDate && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.previousPolicyEndDate.message}
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label>Any Claim?</Label>
                          <Controller
                            name="anyClaim"
                            control={control}
                            rules={{ required: "Please select an option" }}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="h-8 w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.anyClaim && (
                            <div className="flex">
                              <p className="text-red-500 text-sm">
                                {errors.anyClaim.message}
                              </p>
                            </div>
                          )}
                        </div>
                        {anyClaim === "no" && (
                          <div>
                            <Label>NCB %</Label>
                            <Controller
                              name="ncb"
                              control={control}
                              rules={{ required: "Please select an option" }}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="h-8 w-full">
                                    <SelectValue placeholder="Select NCB %" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["0", "20", "25", "35", "45", "50"].map(
                                      (n) => (
                                        <SelectItem key={n} value={n}>
                                          {n}%
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.ncb && (
                              <div className="flex">
                                <p className="text-red-500 text-sm">
                                  {errors.ncb.message}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
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

export default PolicyDetails;
