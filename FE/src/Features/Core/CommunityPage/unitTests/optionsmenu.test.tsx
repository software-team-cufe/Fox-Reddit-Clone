import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter} from "react-router-dom";
import EditModal from "../accessories/editbanner";

