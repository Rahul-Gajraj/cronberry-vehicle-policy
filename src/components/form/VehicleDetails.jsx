import React, { useEffect, useMemo, useState } from "react";
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
import { FUEL_TYPES } from "../../utils/constants";

const VehicleDetails = ({
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const {
    products,
    manufacturerTypes,
    models,
    variences,
    fuelTypes,
    rtoStates,
    rtoCities,
    rtoStateCities,
  } = defaultValues;
  const [options, setOptions] = useState({
    products,
    manufacturerTypes,
    models,
    variences,
    fuelTypes,
    rtoStates,
    rtoCities,
    rtoStateCities,
  });

  const years = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) =>
      (new Date().getFullYear() - i).toString()
    );
  }, []);

  useEffect(() => {
    if (options.products.length == 0) {
      fetchProducts();
    }
    if (options.rtoStates.length == 0) {
      fetchRtoStatesAndCities();
    }
  }, []);

  const proposalType = watch("proposalType");

  const fetchRtoStatesAndCities = async () => {
    await fetch("/rtoData.json")
      .then((res) => res.json())
      .then((data) => {
        const rtoStates = Object.keys(data);
        setOptions((prev) => ({
          ...prev,
          rtoStates: [...new Set(rtoStates)],
          rtoStateCities: data,
        }));
      });
  };

  const fetchProducts = async () => {
    await fetch("/productData.json")
      .then((res) => res.json())
      .then((data) => {
        const productsData = data.map((d) => {
          return {
            ...d,
            product: d.product.toUpperCase(),
          };
        });
        fetchMoreProducts(productsData);
        // setOptions((prev) => ({
        //   ...prev,
        //   products: data.map((d) => {
        //     return {
        //       ...d,
        //       product: d.product.toUpperCase(),
        //     };
        //   }),
        // }));
      });
  };

  const fetchMoreProducts = async (productsData) => {
    await fetch(
      "https://opensheet.elk.sh/1eilWnuBv9oOAxhjc_xvW8SwuXrEs-MP8O_-Qo2c_OaM/Sheet1"
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions((prev) => ({
          ...prev,
          products: [
            ...new Set([
              ...productsData,
              ...data.map((d) => {
                return {
                  ...d,
                  product: d.product.toUpperCase(),
                };
              }),
            ]),
          ],
        }));
      })
      .catch((err) => {
        toast.error("Unable to fetch data from sheet");
      });
  };

  const handleOptionsChange = (key, newValue) => {
    let updatedOptions = options;
    switch (key) {
      case "rtoStates":
        updatedOptions = {
          ...updatedOptions,
          rtoCities: [...new Set(options.rtoStateCities[newValue])],
        };
        setValue("rtoCity", "");
      case "products":
        updatedOptions = {
          ...updatedOptions,
          manufacturerTypes: [
            ...new Set(
              options.products
                .filter((p) => p.product === newValue)
                .map((p) => p.manufacturer)
            ),
          ],
          models: [],
          fuelTypes: [],
        };
        setValue("manufacturerType", "");
        setValue("model", "");
        setValue("varience", "");
        setValue("fuelType", "");
        break;
      case "manufacturerTypes":
        updatedOptions = {
          ...updatedOptions,
          models: [
            ...new Set(
              options.products
                .filter(
                  (p) =>
                    p.product === getValues("product") &&
                    p.manufacturer === newValue
                )
                .map((p) => p.model)
            ),
          ],
          variences: [],
          fuelTypes: [],
        };
        setValue("model", "");
        setValue("varience", "");
        setValue("fuelType", "");
        break;
      case "models":
        updatedOptions = {
          ...updatedOptions,
          variences: [
            ...new Set(
              options.products
                .filter(
                  (p) =>
                    p.product === getValues("product") &&
                    p.manufacturer === getValues("manufacturerType") &&
                    p.model === newValue
                )
                .map((p) => p.variant)
            ),
          ],
        };
        setValue("varience", "");
        setValue("fuelType", "");
        break;
      case "variences":
        updatedOptions = {
          ...updatedOptions,
          fuelTypes: [
            ...new Set(
              options.products
                .filter(
                  (p) =>
                    p.product === getValues("product") &&
                    p.manufacturer === getValues("manufacturerType") &&
                    p.model === getValues("model") &&
                    p.variant === newValue
                )
                .map((p) => p.fuel_type)
            ),
          ],
        };
        setValue("fuelType", "");
        break;
      default:
    }
    setOptions(updatedOptions);
  };

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
          <div>
            <Label>Proposal Type</Label>
            <Controller
              name="proposalType"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("policyType", "");
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Proposal Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Renewal">Renewal</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.proposalType && (
              <div className="flex">
                <p className="text-red-600">{errors.proposalType.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Policy Type</Label>
            <Controller
              name="policyType"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Policy Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(proposalType === "New"
                      ? ["1+5 Bundle Policy", "5 Year TP only Policy"]
                      : proposalType === "Renewal"
                      ? ["Package Policy", "TP Only Policy", "OD only Policy"]
                      : proposalType === "Used"
                      ? ["Package Policy", "TP Only Policy"]
                      : []
                    ).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.policyType && (
              <div className="flex">
                <p className="text-red-600">{errors.policyType.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Receipt Number</Label>
            <Controller
              name="receiptNumber"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  onChange={(e) => {
                    // const value = e.target.value.replace(/^[a-zA-Z0-9]*$/g, "");
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.receiptNumber && (
              <div className="flex">
                <p className="text-red-600">{errors.receiptNumber.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Receipt Date</Label>
            <Controller
              name="receiptDate"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input type="date" className="h-8" {...field} />
              )}
            />
            {errors.receiptDate && (
              <div className="flex">
                <p className="text-red-600">{errors.receiptDate.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Vehicle Year</Label>
            <Controller
              name="vehicleYear"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.vehicleYear && (
              <div className="flex">
                <p className="text-red-600">{errors.vehicleYear.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Registration Number</Label>
            <Controller
              name="registrationNumber"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  onChange={(e) => {
                    // const value = e.target.value.replace(/^[a-zA-Z0-9]*$/g, "");
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.registrationNumber && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.registrationNumber.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label>Registration Date</Label>
            <Controller
              name="registrationDate"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input type="date" className="h-8" {...field} />
              )}
            />
            {errors.registrationDate && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.registrationDate.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label>Chassis Number</Label>
            <Controller
              name="chassisNumber"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  onChange={(e) => {
                    // const value = e.target.value.replace(/^[a-zA-Z0-9]*$/g, "");
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.chassisNumber && (
              <div className="flex">
                <p className="text-red-600">{errors.chassisNumber.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Engine Number</Label>
            <Controller
              name="engineNumber"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  onChange={(e) => {
                    // const value = e.target.value.replace(/^[a-zA-Z0-9]*$/g, "");
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors.engineNumber && (
              <div className="flex">
                <p className="text-red-600">{errors.engineNumber.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Manufacturing Year</Label>
            <Controller
              name="manufacturingYear"
              control={control}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 4,
                  message: "Enter valid year",
                },
              }}
              render={({ field }) => (
                <Input
                  className="h-8"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 4) {
                      field.onChange(value);
                    }
                  }}
                />
              )}
            />
            {errors.manufacturingYear && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.manufacturingYear.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label>RTO State</Label>
            <Controller
              name="rtoState"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue && handleOptionsChange("rtoStates", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.rtoStates.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rtoState && (
              <div className="flex">
                <p className="text-red-600">{errors.rtoState.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>RTO City</Label>
            <Controller
              name="rtoCity"
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
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.rtoCities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rtoCity && (
              <div className="flex">
                <p className="text-red-600">{errors.rtoCity.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Product</Label>
            <Controller
              name="product"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue && handleOptionsChange("products", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(options.products.map((p) => p.product))].map(
                      (p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.product && (
              <div className="flex">
                <p className="text-red-600">{errors.product.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Manufacturer Type</Label>
            <Controller
              name="manufacturerType"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue &&
                      handleOptionsChange("manufacturerTypes", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Manufacturer Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.manufacturerTypes.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.manufacturerType && (
              <div className="flex">
                <p className="text-red-600">
                  {errors.manufacturerType.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label>Model</Label>
            <Controller
              name="model"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue && handleOptionsChange("models", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.models.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.model && (
              <div className="flex">
                <p className="text-red-600">{errors.model.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Varience</Label>
            <Controller
              name="varience"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue && handleOptionsChange("variences", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Varience" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.variences.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.varience && (
              <div className="flex">
                <p className="text-red-600">{errors.varience.message}</p>
              </div>
            )}
          </div>
          <div>
            <Label>Fuel Type</Label>
            <Controller
              name="fuelType"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onValueChange={(newValue) => {
                    newValue && onChange(newValue);
                    newValue && handleOptionsChange("fuelTypes", newValue);
                  }}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Select Varience" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.fuelType && (
              <div className="flex">
                <p className="text-red-600">{errors.fuelType.message}</p>
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

export default VehicleDetails;
