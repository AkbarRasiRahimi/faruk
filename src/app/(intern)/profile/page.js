"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useGlobalState } from "../../../store/global";
import Loading from "../../../components/loading";

export default function Profile() {
  const { isLoggedIn, isLoading } = useGlobalState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    university: "",
    department: "",
    class: "",
    gpa: "",
    experience: "",
    desiredField: "",
    skills: [],
    foreignLanguage: "",
    communicationSkills: "",
    teamwork: "",
    analyticalSkills: "",
    hobbies: [],
  });

  const skills = ["C++", "C", "C#", "Java", "JavaScript", "Python", "PHP", "Ruby", "Swift", "Go", "Rust", "Kotlin"];

  const [showSkills, setShowSkills] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  if (!token) {
    router.push("/");
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${apiUrl}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.user?.username || "",
            email: data.user?.email || "",
            firstName: data.user?.firstName || "",
            lastName: data.user?.lastName || "",
            phone: data.user?.phoneNumber || "",
            address: data.user?.address || "",
            university: data.user?.university || "",
            department: data.user?.department || "",
            class: data.user?.class || "",
            gpa: data.user?.average ? data.user.average.toString() : "",
            experience: data.user?.workExperience ? data.user.workExperience.join(", ") : "",
            desiredField: data.user?.desiredField || "",
            skills: data.user?.skills || [],
            foreignLanguage: data.user?.languages ? data.user.languages.join(", ") : "",
            teamwork: data.user?.teamWorkSkill ? data.user.teamWorkSkill.join(", ") : "",
            communicationSkills: data.user?.communicationSkill ? data.user.communicationSkill.join(", ") : "",
            analyticalSkills: data.user?.analyticalSkill ? data.user.analyticalSkill.join(", ") : "",
            hobbies: data.user?.hobbies || [],
          });
        } else {
          const data = await response.json();
          console.log("Error fetching profile", data);
        }
      } catch (error) {
        console.log("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillsChange = (skill) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.includes(skill)
        ? prevState.skills.filter((s) => s !== skill)
        : [...prevState.skills, skill],
    }));
  };

  const handleHobbiesChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      hobbies: value.split(",").map((hobby) => hobby.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapping formData to the required JSON structure
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      address: formData.address,
      university: formData.university,
      department: formData.department,
      class: formData.class,
      average: parseFloat(formData.gpa), // assuming GPA is a string, converting to float
      workExperience: formData.experience ? formData.experience.split(",").map((exp) => exp.trim()) : [],
      desiredField: formData.desiredField,
      skills: formData.skills,
      languages: formData.foreignLanguage ? formData.foreignLanguage.split(",").map((lang) => lang.trim()) : [],
      teamWorkSkill: formData.teamwork ? formData.teamwork.split(",").map((skill) => skill.trim()) : [],
      communicationSkill: formData.communicationSkills
        ? formData.communicationSkills.split(",").map((skill) => skill.trim())
        : [],
      analyticalSkill: formData.analyticalSkills
        ? formData.analyticalSkills.split(",").map((skill) => skill.trim())
        : [],
      hobbies: formData.hobbies,
    };

    console.log(payload);

    try {
      const response = await fetch(`${apiUrl}/api/users/intern-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated successfully", data);
      } else {
        const data = await response.json();
        console.log("Error updating profile", data);
      }
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  if (!isLoggedIn || isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-base-100">
      <form
        className="flex flex-col w-screen h-fit justify-center items-center bg-base-100 md:flex-row md:items-start md:space-x-6 pb-20 gap-2"
        onSubmit={handleSubmit}>
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 rounded-lg h-fit">
          <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
          <label className="label mb-2 text-neutral-content">Username:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Username"
            disabled
            name="username"
            value={formData.username}
          />
          <label className="label mb-2 text-neutral-content">Email:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Email"
            disabled
            name="email"
            value={formData.email}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>First Name:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="First Name"
            required
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Last Name:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Last Name"
            required
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <label className="label mb-2 text-neutral-content">Birthday:</label>
          <input
            type="date"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="mm/dd/yyyy"
            name="birthday"
            onChange={handleChange}
            value={formData.birthday}
          />
          <label className="label mb-2 text-neutral-content">Phone:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
          />
          <label className="label mb-2 text-neutral-content">Address:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Address"
            name="address"
            onChange={handleChange}
            value={formData.address}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>University:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="University"
            required
            name="university"
            onChange={handleChange}
            value={formData.university}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Department:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Department"
            required
            name="department"
            onChange={handleChange}
            value={formData.department}
          />
        </div>
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 h-fit rounded-lg">
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Class:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Class"
            required
            name="class"
            onChange={handleChange}
            value={formData.class}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>GPA:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="GPA"
            required
            name="gpa"
            onChange={handleChange}
            value={formData.gpa}
          />
          <label className="label mb-2 text-neutral-content">Experience:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Experience"
            name="experience"
            onChange={handleChange}
            value={formData.experience}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Desired Field:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Desired Field"
            required
            name="desiredField"
            onChange={handleChange}
            value={formData.desiredField}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Skills:
            <div className="relative inline-block w-10 ml-2 align-middle select-none">
              <button
                type="button"
                onClick={() => setShowSkills((prev) => !prev)}
                className="inline-flex items-center justify-center p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true">
                <HiPlus aria-hidden="true" />
              </button>
              {showSkills && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1">
                  <div className="py-1" role="none">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="0"
                        onClick={() => handleSkillsChange(skill)}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Skills"
            name="skills"
            value={formData.skills.join(", ")}
            readOnly
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Foreign Language:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Foreign Language"
            required
            name="foreignLanguage"
            onChange={handleChange}
            value={formData.foreignLanguage}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Teamwork Skills:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required
            name="teamwork"
            onChange={handleChange}
            value={formData.teamwork}>
            <option value="">Please Select</option>
            <option value="Medium">Medium</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
          </select>
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Communication Skills:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required
            name="communicationSkills"
            onChange={handleChange}
            value={formData.communicationSkills}>
            <option value="">Please Select</option>
            <option value="Medium">Medium</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
          </select>
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span> Analytical Skills:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required
            name="analyticalSkills"
            onChange={handleChange}
            value={formData.analyticalSkills}>
            <option value="">Please Select</option>
            <option value="Medium">Medium</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
          </select>
          <label className="label mb-2 text-neutral-content">Hobbies:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Hobbies"
            name="hobbies"
            onChange={handleHobbiesChange}
            value={formData.hobbies.join(", ")}
          />
          <button type="submit" className="btn btn-primary w-full mt-10">
            Save Profile
          </button>
        </div>
      </form>
    </section>
  );
}
