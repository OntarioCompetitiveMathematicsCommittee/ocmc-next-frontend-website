"use client";

// importing required modules and components
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAddNewContestMutation } from "@components/features/contests/contestsApiSlice";

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
  const content = (
    <section>
      {/* display error message if there is an error */}
      <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

      <h1>New Contest</h1>

      <form onSubmit={onCreateContestClicked}>
        {/** input field for contest name */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        {/** input field for contest year */}
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          name="year"
          value={year}
          onChange={handleYearChange}
        />

        {/** textbox for contest description */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        {/** input field for contest max score */}
        <label htmlFor="max_score">Max Score:</label>
        <input
          type="number"
          id="max_score"
          name="max_score"
          value={max_score}
          onChange={handleMaxScoreChange}
        />

        {/** submit button */}
        <button type="submit" disabled={!canSubmit}>Save Contest</button>
      </form>
    </section>
  );

  // render
  return (
    <div>
        {content}
    </div>
  )
}

export default NewContest;
