"use client";

// importing required modules and components
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAddNewContestMutation } from "@components/features/contests/contestsApiSlice";

import BackButton from "@components/elements/BackButton";

const NewContest = () => {
  // reference to error message element
  const errRef = useRef(null);

  // mutation function for adding a new contest
  const [addNewContest, { isLoading, isSuccess, isError, error }] = useAddNewContestMutation();

  const router = useRouter();

  // state variables for contest details
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [max_score, setMaxScore] = useState("");

  // event handlers that update state variables when input fields change
  const handleNameChange = (e) => setName(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleMaxScoreChange = (e) => setMaxScore(e.target.value);

  // form can be submitted if all fields have values and are not in loading state
  const canSubmit = [name, year, description, max_score].every(Boolean) && !isLoading;

  // redirects to contest page after successful contest creation
  useEffect(() => {
    if (isSuccess) router.push("/portal/contests");
  }, [isSuccess, router]);

  // handles form submission
  const onCreateContestClicked = async (e) => {
    e.preventDefault();
    if (canSubmit) await addNewContest({ name, year, description, max_score });
  };

  // error message handling
  let errmsg;
  if (isError) errmsg = error.error;

  // styling
  return (
    <section className="h-full w-full flex flex-col justify-center items-center gap-8 relative pb-32">
      <BackButton path={"/portal/contests"} />
      {/* display error message if there is an error */}
      <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

      <h1 className="text-5xl font-bold text-brandBlue-900">New Contest</h1>

      <form onSubmit={onCreateContestClicked} className="flex flex-col gap-4">
        {/** input field for contest name */}
        <label className="text-xl text-brandBlue-900" htmlFor="name">Name:</label>
        <input
          className="w-96 border-2"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        {/** input field for contest year */}
        <label className="text-xl text-brandBlue-900" htmlFor="year">Year:</label>
        <input
          className="w-96 border-2"
          type="text"
          id="year"
          name="year"
          value={year}
          onChange={handleYearChange}
        />

        {/** textbox for contest description */}
        <label className="text-xl text-brandBlue-900" htmlFor="description">Description:</label>
        <textarea
          className="w-96 border-2"
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        {/** input field for contest max score */}
        <label htmlFor="max_score">Max Score:</label>
        <input
          className="w-96 border-2"
          type="number"
          id="max_score"
          name="max_score"
          value={max_score}
          onChange={handleMaxScoreChange}
        />

        {/** submit button */}
        <button className="text-xl w-96 bg-brandBlue-500 rounded-md py-2 text-white" type="submit" disabled={!canSubmit}>Save Contest</button>
      </form>
    </section>
  )
}

export default NewContest;
