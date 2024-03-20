import { createContext } from "react";
import IsOpenMenu from "./NavBar"
import { boolean } from "zod";
const SharedContext = createContext < boolean > ({ IsOpenMenu });

export default SharedContext;
