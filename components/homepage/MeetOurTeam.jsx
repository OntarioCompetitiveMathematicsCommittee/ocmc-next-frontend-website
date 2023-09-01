import { directors } from '@config/team'
import ExecPod from '@components/homepage/ExecPod'

const MeetOurTeam = () => {
  return (
    <section className='flex flex-col items-center w-screen gap-24 p-16 mt-48'>
        <h1 className={"homeh1 text-center"}>Meet Our Team</h1>
        <div className='flex justify-center w-screen p-4'>
            <div className='flex justify-center flex-wrap max-w-[90rem] gap-10 md:gap-24 w-full'>
                <ExecPod 
                    image={directors.Elaine}
                    firstName="Elaine"
                    lastName="Li"
                    position="Directors of Operations"
                    bgColour="bg-brandYellow-500"
                    textColour="text-brandYellow-900"
                />
                <ExecPod
                    image={directors.Atticus}
                    firstName="Atticus"
                    lastName="Zhang"
                    position="Directors of Operations"
                    bgColour="bg-brandGreen-500"
                    textColour="text-brandGreen-900"
                />
                <ExecPod
                    image={directors.Jia}
                    firstName="Jia"
                    lastName="Huang"
                    position="Directors of Technology"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                />
                <ExecPod
                    image={directors.Oliver}
                    firstName="Oliver"
                    lastName="Mao"
                    position="Directors of Mathematics"
                    bgColour="bg-brandGreen-500"
                    textColour="text-brandGreen-900"
                />
                <ExecPod
                    image={directors.Jacob}
                    firstName="Jacob"
                    lastName="Yan"
                    position="Directors of Mathematics"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                />
                <ExecPod 
                    image={directors.Daniel}
                    firstName="Daniel"
                    lastName="Chen"
                    position="Directors of Mathematics"
                    bgColour="bg-brandYellow-500"
                    textColour="text-brandYellow-900"
                />
                <ExecPod
                    image={directors.Manasva}
                    firstName="Manasva"
                    lastName="Katyal"
                    position="Executive of Technology"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                    link="https://www.linkedin.com/in/manasva-katyal-4171b525a/"
                />
                <ExecPod 
                    image={directors.Oscar}
                    firstName="Oscar"
                    lastName="Zhou"
                    position="Executive of Mathematics"
                    bgColour="bg-brandYellow-500"
                    textColour="text-brandYellow-900"
                />
                <ExecPod
                    image={directors.Aidan}
                    firstName="Aidan"
                    lastName="Zhang"
                    position="Deputy Director of Mathematics"
                    bgColour="bg-brandGreen-500"
                    textColour="text-brandGreen-900"
                />
                <ExecPod
                    image={directors.Michael}
                    firstName="Michael"
                    lastName="Hollander"
                    position="Executive of Operations"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                />
                <ExecPod
                    image={directors.Jason}
                    firstName="Jason"
                    lastName="Sun"
                    position="Executive of Mathematics"
                    bgColour="bg-brandGreen-500"
                    textColour="text-brandGreen-900"
                />
                <ExecPod
                    image={directors.Yanzi}
                    firstName="Yanzi"
                    lastName="Guo"
                    position="Executive of Technology"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                />
                <ExecPod 
                    image={directors.MichaelL}
                    firstName="Michael"
                    lastName="Li"
                    position="Executive of Mathematics"
                    bgColour="bg-brandYellow-500"
                    textColour="text-brandYellow-900"
                />
                <ExecPod
                    image={directors.Shanna}
                    firstName="Shanna"
                    lastName="Xiao"
                    position="Deputy Director of Mathematics"
                    bgColour="bg-brandGreen-500"
                    textColour="text-brandGreen-900"
                />
                <ExecPod
                    image={directors.Claire}
                    firstName="Claire"
                    lastName="Liu"
                    position="Executive of Finance"
                    bgColour="bg-brandBlue-500"
                    textColour="text-brandBlue-900"
                />
                <ExecPod
                    image={directors.Charles}
                    firstName="Charles"
                    lastName="Ran"
                    position="Executive of Mathematics"
                    bgColour="bg-brandYellow-500"
                    textColour="text-brandYellow-900"
                    link="https://polarity.sh/"
                />

                
            </div>
        </div>
    </section>
  )
}

export default MeetOurTeam