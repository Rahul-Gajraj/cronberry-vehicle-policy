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
import { Button } from "@/components/ui/button";

const CustomerDetails = ({ defaultValues, onNextStepChange }) => {
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

  const [localities, setLocalities] = useState(defaultValues.localities);

  const customerType = watch("customerType");
  const whatsappSame = watch("whatsappSame");

  const fetchPincodeDetails = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const res = await fetch(
          // `https://api.postalpincode.in/pincode/${pincode}`
          `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`
        );
        const data = await res.json();
        // if (data[0].Status === "Success") {
        //   const postOffice = data[0].PostOffice[0];

        //   setValue("country", "India");
        //   setValue("state", postOffice.State);
        //   setValue("city", postOffice.District);
        //   setLocalities(data[0].PostOffice.map((p) => p.Name));
        //   setTimeout(() => {
        //     setValue("locality", data[0].PostOffice[0].Name);
        //   }, 0);
        // } else {
        //   setValue("country", "");
        //   setValue("state", "");
        //   setValue("city", "");
        //   setLocalities([]);
        //   setValue("locality", "");
        // }
        if (data.success) {
          const postcodeDetails = data.postcode_details;
          setValue("country", postcodeDetails.country);
          setValue("state", postcodeDetails.state);
          setValue("city", postcodeDetails.city);
          setLocalities(postcodeDetails.locality);
          setTimeout(() => {
            setValue("locality", postcodeDetails.locality[0]);
          }, 0);
        } else {
          setValue("country", "");
          setValue("state", "");
          setValue("city", "");
          setLocalities([]);
          setValue("locality", "");
        }
      } catch (error) {
        console.error("Failed to fetch pincode details:", error);
      }
    }
  };

  const onSubmit = (data) =>
    onNextStepChange({
      ...defaultValues,
      ...data,
      localities,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Customer Type</Label>
          <Controller
            rules={{ required: "This field is required" }}
            name="customerType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-8 w-full">
                  <SelectValue placeholder="Select Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.customerType && (
            <div className="flex">
              <p className="text-red-600">{errors.customerType.message}</p>
            </div>
          )}
        </div>

        {customerType === "corporate" ? (
          <>
            <div>
              <Label>Title</Label>
              <Controller
                name="customerType"
                control={control}
                render={({ field }) => (
                  <Input value="M/s" disabled className="h-8" />
                )}
              />
              {errors.title && (
                <div className="flex">
                  <p className="text-red-600">{errors.title.message}</p>
                </div>
              )}
            </div>
            <div>
              <Label>Company Name</Label>
              <Controller
                name="companyName"
                rules={{ required: "This field is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    className="h-8"
                    placeholder="Company Name"
                    {...field}
                  />
                )}
              />
              {errors.companyName && (
                <div className="flex">
                  <p className="text-red-600">{errors.companyName.message}</p>
                </div>
              )}
            </div>
            <div>
              <Label>U/C Name</Label>
              <Controller
                name="ucName"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input className="h-8" placeholder="U/C Name" {...field} />
                )}
              />
              {errors.ucName && (
                <div className="flex">
                  <p className="text-red-600">{errors.ucName.message}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <Label>Title</Label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Miss">Miss</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.title && (
                <div className="flex">
                  <p className="text-red-600">{errors.title.message}</p>
                </div>
              )}
            </div>
            <div>
              <Label>Customer Name</Label>
              <Controller
                name="customerName"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    className="h-8"
                    placeholder="Customer Name"
                    {...field}
                  />
                )}
              />
              {errors.customerName && (
                <div className="flex">
                  <p className="text-red-600">{errors.customerName.message}</p>
                </div>
              )}
            </div>
            <div>
              <Label>Father Name</Label>
              <Controller
                name="fatherName"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input className="h-8" placeholder="Father Name" {...field} />
                )}
              />
              {errors.fatherName && (
                <div className="flex">
                  <p className="text-red-600">{errors.fatherName.message}</p>
                </div>
              )}
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Controller
                name="dob"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input type="date" className="h-8" {...field} />
                )}
              />
              {errors.dob && (
                <div className="flex">
                  <p className="text-red-600">{errors.dob.message}</p>
                </div>
              )}
            </div>
          </>
        )}

        <div>
          <Label>Primary Phone</Label>
          <Controller
            name="primaryPhone"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Enter valid number",
              },
            }}
            render={({ field }) => (
              <Input
                className="h-8"
                placeholder="Enter Phone"
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length <= 10) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
          {errors.primaryPhone && (
            <div className="flex">
              <p className="text-red-600">{errors.primaryPhone.message}</p>
            </div>
          )}
        </div>

        <div>
          <Label>WhatsApp Same as Phone?</Label>
          <Controller
            name="whatsappSame"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
        </div>

        <div>
          <Label>WhatsApp Number</Label>
          <Controller
            name="whatsappNumber"
            control={control}
            rules={{
              required: whatsappSame == "no" ? "This field is required" : false,
              minLength: {
                value: 10,
                message: "Enter valid number",
              },
            }}
            render={({ field }) => (
              <Input
                className="h-8"
                placeholder="Enter WhatsApp Number"
                disabled={whatsappSame == "yes"}
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length <= 10) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
          {whatsappSame == "no" && errors.whatsappNumber && (
            <div className="flex">
              <p className="text-red-600">{errors.whatsappNumber.message}</p>
            </div>
          )}
        </div>

        <div>
          <Label>Pincode</Label>
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter valid pincode",
              },
              minLength: {
                value: 6,
                message: "Pincode must be 6 digit long",
              },
            }}
            render={({ field }) => (
              <Input
                className="h-8"
                placeholder="Enter Pincode"
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                  if (value.length == 6) {
                    fetchPincodeDetails(value);
                  }
                }}
              />
            )}
          />
          {errors.pincode && (
            <div className="flex">
              <p className="text-red-600">{errors.pincode.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>Country</Label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Input className="h-8" value={field.value} disabled />
            )}
          />
          {errors.country && (
            <div className="flex">
              <p className="text-red-600">{errors.country.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>State</Label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Input className="h-8" value={field.value} disabled />
            )}
          />
          {errors.state && (
            <div className="flex">
              <p className="text-red-600">{errors.state.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>City</Label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Input className="h-8" value={field.value} disabled />
            )}
          />
          {errors.city && (
            <div className="flex">
              <p className="text-red-600">{errors.city.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>Locality</Label>
          <Controller
            name="locality"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    val && field.onChange(val);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Locality" />
                  </SelectTrigger>
                  <SelectContent>
                    {localities.map((loc, idx) => (
                      <SelectItem key={idx} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.locality && (
            <div className="flex">
              <p className="text-red-600">{errors.locality.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>Address</Label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Input {...field} className="h-8" placeholder="Enter Address" />
            )}
          />
          {errors.address && (
            <div className="flex">
              <p className="text-red-600">{errors.address.message}</p>
            </div>
          )}
        </div>
        <div>
          <Label>Service Book Number</Label>
          <Controller
            name="serviceNumber"
            control={control}
            render={({ field }) => (
              <Input className="h-8" placeholder="Enter Service Book Number" />
            )}
          />
        </div>
      </div>
      <div className="flex">
        <Button className="cursor-pointer mt-3">Next</Button>
      </div>
    </form>
  );
};

export default CustomerDetails;
