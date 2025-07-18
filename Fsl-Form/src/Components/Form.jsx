import { useState } from "react";
import instance from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const [showPopup, setShowPopUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaarFront: null,
    aadhaarBack: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    permanentAddress: "",
    sameAsLocal: false,
    status: "student",
    qualification: "",
    year: "",
    college: "",
    course: "",
    source: "",
    friendName: "",
  });

  const [aadharPreview, setAadharPreviews] = useState({
    front: null,
    back: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files?.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setAadharPreviews((prev) => ({
          ...prev,
          [name === "aadhaarFront" ? "front" : "back"]: reader.result,
        }));
      };

      reader.readAsDataURL(file);

      setFormValues((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "sameAsLocal" &&
          checked && { permanentAddress: prev.localAddress }),
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    setShowPopUp(true);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      console.log(formValues);

      const frm = new FormData();
      frm.append("name", formValues.name);
      frm.append("email", formValues.email);
      frm.append("password", formValues.password);
      frm.append("phone", formValues.phone);
      frm.append("dob", formValues.dob);
      frm.append("gender", formValues.gender);
      frm.append("aadhaarFront", formValues.aadhaarFront);
      frm.append("aadhaarBack", formValues.aadhaarBack);
      frm.append("parentName", formValues.parentName);
      frm.append("parentPhone", formValues.parentPhone);
      frm.append("localAddress", formValues.localAddress);
      frm.append("permanentAddress", formValues.permanentAddress);
      frm.append("status", formValues.status);
      frm.append("qualification", formValues.qualification);
      frm.append("year", formValues.year);
      frm.append("college", formValues.college);
      frm.append("course", formValues.course);
      frm.append("source", formValues.source);
      frm.append("friendName", formValues.friendName);
      console.log(frm);

      const response = await instance.post("/api/details/add", frm);
      console.log("Submitted Successfully:", response.data);
      toast.success("Register successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }

    setFormValues({
      name: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      gender: "",
      aadhaarFront: null,
      aadhaarBack: null,
      parentName: "",
      parentPhone: "",
      localAddress: "",
      permanentAddress: "",
      sameAsLocal: false,
      status: "student",
      qualification: "",
      year: "",
      college: "",
      course: "",
      source: "",
      friendName: "",
    });
  }

  function handlePopupAgree() {
    setIsChecked(true);
    setShowPopUp(false);
  }
  function handlePopupCancel() {
    setIsChecked(false);
    setShowPopUp(false);
  }

  return (
    <div className="mt-20 p-6">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="border border-gray-300 rounded-lg shadow-sm">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Personal Details
          </h1>

          {/* Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center  px-6 mb-4">
            <label className="w-50 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
               minLength={4}
              maxLength={15}
              placeholder="Enter your full name"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center px-6 mb-4">
            <label className="w-50 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center px-6 mb-4">
            <label className="w-50 text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder="Enter your 10-digit phone number"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center px-6 mb-4">
            <label className="w-50 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="dd-mm-yyyy"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.dob}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center px-6 mb-4">
            <label className="w-50 text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formValues.gender === "Male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formValues.gender === "Female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formValues.gender === "Other"}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Aadhaar Upload */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center px-6 mb-6">
            <label className="w-50 text-sm font-medium text-gray-700">
              Aadhaar Card
            </label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-[83%]">
              <div>
                <input
                  type="file"
                  name="aadhaarFront"
                  className="border border-gray-300 px-2 py-1 rounded-md"
                  onChange={handleInputChange}
                />
                {aadharPreview.front && (
                  <img
                    src={aadharPreview.front}
                    alt="Aadhaar Front Preview"
                    className="mt-2 w-[200px] h-auto border"
                  />
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="aadhaarBack"
                  className="border border-gray-300 px-2 py-1 rounded-md"
                  onChange={handleInputChange}
                />
                {aadharPreview.back && (
                  <img
                    src={aadharPreview.back}
                    alt="Aadhaar Back Preview"
                    className="mt-2 w-[200px] h-auto border"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Parent/Guardian Details */}
        <div className="border border-gray-300 rounded-lg shadow-sm mt-6">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Parent/ Guardian Details
          </h1>

          {/* Parent/Guardian Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label
              htmlFor="parentName"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Parent/ Guardian Name
            </label>
            <input
              type="text"
              name="parentName"
              placeholder="Enter your parent's name"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.parentName}
              onChange={handleInputChange}
            />
          </div>

          {/* Parent/Guardian Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-6">
            <label
              htmlFor="parentPhone"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Parent/ Guardian Phone
            </label>
            <input
              type="tel"
              name="parentPhone"
              minLength={10}
              maxLength={10}
                pattern="[0-9]{10}"
              placeholder="Enter parent's phone number"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.parentPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Residential Details */}
        <div className="border border-gray-300 rounded-lg shadow-sm mt-6">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Residential Details
          </h1>

          {/* Local Address */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label
              htmlFor="localAddress"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Local Address
            </label>
            <textarea
              name="localAddress"
              placeholder="Enter your local address"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.localAddress}
              onChange={handleInputChange}
            />
          </div>

          {/* Same as Local Address Checkbox */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label className="w-40"></label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  formValues.permanentAddress === formValues.localAddress
                }
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    permanentAddress: e.target.checked ? prev.localAddress : "",
                  }))
                }
              />
              <span className="text-sm text-gray-700">
                Permanent address is the same as local address
              </span>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-6">
            <label
              htmlFor="permanentAddress"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              placeholder="Enter your permanent address"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.permanentAddress}
              onChange={handleInputChange}
              disabled={formValues.permanentAddress === formValues.localAddress}
            />
          </div>
        </div>

        {/* Education Details */}
        <div className="border border-gray-300 rounded-lg shadow-sm mt-6">
          <h1 className="text-[15px] pl-5 bg-gray-100 font-semibold text-black mb-6 border-b border-gray-200 p-2">
            Education Details
          </h1>

          {/* Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label
              htmlFor="status"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Are you a:
            </label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="student"
                  checked={formValues.status === "student"}
                  onChange={handleInputChange}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Working Professional"
                  checked={formValues.status === "Working Professional"}
                  onChange={handleInputChange}
                />
                Working Professional
              </label>
            </div>
          </div>

          {/* Qualification */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label
              htmlFor="qualification"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Last Attended Qualification
            </label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.qualification}
              onChange={handleInputChange}
            />
          </div>

          {/* Year */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-9 px-6 mb-4">
            <label
              htmlFor="year"
              className="w-40 text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <input
              type="number"
              name="year"
              placeholder="Enter your completion year"
              className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
              value={formValues.year}
              onChange={handleInputChange}
            />
          </div>

          {/* College (only if Student) */}
          {formValues.status === "student" && (
            <div className="flex flex-col sm:flex-row items-start gap-9 sm:items-center px-6 mb-6">
              <label
                htmlFor="college"
                className="w-40 text-sm font-medium text-gray-700"
              >
                College / University
              </label>
              <input
                type="text"
                name="college"
                placeholder="College / University"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                value={formValues.college}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="border border-gray-300 rounded-lg shadow-sm mt-6">
          <h1 className="px-2 text-2xl font-semibold bg-gray-100 text-gray-800 py-2">
            Course Details
          </h1>

          <div className="flex flex-col sm:flex-row  items-start gap-15 sm:items-center my-4">
            <label
              htmlFor="course"
              className="w-36 mx-2 font-medium text-gray-700"
            >
              Course
            </label>
            <select
              name="course"
              value={formValues.course}
              onChange={handleInputChange}
              className="w-full sm:w-[80%] px-4 py-2 border border-gray-300 rounded-md"
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

          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center my-4">
            <label
              htmlFor="source"
              className="w-36 mx-2 font-medium text-gray-700"
            >
              How did you hear about us?
            </label>
            <div className="flex flex-wrap gap-6">
              {["Google", "LinkedIn", "Instagram", "Friend", "Other"].map(
                (source) => (
                  <span className="flex gap-2 items-center" key={source}>
                    <input
                      type="radio"
                      name="source"
                      value={source}
                      checked={formValues.source === source}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={source.toLowerCase()}>{source}</label>
                  </span>
                )
              )}
            </div>
          </div>

          {formValues.source === "Friend" && (
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center my-4">
              <label
                htmlFor="friendName"
                className="w-36 mx-2 font-medium text-gray-700"
              >
                Friend's Name
              </label>
              <input
                type="text"
                name="friendName"
                placeholder="Enter your friend's name"
                className="w-full sm:w-[83%] px-4 py-2 border border-gray-300 rounded-md"
                value={formValues.friendName}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-8 items-center my-4">
            <label className="relative w-16 ml-2 h-8 cursor-pointer">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="opacity-0 w-0 h-0"
                checked={isChecked}
                onChange={handleToggleChange}
              />
              <span
                className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ${
                  isChecked ? "bg-green-700" : "bg-gray-400"
                }`}
              ></span>
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  isChecked ? "transform translate-x-8" : ""
                }`}
              ></span>
            </label>
            <label className="mx-2 font-medium text-gray-700">
              Do you agree to the terms and conditions?
            </label>
          </div>

          {showPopup && (
            <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="popup bg-white p-6 rounded shadow-lg text-center max-w-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Terms and Conditions
                </h2>
                <p className="text-left font-medium text-gray-700 mb-4">
                  You agree to the following:
                </p>
                <ul className="list-disc text-left text-gray-600 pl-6 space-y-2 mb-6">
                  <li>You have understood the course content.</li>
                  <li>You have understood the course duration.</li>
                  <li>
                    You have cleared all your doubts regarding the course, the
                    content, and the duration.
                  </li>
                  <li>Fees once paid are not refundable.</li>
                  <li>
                    In case of uninformed leave, you will not be eligible for a
                    backup.
                  </li>
                  <li>
                    7 days or more of leave without prior permission will result
                    in termination of registration.
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handlePopupAgree}
                  >
                    Agree
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={handlePopupCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-4 text-center my-4 rounded-lg">
          <button
            type="submit"
            className={`py-2 text-lg font-semibold w-full rounded-lg text-black
      ${
        isSubmitting || !isChecked
          ? "bg-blue-300 cursor-not-allowed text-white text-xl"
          : "bg-blue-600 hover:bg-blue-500 text-xl text-white"
      }
    `}
            disabled={isSubmitting || !isChecked}
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
