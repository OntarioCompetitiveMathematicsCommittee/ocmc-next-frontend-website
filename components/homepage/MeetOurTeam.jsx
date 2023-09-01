import { team, teamBg, teamText } from '@config/team'
import ExecPod from '@components/homepage/ExecPod'

const MeetOurTeam = () => {
  return (
    <section className='flex flex-col items-center w-screen gap-24 p-16 mt-48'>
        <h1 className={"homeh1 text-center"}>Meet Our Team</h1>
        <div className='flex justify-center w-screen p-4'>
            <div className='flex justify-center flex-wrap max-w-[90rem] gap-10 md:gap-24 w-full'>
                {
                    team.map((exec, index) => (
                        <ExecPod
                            key={index}
                            image={exec.image}
                            firstName={exec.firstName}
                            lastName={exec.lastName}
                            position={exec.position}
                            bgColour={teamBg[index % 3]}
                            textColour={teamText[index % 3]}
                            link={exec.link}
                        />
                    ))
                            
                }
            </div>
        </div>
    </section>
  )
}

export default MeetOurTeam