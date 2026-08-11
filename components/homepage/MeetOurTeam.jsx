'use client'

import { useState } from 'react'
import { team, legacyTeam, teamBg, teamText } from '@config/team'
import ExecPod from '@components/homepage/ExecPod'

const tabs = [
    {
        id: "current",
        label: "Current",
        roster: team,
        emptyMessage: "Our current team is being announced soon."
    },
    {
        id: "legacy",
        label: "Legacy",
        roster: legacyTeam,
        emptyMessage: "Our legacy team is being compiled — check back soon."
    },
]

const MeetOurTeam = () => {
  const [activeTab, setActiveTab] = useState("current")
  const { roster, emptyMessage } = tabs.find((tab) => tab.id === activeTab)

  return (
    <section className='flex flex-col items-center w-screen gap-24 p-16 mt-48'>
        <div className='flex flex-col items-center gap-8'>
            <h1 className={"homeh1 text-center"}>Meet Our Team</h1>
            <div className='flex gap-1 p-1 rounded-full bg-brandNeutral-200' role='tablist'>
                {
                    tabs.map((tab) => (
                        <button
                            key={tab.id}
                            role='tab'
                            aria-selected={tab.id === activeTab}
                            onClick={() => setActiveTab(tab.id)}
                            className={
                                `px-8 py-2 text-lg font-medium transition-colors rounded-full ${
                                    tab.id === activeTab
                                        ? "bg-brandBlue-500 text-white"
                                        : "text-brandNeutral-500 hover:text-brandNeutral-700"
                                }`
                            }
                        >
                            {tab.label}
                        </button>
                    ))
                }
            </div>
        </div>
        <div className='flex justify-center w-screen p-4'>
            {
                roster.length === 0
                ?   <p className='text-lg text-center text-brandNeutral-400'>
                        {emptyMessage}
                    </p>
                :   <div className='flex justify-center flex-wrap max-w-[90rem] gap-10 md:gap-24 w-full'>
                        {
                            roster.map((exec, index) => (
                                <ExecPod
                                    key={index}
                                    image={exec.image}
                                    firstName={exec.firstName}
                                    lastName={exec.lastName}
                                    position={exec.position}
                                    bgColour={teamBg[(index + 1) % 3]}
                                    textColour={teamText[(index + 1) % 3]}
                                    link={exec.link}
                                />
                            ))
                        }
                    </div>
            }
        </div>
    </section>
  )
}

export default MeetOurTeam
