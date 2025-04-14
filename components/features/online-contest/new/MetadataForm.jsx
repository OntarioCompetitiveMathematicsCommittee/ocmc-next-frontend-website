"use client"

// conversion functions
// conversion to work with html datetime strings
const dateToLocalString = (date) => {
    if (!date) return null;

    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
};

// duration in milliseconds to string (maximum to weeks) ("1 hour 30 minutes" ...etc)
const durationToString = (duration) => {
    if (duration === 0) return "0 minutes";
    if (duration < 0) return "negative duration";
    if (duration < 60 * 1000) return "less than a minute";

    // holy modulus
    const weeks = Math.floor(duration / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((duration % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));

    var result = '';
    if (weeks > 0) result += `${weeks} week${weeks > 1 ? 's' : ''} `;
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return result.trim();
}

// Form with contest name, start, end, for use with the new online contest form
const MetadataForm = ({name, setName, contestStart, setContestStart, contestEnd, setContestEnd}) => (
    <div className='flex flex-col items-center gap-4'>
        {/* Contest Name */}
        <div className='flex flex-col items-center gap-2'>
            <label className="text-xl text-brandBlue-900" htmlFor="name">Contest Name:</label>
            <input
                className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                placeholder="Contest Name"
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
        </div>

        {/* Start time */}
        <div className='flex flex-col items-center gap-2'>
            {/* Labels */}
            <span className="flex flex-col items-center">
                <label className="text-xl text-brandBlue-900" htmlFor="contestStart">Start Time:</label>
                <label className="text-sm text-gray-500">Note: The time uses your local timezone.</label>
            </span>

            <input
                className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                type="datetime-local"
                id="contestStart"
                value={dateToLocalString(contestStart)}
                onChange={e => {
                    const date = new Date(e.target.value);
                    if (isNaN(date) || !(date instanceof Date)) return; // checks for invalid date

                    setContestStart(date);
                }}
                required
            />
        </div>

        {/* End time */}
        <div className='flex flex-col items-center gap-2'>
            <label className="text-xl text-brandBlue-900" htmlFor="contestEnd">End Time:</label>
            <div className="flex flex-col gap-0">
                <input
                    className="px-2 py-1 border-2 rounded-t-md rounded-b-none w-[min(24rem,80vw)]"
                    type="datetime-local"
                    id="contestEnd"
                    value={dateToLocalString(contestEnd)}
                    onChange={e => {
                        const date = new Date(e.target.value);
                        if (isNaN(date) || !(date instanceof Date)) return; // checks for invalid date

                        setContestEnd(date);
                    }}
                    required
                />

                {/* Button for ease of setting end time to start time */}
                <button
                    className="px-4 py-1 w-[min(24rem,80vw)] text-white transition-colors rounded-t-none rounded-b-md bg-blue-500 hover:bg-blue-600"
                    onClick={() => setContestEnd(contestStart)}
                    type="button"
                >Set to start time</button>
            </div>

            {/* Label to show contest duration */}
            <label className="text-lg text-brandBlue-900">Duration: {durationToString(contestEnd - contestStart)}</label>
        </div>
    </div>
)

export default MetadataForm;