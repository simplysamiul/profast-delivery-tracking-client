import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useTrackingLogger from "../../hooks/useTrackingLogger";

const SendParcel = () => {
  const { user } = useAuth();
  const axiousSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [wareHouses, setWareHouses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [senderDistrict, setSenderDistrict] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const [parcelType, setParcelType] = useState("document");
  const {logTracking} = useTrackingLogger();

  //  Load warehouse data from JSON
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setWareHouses(data);
        const uniqueDistricts = [...new Set(data.map((w) => w.district))];
        setDistricts(uniqueDistricts);
      })
      .catch((err) => console.error(err));
  }, []);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //  Delivery Charge Calculator
  const calculateDeliveryCharge = (parcelType, weight, deliveryType) => {
    let charge = 0;
    let breakdown = "";

    if (parcelType === "document") {
      charge = deliveryType === "within" ? 60 : 80;
      breakdown = `
        <b>Document Delivery (${deliveryType === "within" ? "Within City" : "Outside City"})</b><br>
        Flat Rate: ৳${charge}
      `;
    } else {
      if (weight <= 3) {
        charge = deliveryType === "within" ? 110 : 150;
        breakdown = `
          <b>Non-Document (Up to 3kg, ${deliveryType === "within" ? "Within City" : "Outside City"
          })</b><br>
          Flat Rate: ৳${charge}
        `;
      } else {
        const extraKg = weight - 3;
        const extraCost = extraKg * 40;

        if (deliveryType === "within") {
          charge = 110 + extraCost;
          breakdown = `
            <b>Non-Document (>3kg, Within City)</b><br>
            ৳110 (Base up to 3kg) + ৳${extraCost} (${extraKg} extra kg × ৳40)<br>
            <b>Total: ৳${charge}</b><br>
            <i>Extra added because parcel weight exceeds 3kg.</i>
          `;
        } else {
          charge = 150 + extraCost + 40;
          breakdown = `
            <b>Non-Document (>3kg, Outside City)</b><br>
            ৳150 (Base up to 3kg) + ৳${extraCost} (${extraKg} extra kg × ৳40) + ৳40 (Outside city fee)<br>
            <b>Total: ৳${charge}</b><br>
            <i>Extra added for heavy parcel and outside city transport cost.</i>
          `;
        }
      }
    }
    return { charge, breakdown };
  };

  // Handle form submission
  const onSubmit = (data) => {
    const weight = parcelType === "document" ? 0 : Number(data.parcelWeight || 0);
    const deliveryType =
      senderDistrict === receiverDistrict ? "within" : "outside";

    const { charge, breakdown } = calculateDeliveryCharge(
      parcelType,
      weight,
      deliveryType
    );

    // Generate booking info (NEW)
    const bookingTime = new Date().toLocaleString(); // date generator
    const trackingId = `TRK${Date.now().toString().slice(-6)}`; // Simple unique ID for tracking

    // Add all extra info into form data
    const parcelInfo = {
      ...data,
      parcelType,
      userEmail: user?.email || "guest@unknown.com",
      bookingTime,
      trackingId,
      deliveryCharge: charge,
      deliveryType,
      status: "pending",
      paymentStatus: "unpaid"
    };

    // SweetAlert to confirm booking
    Swal.fire({
      title: "Delivery Charge",
      html: `
        <div style="text-align:left; font-size:15px;">
          <p><b>Parcel Type:</b> ${parcelType === "document" ? "Document" : "Non-Document"}</p>
          ${parcelType !== "document"
          ? `<p><b>Weight:</b> ${weight} kg</p>`
          : ""
        }
          <p><b>Delivery Type:</b> ${deliveryType === "within" ? "Within City" : "Outside City"
        }</p>
          <hr>
          <div style="margin-top:10px;">${breakdown}</div>
          <hr>
          <h3 style="margin-top:10px;">💰 <b>Total Charge: ৳${charge}</b></h3>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "OK, Confirm",
      cancelButtonText: "Cancel",
      showCloseButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {

        // post a parcel to the databse
        axiousSecure.post("/parcels", parcelInfo)
          .then(async (res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Booking Confirmed",
                html: `
            <p>Your parcel booking is confirmed!</p>
            <p><b>Tracking ID:</b> ${trackingId}</p>
            <p><b>Booking Time:</b> ${bookingTime}</p>
            <p><b>Total Charge:</b> ৳${charge}</p>
          `,
                confirmButtonColor: "#CAEB66",
              });
              reset();

              // send data for parcel tracking
              await logTracking({
                trackingId : trackingId,
                status : "Parcel_created",
                details : `Created by ${user.email}`,
                updateBy: user.email
             })

              navigate("/dashboard/myParcels")
              
            }
          }).catch(err => {
            Swal.fire({
              icon: "error",
              text: `${err.message}`,
              confirmButtonColor: "#CAEB66",
            });
            console.log("Errrrrrrooooooo", err)
          })
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10 my-10">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-deepG mb-6">
        Add Parcel
      </h1>
      <hr className="border-gray-200 mb-6" />
      <h2 className="text-lg md:text-xl font-bold text-deepG mb-4">
        Enter your parcel details
      </h2>

      {/*  Parcel Type Section */}
      <div className="flex items-center gap-6 mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            value="document"
            checked={parcelType === "document"}
            onChange={() => setParcelType("document")}
            className="radio radio-success"
          />
          <span className="font-medium text-gray-700">Document</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            value="not-document"
            checked={parcelType === "not-document"}
            onChange={() => setParcelType("not-document")}
            className="radio radio-success"
          />
          <span className="font-medium text-gray-700">Not-Document</span>
        </label>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parcel Name */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Parcel Name
            </label>
            <input
              type="text"
              placeholder="Enter parcel name"
              {...register("parcelName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.parcelName && (
              <p className="text-red-600 text-sm mt-1">
                Parcel Name is required
              </p>
            )}
          </div>

          {/* Parcel Weight - hidden for document */}
          {parcelType === "not-document" && (
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                step="any"
                placeholder="Enter weight in KG"
                {...register("parcelWeight", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.parcelWeight && (
                <p className="text-red-600 text-sm mt-1">
                  Weight is required
                </p>
              )}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Sender & Receiver Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ===================== SENDER SECTION ===================== */}
          <div>
            <h3 className="font-extrabold text-deepG text-lg mb-3">
              Sender Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sender Name */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Sender Name
                </label>
                <input
                  {...register("senderName", { required: true })}
                  placeholder="Enter sender name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* DISTRICT */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  District
                </label>
                <select
                  {...register("senderDistrict")}
                  onChange={(e) => setSenderDistrict(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Select District
                  </option>
                  {districts.map((district, idx) => (
                    <option key={idx}>{district}</option>
                  ))}
                </select>
              </div>

              {/* WAREHOUSE (covered_area of selected district) */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Warehouse (Covered Area)
                </label>
                <select
                  {...register("senderWarehouse")}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Select Covered Area
                  </option>
                  {wareHouses
                    .filter((w) => w.district === senderDistrict)
                    .flatMap((w) => w.covered_area)
                    .map((area, idx) => (
                      <option key={idx}>{area}</option>
                    ))}
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Sender Address
                </label>
                <input
                  {...register("senderAddress", { required: true })}
                  placeholder="Enter address"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contact */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Sender Contact No
                </label>
                <input
                  {...register("senderContact", { required: true })}
                  placeholder="Enter contact number"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Pickup Instruction */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Write pickup instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>
          </div>

          {/* ===================== RECEIVER SECTION ===================== */}
          <div>
            <h3 className="font-extrabold text-deepG text-lg mb-3">
              Receiver Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Receiver Name */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName", { required: true })}
                  placeholder="Enter receiver name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* DISTRICT */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  District
                </label>
                <select
                  {...register("receiverDistrict")}
                  onChange={(e) => setReceiverDistrict(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Select District
                  </option>
                  {districts.map((district, idx) => (
                    <option key={idx}>{district}</option>
                  ))}
                </select>
              </div>

              {/* WAREHOUSE (covered_area of selected district) */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Warehouse (Covered Area)
                </label>
                <select
                  {...register("receiverWarehouse")}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Select Covered Area
                  </option>
                  {wareHouses
                    .filter((w) => w.district === receiverDistrict)
                    .flatMap((w) => w.covered_area)
                    .map((area, idx) => (
                      <option key={idx}>{area}</option>
                    ))}
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Receiver Address
                </label>
                <input
                  {...register("receiverAddress", { required: true })}
                  placeholder="Enter receiver address"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contact */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Receiver Contact No
                </label>
                <input
                  {...register("receiverContact", { required: true })}
                  placeholder="Enter contact number"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Delivery Instruction */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700 mb-2 block">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Write delivery instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600 italic">
          * PickUp Time 4pm - 7pm Approx.
        </p>

        <button
          type="submit"
          className="btn bg-lightG hover:bg-deepG hover:text-white text-black font-bold w-full md:w-auto"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
