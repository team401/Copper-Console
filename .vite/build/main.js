"use strict";const e=require("electron"),n=require("node:path"),o=()=>{new e.BrowserWindow({width:1e3,height:600,webPreferences:{preload:n.join(__dirname,"preload.js")}}).loadURL("http://localhost:5173")};e.app.on("ready",o);e.app.on("activate",()=>{e.BrowserWindow.getAllWindows().length===0&&(o(),console.log("window created"))});e.app.on("window-all-closed",()=>{e.app.quit()});