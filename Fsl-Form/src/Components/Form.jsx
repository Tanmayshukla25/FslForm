import React, { useState } from "react";
import instance from "../axiosConfig.js";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const FormData = () => {
  const [status, setStatus] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [term, setTerm] = useState(false);
 
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    parentName: "",
    parentPhone: "",
    localAddress: "",
    permanentAddress: "",
    qualification: "",
    year: "",
    college: "",
    course: "",
    friendName: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", { ...data, status, selectedPlatform });
    const response = await instance.post("api/details/add", {
      ...data,
      status,
      selectedPlatform,
    });
    console.log(response);
      toast.success("Register successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    setData({
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      parentName: "",
      parentPhone: "",
      localAddress: "",
      permanentAddress: "",
      qualification: "",
      year: "",
      college: "",
      course: "",
      friendName:""
    });
  };

  const openTermsModal = () => setTerm(true);
  const closeTermsModal = () => setTerm(false);
  const handleAgree = () => {
    setAgreed(true);
    setTerm(false);
  };

  return (
    <div className="mt-20 p-6">
        <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="border border-gray-300 rounded-lg shadow-sm">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Personal Details
          </h1>

          <div className="space-y-6 ml-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-15">
              <label className="w-40 text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handlechange}
                placeholder="Enter your full name"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-15">
              <label className="w-40 text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handlechange}
                placeholder="Enter your email"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-15">
              <label className="w-40 text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handlechange}
                placeholder="Enter your phone number"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-15">
              <label className="w-40 text-gray-700 font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={handlechange}
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center pb-10 gap-15">
              <label className="w-40 text-gray-700 font-medium">Gender</label>
              <div className="flex gap-6">
                {["male", "female", "other"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={item}
                      checked={data.gender === item}
                      onChange={handlechange}
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-300 rounded-lg shadow-sm ">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Parent / Guardian Details
          </h1>
          <div className="space-y-6 ml-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="w-50 text-gray-700 font-medium">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                name="parentName"
                value={data.parentName}
                onChange={handlechange}
                placeholder="Enter parent name"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5">
              <label className="w-50 text-gray-700 font-medium">
                Parent / Guardian Phone
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={data.parentPhone}
                onChange={handlechange}
                placeholder="Enter parent phone"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-300 rounded-lg shadow-sm ">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Residential Details
          </h1>
          <div className="space-y-6 ml-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="w-50 text-gray-700 font-medium">
                Local Address
              </label>
              <input
                type="text"
                name="localAddress"
                value={data.localAddress}
                onChange={handlechange}
                placeholder="Enter local address"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="w-50 text-gray-700 font-medium"></label>
              <div className="text-center">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      permanentAddress: e.target.checked
                        ? prev.localAddress
                        : "",
                    }))
                  }
                />{" "}
                Permanent address is the same as local address
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5">
              <label className="w-50 text-gray-700 font-medium">
                Permanent Address
              </label>
              <input
                type="text"
                name="permanentAddress"
                readOnly
                value={data.permanentAddress}
                onChange={handlechange}
                placeholder="Enter permanent address"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-6  space-y-8 border border-gray-300 rounded-lg shadow-sm bg-white">
          <h2 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black border-b border-gray-200 p-2">
            Educational Details
          </h2>

          <div className="ml-5 py-2 space-y-6">
            <div className="flex items-center gap-5">
              <label className=" w-50 block text-gray-700 font-medium mb-2">
                Are you a:
              </label>
              <div className="flex items-center gap-6">
                {["Student", "Working Professional"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={type}
                      checked={status === type}
                      onChange={() => setStatus(type)}
                      className="accent-blue-600"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {status === "Student" ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-50 text-gray-700 font-medium">
                    Last Attained Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={data.qualification}
                    onChange={handlechange}
                    placeholder="Enter your qualification"
                    className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-50 text-gray-700 font-medium">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={data.year}
                    onChange={handlechange}
                    placeholder="Enter your completion year"
                    className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col pb-5 sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-50 text-gray-700 font-medium">
                    College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={data.college}
                    onChange={handlechange}
                    placeholder="College / University"
                    className="sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-50 text-gray-700 font-medium">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={data.designation}
                    onChange={handlechange}
                    placeholder="Enter your designation"
                    className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col pb-5 sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-50 text-gray-700 font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={data.company}
                    onChange={handlechange}
                    placeholder="Enter your company name"
                    className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6  w-full space-y-6">
          <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
            <h2 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black border-b border-gray-200 p-2">
              Course Details
            </h2>

            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="text-gray-700 font-medium w-50">Course</label>
                <select
                  name="course"
                  value={data.course}
                  onChange={handlechange}
                  className="w-full sm:w-[84%] px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option>Select a course</option>
                  {[
                    "Advanced Java",
                    "Android",
                    "Computer Basics",
                    "Core Java",
                    "Digital Marketing",
                    "Full Stack Development",
                    "Graphic Design",
                    "Node JS",
                    "Photoshop",
                    "PHP",
                    "Python",
                    "React JS",
                    "Web Design",
                    "Other Course",
                  ].map((course) => (
                    <option key={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="text-gray-700 text-[15px] font-medium w-50">
                  How did you come to know about us?
                </label>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  {[
                    "Google",
                    "Linkedin",
                    "Instagram",
                    "College TPO",
                    "Friend",
                  ].map((platform) => (
                    <label
                      key={platform}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name="source"
                        value={platform}
                        checked={selectedPlatform === platform}
                        onChange={() => setSelectedPlatform(platform)}
                        className="accent-blue-600"
                      />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedPlatform === "Friend" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="text-gray-700 font-medium ml-54 w-30">
                    Friend's Name
                  </label>
                  <input
                    type="text"
                    name="friendName"
                    value={data.friendName}
                     onChange={handlechange}
                    placeholder="Enter friend's name"
                    className=" sm:w-[34%] px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-sm text-gray-700">
              By clicking submit, you agree to our{" "}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  openTermsModal();
                }}
                className="text-blue-700 font-semibold"
              >
                Terms & Conditions
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className={`w-full py-3 mb-5 rounded-md text-white font-semibold text-lg transition ${
              agreed
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Register
          </button>

          {term && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Terms & Conditions
                  </h2>
                  <button
                    onClick={closeTermsModal}
                    className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                  >
                    <RxCross2 />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-medium mb-2 text-gray-700">
                    You agree to the following:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                    <li>You have understood the course content.</li>
                    <li>You have understood the course duration.</li>
                    <li>
                      You have cleared all your doubts regarding the course, the
                      content, and the duration.
                    </li>
                    <li>Fees once paid is not refundable.</li>
                    <li>
                      In case of uninformed leave, I will not be eligible for a
                      backup.
                    </li>
                    <li>
                      7 days or more of leave without prior permission would
                      result in termination of registration.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 items-center flex justify-between  space-x-4">
                  <button
                    onClick={handleAgree}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    I Agree
                  </button>
                  <button
                    onClick={closeTermsModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormData;
