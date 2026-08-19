import Arnav from '@public/assets/directors/Arnav.png'
import Atticus from '@public/assets/directors/Atticus.png'
import Christopher from '@public/assets/directors/Christopher.png'
import Daniel from '@public/assets/directors/Daniel.png'
import Elaine from '@public/assets/directors/Elaine.png'
import Emily from '@public/assets/directors/Emily.png'
import Haruka from '@public/assets/directors/Haruka.png'
import Heidi from '@public/assets/directors/Heidi.png'
import Helen from '@public/assets/directors/Helen.png'
import Jack from '@public/assets/directors/Jack.png'
import Leo from '@public/assets/directors/Leo.png'
import Manasva from '@public/assets/directors/Manasva.png'
import Maryam from '@public/assets/directors/Maryam.png'
import MichaelH from '@public/assets/directors/MichaelH.png'
import MichaelL from '@public/assets/directors/MichaelL.png'
import Oscar from '@public/assets/directors/Oscar.png'
import Pavel from '@public/assets/directors/Pavel.png'
import Phoebe from '@public/assets/directors/Phoebe.png'
import Prince from '@public/assets/directors/Prince.png'
import Shanna from '@public/assets/directors/Shanna.png'
import Simone from '@public/assets/directors/Simone.png'
import Sowmya from '@public/assets/directors/Sowmya.png'
import Terry from '@public/assets/directors/Terry.png'
import Yanzi from '@public/assets/directors/Yanzi.png'

// Sourced from the OCMC Staff MasterList (Current Staff column).
// Directors first, then the rest by department and position.
// `image` is optional — ExecPod falls back to an initials placeholder without it.
// `description` is optional — a pod that has one becomes clickable and opens a bio.
export const team = [
    {
        image: Arnav,
        firstName: "Arnav",
        lastName: "Kotian",
        position: "Director of Finance"
    },
    {
        image: Daniel,
        firstName: "Daniel",
        lastName: "Chen",
        position: "Director of Operations & Technology"
    },
    {
        image: Christopher,
        firstName: "Christopher",
        lastName: "Li",
        position: "Director of Mathematics"
    },
    {
        firstName: "Andrew",
        lastName: "Dai",
        position: "Sponsorship Coordinator"
    },
    {
        firstName: "Ethan",
        lastName: "Cai",
        position: "Sponsorship Coordinator"
    },
    {
        image: Helen,
        firstName: "Helen",
        lastName: "Huang",
        position: "Accountant"
    },
    {
        firstName: "Luna",
        lastName: "Li",
        position: "Operations Coordinator"
    },
    {
        image: Simone,
        firstName: "Simone",
        lastName: "Sun",
        position: "Operations Coordinator",
        description: "My name is Simone Sun and I am a rising grade 12 at White Oaks Secondary School. In my free time, I enjoy math, physics, and listening to a wide range of music, especially hip-hop, EDM, and hyperpop."
    },
    {
        image: Jack,
        firstName: "Nanxuan",
        lastName: "Zhang",
        position: "Operations Coordinator",
        description: "Jack Zhang is a competition math enthusiast from Quebec with experience founding and leading a school math club. He enjoys helping students explore their own passion for mathematics — creating opportunities to engage with the subject beyond the classroom, and beyond the territory."
    },
    {
        image: Terry,
        firstName: "Terry",
        lastName: "Yang",
        position: "Problem Setter"
    },
    {
        firstName: "Yixuan",
        lastName: "Hou",
        position: "Problem Setter"
    },
    {
        firstName: "Jonathan",
        lastName: "Wang",
        position: "Problem Setter"
    },
    {
        firstName: "Avneet",
        lastName: "Prakash",
        position: "Problem Setter"
    },
    {
        firstName: "Wendy",
        lastName: "Xia",
        position: "Problem Setter"
    },
    {
        image: Prince,
        firstName: "Prince",
        lastName: "Zhang",
        position: "Problem Setter"
    },
    {
        firstName: "Lei",
        lastName: "He",
        position: "Problem Setter"
    },
    {
        firstName: "Leo",
        lastName: "Wu",
        position: "Problem Setter"
    },
    {
        firstName: "Jayden",
        lastName: "Lee",
        position: "Developer"
    },
    {
        firstName: "Siddhant",
        lastName: "Arora",
        position: "Developer"
    }
]

// Sourced from the OCMC Staff MasterList (Retired Staff column), shown under
// the "Legacy" tab. CEO first, then directors, then the rest by department
// and position — the same ordering as `team` above.
export const legacyTeam = [
    {
        image: Atticus,
        firstName: "Atticus",
        lastName: "Zhang",
        position: "Chief Executive Officer",
        link: "https://www.linkedin.com/in/atticus-zhang-70708626a/"
    },
    {
        firstName: "Elaine",
        lastName: "Li",
        position: "Director of Finance"
    },
    {
        image: Leo,
        firstName: "Leo",
        lastName: "Xie",
        position: "Director of Finance",
        link: "https://www.linkedin.com/in/leo-xie-c1/"
    },
    {
        image: MichaelH,
        firstName: "Michael",
        lastName: "Hollander",
        position: "Director of Operations"
    },
    {
        firstName: "Oliver",
        lastName: "Mao",
        position: "Director of Mathematics"
    },
    {
        firstName: "Jacob",
        lastName: "Yan",
        position: "Director of Mathematics"
    },
    {
        image: Manasva,
        firstName: "Manasva",
        lastName: "Kaytal",
        position: "Director of Technology",
        link: "https://linkedin.com/in/manasva-katyal"
    },
    {
        firstName: "Claire",
        lastName: "Liu",
        position: "Sponsorship Coordinator"
    },
    {
        image: Haruka,
        firstName: "Haruka",
        lastName: "Kurishima",
        position: "Sponsorship Coordinator"
    },
    {
        firstName: "James",
        lastName: "Yang",
        position: "Sponsorship Coordinator"
    },
    {
        firstName: "Nabira",
        lastName: "Rashid",
        position: "Sponsorship Coordinator"
    },
    {
        image: Maryam,
        firstName: "Maryam",
        lastName: "Abidi",
        position: "Sponsorship Coordinator"
    },
    {
        firstName: "Matthew",
        lastName: "Li",
        position: "Events Coordinator"
    },
    {
        image: Phoebe,
        firstName: "Phoebe",
        lastName: "Huang",
        position: "Events Coordinator",
        link: "https://www.linkedin.com/in/phoebe-huang-9583702a3/"
    },
    {
        image: Emily,
        firstName: "Emily",
        lastName: "Yan",
        position: "Administrative Coordinator"
    },
    {
        firstName: "Peter",
        lastName: "Lu",
        position: "Administrative Coordinator"
    },
    {
        firstName: "Ella",
        lastName: "Zhang",
        position: "Marketing Coordinator"
    },
    {
        image: Heidi,
        firstName: "Heidi",
        lastName: "Huang",
        position: "Marketing Coordinator",
        link: "https://www.linkedin.com/in/heidi-huang-256862237?trk=contact-info"
    },
    {
        image: Sowmya,
        firstName: "Sowmya",
        lastName: "Ramanan",
        position: "Marketing Coordinator"
    },
    {
        firstName: "Alexander",
        lastName: "Ma",
        position: "Regional Liaison"
    },
    {
        firstName: "Jacob",
        lastName: "Lu",
        position: "Problem Setter"
    },
    {
        image: MichaelL,
        firstName: "Michael",
        lastName: "Li",
        position: "Problem Setter"
    },
    {
        image: Oscar,
        firstName: "Oscar",
        lastName: "Zhou",
        position: "Problem Setter"
    },
    {
        image: Shanna,
        firstName: "Shanna",
        lastName: "Xiao",
        position: "Problem Setter",
        link: "https://www.linkedin.com/in/shanna-xiao-544822324/"
    },
    {
        firstName: "Alexander",
        lastName: "Zhang",
        position: "Problem Setter"
    },
    {
        firstName: "Charles",
        lastName: "Ran",
        position: "Problem Setter"
    },
    {
        image: Pavel,
        firstName: "Pavel",
        lastName: "MacKenzie",
        position: "Problem Setter"
    },
    {
        image: Elaine,
        firstName: "Elaine",
        lastName: "Li",
        position: "Problem Setter"
    },
    {
        firstName: "Zheng",
        lastName: "Wang",
        position: "Problem Setter"
    },
    {
        firstName: "Jason",
        lastName: "Sun",
        position: "Problem Setter"
    },
    {
        image: Yanzi,
        firstName: "Yanzi",
        lastName: "Guo",
        position: "Developer"
    },
    {
        firstName: "Minglun",
        lastName: "Shao",
        position: "Developer"
    },
    // No department or position listed in the MasterList.
    {
        firstName: "Jia",
        lastName: "Huang"
    }
]

export const teamBg = [
    "bg-brandYellow-500",
    "bg-brandGreen-500",
    "bg-brandBlue-500",
]

export const teamText = [
    "text-brandYellow-900",
    "text-brandGreen-900",
    "text-brandBlue-900",
]
