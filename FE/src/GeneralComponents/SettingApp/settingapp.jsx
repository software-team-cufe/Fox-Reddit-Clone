import React , {useState} from "react";
import Navofsetting from './navofsetting';
import EmailSetting from './EmailSetting';
import { Route, Routes } from "react-router-dom";

export default [
  <Route key={"/setting"} path="/setting" element={<Navofsetting />} /> ,
  <Route key={"/setting/email"} path="/setting/email" element={<EmailSetting />} />,
]
        
