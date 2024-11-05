'use client';

// importing required modules and components
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetUsersQuery, useUpdateUserContestScoresMutation } from '@components/features/users/usersApiSlice';
import { selectContestById, useUpdateContestSignupsMutation } from "@components/features/contests/contestsApiSlice";

import BackButton from '@components/elements/BackButton';

const EditContest = () => {
	const [csv, setCsv] = useState('');
	const [updates, setUpdates] = useState({});
	const [errors, setErrors] = useState({});
	const [codeToUsernameMap, setCodeToUsernameMap] = useState({});

	const { data: users, isSuccess: isUsersSuccess } = useGetUsersQuery({});

	useEffect(() => {
		if (isUsersSuccess) {
			let codeToUsername = {};
			for (let usr in users.entities) {
				codeToUsername[users.entities[usr].code] = users.entities[usr].username;
			}
			setCodeToUsernameMap(codeToUsername);
		}
	}, [isUsersSuccess]);

	const handleCsvChange = (e) => {
		setCsv(e.target.value);
	};

	// get contestid from url
	const [updateUserContests, { isSuccess: isUpdateSuccess }] = useUpdateUserContestScoresMutation()
	const params = useParams();
	const id = params.contestId;

	useEffect(() => {
		if (csv === "") {
			return;
		}
		const csvArray = csv.replace(/\n/g, '').split(',');
		let updateObj = {};
		let errorObj = {};
		for (let i = 0; i < Math.floor(csvArray.length / 2); i++) {
			//check if score is empty
			if (csvArray[2 * i + 1] == '') {
				delete updateObj[csvArray[2 * i]];
				//check if it's a number
			} else if (!/^\d+$/.test(csvArray[2 * i + 1])) {
				errorObj[csvArray[2 * i]] = 'Score must be a number';
			} else {
				updateObj[csvArray[2 * i]] = csvArray[2 * i + 1];
			}
		}
		setUpdates(updateObj);
		setErrors(errorObj);

	}, [csv]);

	const handleErrorDownload = (e) => {
		e.preventDefault();
		const fileData = JSON.stringify(errors);
		const blob = new Blob([fileData], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		const dateTime = new Date().toLocaleString();
		link.download = 'error_log_' + dateTime + '.json';
		link.href = url;
		link.click();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res;
		let postErrors = {};

		for (let update of Object.keys(updates)) {
			console.log("updating username " + codeToUsernameMap[update] + " with score " + updates[update]);

			res = await updateUserContests({
				username: codeToUsernameMap[update],
				contest_id: id,
				score: updates[update],
				type: "update",
			});

			console.log(res);

			if (res.error) {
				setErrors((prev) => ({ ...prev, [update]: res.error.data.message }));
			}
		}
	};


	// render if contest data is available
	const content = (
		<div className='relative flex flex-col items-center justify-center w-full h-full gap-8 pb-32'>
			<BackButton path="/portal/contests" />
			<h1 className="portalh2">Input Scores</h1>
			<form className='max-w-[90%] w-[60rem] flex flex-col gap-4' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="description">CSV Scores:</label>
					<textarea
						className="w-full h-64 px-2 py-1 text-lg border-2"
						placeholder='username1,score1,username2,score2'
						id="description"
						name="description"
						value={csv}
						onChange={handleCsvChange}
					/>
				</div>
				<div className='flex gap-2'>
					<button disabled={Object.keys(updates).length === 0} type="submit"
						className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-64 ' +
							(Object.keys(updates).length === 0 ? "border-2 bg-brandNeutral-100" : ("text-white bg-brandBlue-500 hover:bg-brandBlue-600"))}>
						Update Scores
					</button>
					<button onClick={handleErrorDownload} disabled={Object.keys(errors).length === 0} type="button"
						className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-64 ' +
							(Object.keys(errors).length === 0 ? "border-2 bg-brandNeutral-100" : ("text-white bg-red-500 hover:bg-red-600"))}>
						Download Error Log
					</button>
				</div>

			</form>
		</div>
	)
	return content;
};

export default EditContest;
