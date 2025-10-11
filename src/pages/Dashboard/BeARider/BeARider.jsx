import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Trash2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import riderImg from '../../../assets/agent-pending.png'
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {

  const [wareHouses, setWareHouses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [nidImage, setNidImage] = useState(null);
  const [rideristrict, setRiderDistrict] = useState("");
  const [riderNidLink, setRiderNidLink] = useState("");
  const axiousSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Load warehouse data from JSON
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

  // upload image and get live url from image BB
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setNidImage(URL.createObjectURL(file))
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE__image_upload_key}`, formData);
      setRiderNidLink(res.data.data.url)
    };
  };

  // image remove
  const removeImage = () => setNidImage(null);

  const onSubmit = async (data) => {
    const nidImage = riderNidLink;
    const riderInfo = { ...data, nidImage, approval: "pending", applyAt: new Date().toISOString() };

    // post rider application to the databse 
    setLoading(true);
    axiousSecure.post("/riders", riderInfo)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "info",
            title: "Application Successfully ..!",
            text: "Your application is pending for approval. ",
            showCloseButton: true
          })
          reset();
          setNidImage(null);
          setLoading(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Application Failed ..!",
            text: `${res.data}`,
            showCloseButton: true
          })
          setLoading(false);
        }
      }).catch(err => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Application Failed ..!",
          text: `${err.message}`,
          showCloseButton: true
        })
      })
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm px-10 py-10 mt-10 flex flex-col lg:flex-row justify-between items-center gap-10">
      {/* Left Side */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl font-extrabold text-deepG mb-2">Be a Rider</h2>
        <p className="text-gray-500 mb-14 leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <h2 className="text-2xl font-bold text-deepG mb-4">Tell us about yourself</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name + Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                defaultValue={user.displayName}
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                placeholder="Your Age"
                className="input input-bordered w-full"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>
          </div>

          {/* Email + District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                defaultValue={user.email}
                {...register("email", { required: "Email is required" })}
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <select
                {...register("riderDistrict")}
                onChange={(e) => setRiderDistrict(e.target.value)}
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
          </div>

          {/* Bike Model + Vehicle Reg Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register("model", { required: "Bike model is required" })}
                placeholder="Bike Model"
                className="input input-bordered w-full"
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                {...register("regNo", { required: "Registration number is required" })}
                placeholder="Bike Registration number"
                className="input input-bordered w-full"
              />
              {errors.regNo && (
                <p className="text-red-500 text-sm mt-1">{errors.regNo.message}</p>
              )}
            </div>
          </div>

          {/* NID + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register("nid", { required: "NID is required" })}
                placeholder="NID No"
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("contact", { required: "Contact is required" })}
                placeholder="Contact"
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/* Warehouse (Dynamic based on district) */}
          <div>
            <select
              {...register("warehouse")}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select Covered Area
              </option>
              {wareHouses
                .filter((w) => w.district === rideristrict)
                .flatMap((w) => w.covered_area)
                .map((area, idx) => (
                  <option key={idx}>{area}</option>
                ))}
            </select>
          </div>

          {/* Upload NID Image */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center relative">
            {!nidImage ? (
              <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                <Upload className="w-6 h-6 text-gray-500" />
                <span className="text-gray-500">Upload NID Front Copy</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("nidImage", { required: true })}
                  onChange={handleImgUpload}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={nidImage}
                  alt="NID Front"
                  className="w-full max-w-sm h-40 object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            )}
          </div>
          {!nidImage && errors.nidImage && (
            <p className="text-red-500 text-sm mt-1">
              NID image is required
            </p>
          )}

          {/* Submit Button */}
          {loading ? <div className="flex items-center justify-center my-6"><span className="loading loading-spinner loading-xl"></span></div>
          :<button
            type="submit"
            className="btn bg-lightG hover:bg-deepG hover:text-white text-deepG w-full">
            Apply Now
          </button>}
        </form>
      </div>

      {/* Right Side Illustration */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={riderImg}
          alt="Rider Image"
          className="w-100 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default BeARider;
