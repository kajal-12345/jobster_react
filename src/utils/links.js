import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsSearch, BsBriefcaseFill } from "react-icons/bs";
import { BiBriefcase } from "react-icons/bi";
const links = [
  {
    id: 1,
    text: "Stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all-jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add-job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: "seeking job",
    path: "seeking-job",
    icon: <BsSearch />,
  },
  {
    id: 6,
    text: "Applied jobs",
    path: "applied-jobs",
    icon: <BsBriefcaseFill />,
  },
  { id: 7, text: "My Jobs", path: "my-job", icon: <BiBriefcase /> },
];
export default links;
