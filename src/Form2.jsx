// Updated Full 3-Step Form with Fixed renderStepBar Error
import React, { useState } from "react";
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
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Checkbox } from "@/components/ui/checkbox";

export default function Form2() {
  const handleSubmit = async () => {
    const payload = {
      projectKey: "VW50aXRsZSBQcm9qZWN0MTc0MDM4ODgxMjc0NQ==",
      email: "",
      mobile: primaryPhone,
      name: "",
      audienceId: "",
      paramList: [
        {
          paramKey: "mobile",
          paramValue: primaryPhone,
        },
        {
          paramKey: "pincode",
          paramValue: pincode,
        },
        {
          paramKey: "proposal_type",
          paramValue: proposalType,
        },
        {
          paramKey: "policy_type",
          paramValue: policyType,
        },
        {
          paramKey: "model",
          paramValue: model,
        },
        {
          paramKey: "fuel_type",
          paramValue: fuelType,
        },
        {
          paramKey: "variant",
          paramValue: variant,
        },
        {
          paramKey: "manufacturer_type",
          paramValue: manufacturerType,
        },
        {
          paramKey: "vehicle_class",
          paramValue: vehicleClass,
        },
        {
          paramKey: "receipt_number",
          paramValue: receiptNumber,
        },
        {
          paramKey: "registration_number",
          paramValue: registrationNumber,
        },
        {
          paramKey: "registration_date",
          paramValue: registrationDate,
        },
        {
          paramKey: "od_amount",
          paramValue: odAmount.toString(),
        },
        {
          paramKey: "tp_amount",
          paramValue: tpAmount.toString(),
        },
        {
          paramKey: "gst_amount",
          paramValue: gstAmount.toString(),
        },
        {
          paramKey: "breaking_charge",
          paramValue: breakingCharge.toString(),
        },
        {
          paramKey: "waiver_amount",
          paramValue: waiverAmount.toString(),
        },
      ],
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
        alert("Submitted successfully to Cronberry");
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error submitting to Cronberry:", error);
      alert("Error occurred while submitting");
    }
  };
  const [step, setStep] = useState(1);
  const [paymentModes, setPaymentModes] = useState([]);
  const [customerPaymentModes, setCustomerPaymentModes] = useState([]);
  const [utrDetails, setUtrDetails] = useState("");
  const [customerUtr, setCustomerUtr] = useState("");
  const totalSteps = 7;

  const [odAmount, setOdAmount] = useState(0);
  const [tpAmount, setTpAmount] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [breakingCharge, setBreakingCharge] = useState(0);
  const [waiverAmount, setWaiverAmount] = useState(0);

  const [customerType, setCustomerType] = useState("Individual");
  const [whatsappSame, setWhatsappSame] = useState("Yes");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [pincode, setPincode] = useState("");
  React.useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (pincode.length === 6) {
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
          );
          const data = await res.json();
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            setLocation({
              country: "India",
              state: postOffice.State,
              city: postOffice.District,
              localities: data[0].PostOffice.map((p) => p.Name),
            });
            setSelectedLocality(data[0].PostOffice[0].Name);
          } else {
            setLocation({ country: "", state: "", city: "", localities: [] });
          }
        } catch (error) {
          console.error("Failed to fetch pincode details:", error);
        }
      }
    };
    fetchPincodeDetails();
  }, [pincode]);
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    localities: [],
  });
  const [selectedLocality, setSelectedLocality] = useState("");

  const [proposalType, setProposalType] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [previousPolicyAvailable, setPreviousPolicyAvailable] = useState("");
  const [previousPolicyType, setPreviousPolicyType] = useState("");
  const [previousClaim, setPreviousClaim] = useState("");
  const [ncb, setNcb] = useState("");
  const [customerPaymentStatus, setCustomerPaymentStatus] = useState("");

  const [product, setProduct] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [manufacturerType, setManufacturerType] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [rtoState, setRtoState] = useState("");
  const [rtoCity, setRtoCity] = useState("");

  const years = Array.from({ length: 35 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Customer Type</Label>
              <Select value={customerType} onValueChange={setCustomerType}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {customerType === "Corporate" ? (
              <>
                <div>
                  <Label>Title</Label>
                  <Input value="M/s" className="h-8" disabled />
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input className="h-8" placeholder="Company Name" />
                </div>
                <div>
                  <Label>U/C Name</Label>
                  <Input className="h-8" placeholder="U/C Name" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Title</Label>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Miss">Miss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Customer Name</Label>
                  <Input className="h-8" placeholder="Customer Name" />
                </div>
                <div>
                  <Label>Father Name</Label>
                  <Input className="h-8" placeholder="Father Name" />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input className="h-8" type="date" />
                </div>
              </>
            )}
            <div>
              <Label>Primary Phone</Label>
              <Input
                className="h-8"
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
              />
            </div>
            <div>
              <Label>WhatsApp Same as Phone?</Label>
              <Select value={whatsappSame} onValueChange={setWhatsappSame}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input
                className="h-8"
                value={whatsappSame === "Yes" ? primaryPhone : ""}
                placeholder="Enter WhatsApp Number"
                disabled={whatsappSame === "Yes"}
              />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input
                className="h-8"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input className="h-8" value={location.country} disabled />
            </div>
            <div>
              <Label>State</Label>
              <Input className="h-8" value={location.state} disabled />
            </div>
            <div>
              <Label>City</Label>
              <Input className="h-8" value={location.city} disabled />
            </div>
            <div>
              <Label>Locality</Label>
              <Select
                value={selectedLocality}
                onValueChange={setSelectedLocality}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Locality" />
                </SelectTrigger>
                <SelectContent>
                  {(location.localities || []).map((loc, idx) => (
                    <SelectItem key={idx} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Address</Label>
              <Input className="h-8" placeholder="Enter Address" />
            </div>
            <div>
              <Label>Service Book Number</Label>
              <Input className="h-8" placeholder="Enter Service Book Number" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Proposal Type</Label>
              <Select
                value={proposalType}
                onValueChange={(value) => {
                  setProposalType(value);
                  setPolicyType("");
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Proposal Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Renewal">Renewal</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Policy Type</Label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Policy Type" />
                </SelectTrigger>
                <SelectContent>
                  {proposalType === "New" &&
                    ["1+5 Bundle Policy", "5 Year TP only Policy"].map(
                      (type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      )
                    )}
                  {proposalType === "Renewal" &&
                    ["Package Policy", "TP Only Policy", "OD only Policy"].map(
                      (type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      )
                    )}
                  {proposalType === "Used" &&
                    ["Package Policy", "TP Only Policy"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Receipt Number</Label>
              <Input
                className="h-8"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Receipt Date</Label>
              <Input
                type="date"
                className="h-8"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Vehicle Year</Label>
              <Select value={vehicleYear} onValueChange={setVehicleYear}>
                <SelectTrigger className="h-8">
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
            </div>
            <div>
              <Label>Registration Number</Label>
              <Input
                className="h-8"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Registration Date</Label>
              <Input
                type="date"
                className="h-8"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Chassis Number</Label>
              <Input
                className="h-8"
                value={chassisNumber}
                onChange={(e) => setChassisNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Engine Number</Label>
              <Input
                className="h-8"
                value={engineNumber}
                onChange={(e) => setEngineNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Manufacturing Year</Label>
              <Input
                className="h-8"
                value={manufacturingYear}
                onChange={(e) => setManufacturingYear(e.target.value)}
              />
            </div>
            <div>
              <Label>RTO State</Label>
              <Input
                className="h-8"
                value={rtoState}
                onChange={(e) => setRtoState(e.target.value)}
              />
            </div>
            <div>
              <Label>RTO City</Label>
              <Input
                className="h-8"
                value={rtoCity}
                onChange={(e) => setRtoCity(e.target.value)}
              />
            </div>
            <div>
              <Label>Product</Label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private Car">Private Car</SelectItem>
                  <SelectItem value="Two Wheeler">Two Wheeler</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Vehicle Class</Label>
              <Select value={vehicleClass} onValueChange={setVehicleClass}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Vehicle Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Manufacturer Type</Label>
              <Select
                value={manufacturerType}
                onValueChange={setManufacturerType}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Manufacturer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maruti">Maruti</SelectItem>
                  <SelectItem value="Honda">Honda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Swift">Swift</SelectItem>
                  <SelectItem value="City">City</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Variant</Label>
              <Select value={variant} onValueChange={setVariant}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VXi">VXi</SelectItem>
                  <SelectItem value="ZXi">ZXi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fuel Type</Label>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposalType === "Renewal" &&
              ["Package Policy", "OD only Policy", "TP Only Policy"].includes(
                policyType
              ) && (
                <>
                  <div>
                    <Label>Previous Policy Available</Label>
                    <Select
                      value={previousPolicyAvailable}
                      onValueChange={setPreviousPolicyAvailable}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {previousPolicyAvailable === "Yes" && (
                    <>
                      <div>
                        <Label>Previous Policy Type</Label>
                        <Select
                          value={previousPolicyType}
                          onValueChange={setPreviousPolicyType}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OD Policy">OD Policy</SelectItem>
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
                      </div>
                      {previousPolicyType === "OD Policy" && (
                        <>
                          {policyType === "OD only Policy" ? (
                            <>
                              <div>
                                <Label>OD Policy Start Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                              <div>
                                <Label>OD Policy End Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <Label>Previous Insurer</Label>
                                <Input
                                  className="h-8"
                                  placeholder="Previous Insurer"
                                />
                              </div>
                              <div>
                                <Label>Policy Number</Label>
                                <Input
                                  className="h-8"
                                  placeholder="Policy Number"
                                />
                              </div>
                              <div>
                                <Label>Policy Start Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                              <div>
                                <Label>Policy End Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                            </>
                          )}
                          <div>
                            <Label>Any Claim?</Label>
                            <Select
                              value={previousClaim}
                              onValueChange={setPreviousClaim}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {previousClaim === "No" && (
                            <div>
                              <Label>NCB %</Label>
                              <Select value={ncb} onValueChange={setNcb}>
                                <SelectTrigger className="h-8">
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
                                <Input className="h-8" type="date" />
                              </div>
                              <div>
                                <Label>TP Policy End Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                              <div>
                                <Label>TP Policy Expiry Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <Label>Previous Insurer</Label>
                                <Input
                                  className="h-8"
                                  placeholder="Previous Insurer"
                                />
                              </div>
                              <div>
                                <Label>Policy Number</Label>
                                <Input
                                  className="h-8"
                                  placeholder="Policy Number"
                                />
                              </div>
                              <div>
                                <Label>Policy Start Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                              <div>
                                <Label>Policy End Date</Label>
                                <Input className="h-8" type="date" />
                              </div>
                            </>
                          )}
                        </>
                      )}
                      {previousPolicyType === "Package Policy" && (
                        <>
                          <div>
                            <Label>Previous Insurer</Label>
                            <Input
                              className="h-8"
                              placeholder="Previous Insurer"
                            />
                          </div>
                          <div>
                            <Label>Policy Number</Label>
                            <Input
                              className="h-8"
                              placeholder="Policy Number"
                            />
                          </div>
                          <div>
                            <Label>Policy Start Date</Label>
                            <Input className="h-8" type="date" />
                          </div>
                          <div>
                            <Label>Policy End Date</Label>
                            <Input className="h-8" type="date" />
                          </div>
                          <div>
                            <Label>Any Claim?</Label>
                            <Select
                              value={previousClaim}
                              onValueChange={setPreviousClaim}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {previousClaim === "No" && (
                            <div>
                              <Label>NCB %</Label>
                              <Select value={ncb} onValueChange={setNcb}>
                                <SelectTrigger className="h-8">
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
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposalType === "Renewal" &&
              ["Package Policy", "TP Only Policy"].includes(policyType) && (
                <>
                  <div>
                    <Label>New Policy Start Date</Label>
                    <Input className="h-8" type="date" />
                  </div>
                  <div>
                    <Label>New Policy End Date</Label>
                    <Input className="h-8" type="date" />
                  </div>
                </>
              )}
            {((proposalType === "New" && policyType === "1+5 Bundle Policy") ||
              (proposalType === "Renewal" &&
                policyType === "OD only Policy")) && (
              <>
                <div>
                  <Label>New OD Policy Start Date</Label>
                  <Input className="h-8" type="date" />
                </div>
                <div>
                  <Label>New OD Policy End Date</Label>
                  <Input className="h-8" type="date" />
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
                  <Input className="h-8" type="date" />
                </div>
                <div>
                  <Label>New TP Policy End Date</Label>
                  <Input className="h-8" type="date" />
                </div>
              </>
            )}
            {previousClaim === "No" && (
              <div>
                <Label>NCB For New Policy</Label>
                <Select value={ncb} onValueChange={setNcb}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select NCB %" />
                  </SelectTrigger>
                  <SelectContent>
                    {["0", "20", "25", "35", "45", "50"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Broker or Agency Name</Label>
              <Select>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Option 1">Option 1</SelectItem>
                  <SelectItem value="Option 2">Option 2</SelectItem>
                  <SelectItem value="Option 3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Policy Number</Label>
              <Input className="h-8" placeholder="Enter Policy Number" />
            </div>
            <div>
              <Label>Insurer Name</Label>
              <Select>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Option 1">Option 1</SelectItem>
                  <SelectItem value="Option 2">Option 2</SelectItem>
                  <SelectItem value="Option 3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Policy Issue Date</Label>
              <Input className="h-8" type="date" />
            </div>
            <div>
              <Label>IDV (Insured Declared Value)</Label>
              <Input className="h-8" type="number" />
            </div>
            <div>
              <Label>Addon</Label>
              <Select>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Addon 1">Addon 1</SelectItem>
                  <SelectItem value="Addon 2">Addon 2</SelectItem>
                  <SelectItem value="Addon 3">Addon 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>OD Amount</Label>
              <Input
                className="h-8"
                type="number"
                value={odAmount}
                onChange={(e) => setOdAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>TP Amount</Label>
              <Input
                className="h-8"
                type="number"
                value={tpAmount}
                onChange={(e) => setTpAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Net Total (OD + TP)</Label>
              <Input
                className="h-8"
                type="number"
                value={odAmount + tpAmount}
                disabled
              />
            </div>
            <div>
              <Label>GST Amount</Label>
              <Input
                className="h-8"
                type="number"
                value={gstAmount}
                onChange={(e) => setGstAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Total Premium with GST</Label>
              <Input
                className="h-8"
                type="number"
                value={odAmount + tpAmount + gstAmount}
                disabled
              />
            </div>
            <div>
              <Label>Breaking Charge</Label>
              <Input
                className="h-8"
                type="number"
                value={breakingCharge}
                onChange={(e) => setBreakingCharge(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Waiver Amount</Label>
              <Input
                className="h-8"
                type="number"
                value={waiverAmount}
                onChange={(e) => setWaiverAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Net Payable</Label>
              <Input
                className="h-8"
                type="number"
                value={
                  odAmount +
                  tpAmount +
                  gstAmount +
                  breakingCharge -
                  waiverAmount
                }
                disabled
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label className="block text-base mb-2 font-medium text-gray-700">
                Mode of Payment to Insurance Company
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Cash",
                  "Debit Card",
                  "Cheque",
                  "NEFT/RTGS",
                  "Credit Card",
                  "PhonePe",
                  "Google Pay",
                  "Netbanking",
                  "QR Code",
                ].map((mode) => (
                  <label
                    key={mode}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <Checkbox
                      checked={paymentModes.includes(mode)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPaymentModes([...paymentModes, mode]);
                        } else {
                          setPaymentModes(
                            paymentModes.filter((m) => m !== mode)
                          );
                        }
                      }}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {paymentModes.includes("Cash") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Cash Amount Paid to Insurance Company
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Cash Amount"
                />
              </div>
            )}
            {paymentModes.includes("Debit Card") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Debit Card Amount Paid to Insurance Company
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Debit Card Amount"
                />
              </div>
            )}
            {paymentModes.includes("Credit Card") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Credit Card Amount Paid to Insurance Company
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Credit Card Amount"
                />
              </div>
            )}
            {paymentModes.includes("QR Code") && (
              <div>
                <Label className="text-sm text-gray-600">
                  QR Amount Paid to Insurance Company
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter QR Amount"
                />
              </div>
            )}

            <div className="col-span-2">
              <Label className="text-sm text-gray-600">
                Date of Payment to Insurance Company
              </Label>
              <Input className="h-9 mt-1" type="date" />
            </div>

            {paymentModes.some((mode) =>
              [
                "Cheque",
                "NEFT/RTGS",
                "Credit Card",
                "Google Pay",
                "PhonePe",
                "Netbanking",
              ].includes(mode)
            ) && (
              <div className="col-span-2">
                <Label className="text-sm text-gray-600">
                  UTR / Transaction ID / Cheque Details
                </Label>
                <Input
                  className="h-9 mt-1"
                  placeholder="Enter UTR / Transaction ID / Cheque Details"
                  value={utrDetails}
                  onChange={(e) => setUtrDetails(e.target.value)}
                />
              </div>
            )}

            {paymentModes.some((mode) =>
              [
                "Cheque",
                "NEFT/RTGS",
                "Credit Card",
                "Google Pay",
                "PhonePe",
                "Netbanking",
              ].includes(mode)
            ) && (
              <div className="col-span-2">
                <Label className="text-sm text-gray-600">
                  UTR / Transaction ID / Cheque Details
                </Label>
                <Input
                  className="h-9 mt-1"
                  placeholder="Enter UTR / Transaction ID / Cheque Details"
                  value={utrDetails}
                  onChange={(e) => setUtrDetails(e.target.value)}
                />
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="col-span-2">
              <Label className="block text-base mb-2 font-medium text-gray-700">
                Payment by Customer
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Cash",
                  "Debit Card",
                  "Cheque",
                  "NEFT/RTGS",
                  "Credit Card",
                  "PhonePe",
                  "Google Pay",
                  "Netbanking",
                  "QR Code",
                ].map((mode) => (
                  <label
                    key={`customer-${mode}`}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <Checkbox
                      checked={customerPaymentModes.includes(mode)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCustomerPaymentModes([
                            ...customerPaymentModes,
                            mode,
                          ]);
                        } else {
                          setCustomerPaymentModes(
                            customerPaymentModes.filter((m) => m !== mode)
                          );
                        }
                      }}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {customerPaymentModes.includes("Cash") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Cash Amount Paid by Customer
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Cash Amount"
                />
              </div>
            )}
            {customerPaymentModes.includes("Debit Card") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Debit Card Amount Paid by Customer
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Debit Card Amount"
                />
              </div>
            )}
            {customerPaymentModes.includes("Credit Card") && (
              <div>
                <Label className="text-sm text-gray-600">
                  Credit Card Amount Paid by Customer
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter Credit Card Amount"
                />
              </div>
            )}
            {customerPaymentModes.includes("QR Code") && (
              <div>
                <Label className="text-sm text-gray-600">
                  QR Amount Paid by Customer
                </Label>
                <Input
                  className="h-9 mt-1"
                  type="number"
                  placeholder="Enter QR Amount"
                />
              </div>
            )}

            {customerPaymentModes.some((mode) =>
              [
                "Cheque",
                "NEFT/RTGS",
                "Credit Card",
                "Google Pay",
                "PhonePe",
                "Netbanking",
              ].includes(mode)
            ) && (
              <div className="col-span-2">
                <Label className="text-sm text-gray-600">
                  UTR / Transaction ID / Cheque Details
                </Label>
                <Input
                  className="h-9 mt-1"
                  placeholder="Enter UTR / Transaction ID / Cheque Details"
                  value={customerUtr}
                  onChange={(e) => setCustomerUtr(e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 7:
        const callExecutiveOptions = Array.from({ length: 100 }, (_, i) => ({
          label: `Executive ${i + 1}`,
          value: `Executive ${i + 1}`,
        }));
        const fieldExecutiveOptions = Array.from({ length: 100 }, (_, i) => ({
          label: `Executive ${i + 1}`,
          value: `Executive ${i + 1}`,
        }));
        return (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full">
                <Label className="text-sm text-gray-600 mb-2 block">
                  Call Executive Reference
                </Label>
                <MultiSelect
                  value={[]}
                  onChange={() => {}}
                  options={callExecutiveOptions}
                  optionLabel="label"
                  placeholder="Select Call Executives"
                  display="chip"
                  filter
                  className="w-full p-multiselect"
                  panelClassName="max-h-60 overflow-y-auto"
                />
              </div>
              <div className="w-full">
                <Label className="text-sm text-gray-600 mb-2 block">
                  Field Executive Reference
                </Label>
                <MultiSelect
                  value={[]}
                  onChange={() => {}}
                  options={fieldExecutiveOptions}
                  optionLabel="label"
                  placeholder="Select Field Executives"
                  display="chip"
                  filter
                  className="w-full p-multiselect"
                  panelClassName="max-h-60 overflow-y-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-600">
                  PUC Certificate Number
                </Label>
                <Input
                  className="h-9 mt-1"
                  placeholder="Enter PUC Certificate Number"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">PUC Start Date</Label>
                <Input className="h-9 mt-1" type="date" />
              </div>
              <div>
                <Label className="text-sm text-gray-600">PUC End Date</Label>
                <Input className="h-9 mt-1" type="date" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Remarks</Label>
              <Input className="h-9 mt-1" placeholder="Enter remarks here" />
            </div>
          </div>
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
      <div className="pt-6 flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < totalSteps ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}
