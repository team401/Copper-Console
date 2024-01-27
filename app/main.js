"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startClient = void 0;
// const { app, BrowserWindow } = require("electron/main");
const electron_1 = require("electron");
// import { WPILibWebSocketClient, WPILibWSMessages } from "node-wpilib-ws";
// import { NT4Client, NT4Topic } from "./NT4";
// import NT4Source from "./nt4/NT4Source";
// import { NT4Client, NT4Topic } from "./nt4/NT4";
// import { NT4Publisher } from "./nt4/NT4Publisher";
// import { SIM_ADDRESS } from "./IPAddresses";
const path = require("node:path");
let win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.loadFile("app/index.html");
    // startClient(false);
    // let client = new NT4Client("127.0.0.1", "CopperConsole",
    // (topic: NT4Topic) => console.log("announce", topic),
    // (topic: NT4Topic) => console.log("unannounce", topic),
    // (topic: NT4Topic, timestamp_us: number, value: any) => console.log("New data", value),
    // () => console.log("[NT4] Connected"),
    // () => console.log("[NT4] Disconnected"),
    // )
    // client.connect()
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        console.log("window created");
    }
});
electron_1.app.on("window-all-closed", () => {
    // This code would make us not exit when all windows are closed, as is
    // customary for MacOS applications. However, this program should exit when
    // All of it
    // if (process.platform !== "darwin") {
    electron_1.app.quit();
    // }
});
// Network tables
// const ntClient = require("wpilib-nt-client");
// let ntClient: NT4Client | null = null;
// let publisher: NT4Publisher | null = null;
// let liveActive = false;
// let liveConnected = false;
const HOSTNAME = "127.0.0.1";
const rioAddress = "192.168.4.1.2";
let subId = null;
function startClient(isSim) {
    // ntClient?.disconnect();
    // publisher?.stop();
    // liveActive = true;
    // Assume nt4 live mode for now
    let address = "";
    if (isSim) {
        // address = SIM_ADDRESS;
    }
    else {
        address = rioAddress;
    }
    // ntClient = new NT4Client(
    //   address,
    //   "CopperConsole",
    //   (topic: NT4Topic) => {
    //     // Announce
    //     if (topic.name === "") return;
    //     console.log(topic);
    //   },
    //   (topic: NT4Topic) => {
    //     // Unannounce
    //   },
    //   (topic: NT4Topic, timestamp_us: number, value: unknown) => {
    //     // Data
    //     if (!ntClient || topic.name === "") return;
    //     let timestamp = Math.max(timestamp_us);
    //     console.log(timestamp, value);
    //   },
    //   () => {},
    //   () => {}
    // );
    // ntClient.connect();
    // subId = ntClient.subscribe(["x", "y"], false);
}
exports.startClient = startClient;
function parsePose2DBuffer(buf) {
    const x = buf.readDoubleLE(0);
    const y = buf.readDoubleLE(8);
    const rotation = buf.readDoubleLE(16);
    return {
        x,
        y,
        rotation,
    };
}
// Passing data between main thread and render thread
// SEE preload.js TO VIEW/UPDATE LIST OF ALLOWED WEBCONTENTS CHANNELS
// Add listener for network tables which then sends the data to the renderer
// client.addListener((key, val, type, id) => {
// Allow renderer to send "startClient" message to restart the NT client.
electron_1.ipcMain.handle("startClient", (event, hostname) => {
    try {
        startClient(hostname);
    }
    catch (e) {
        // Catch TypeErrors that happen when 'startClient' is called after window destruction
        if (!(e instanceof TypeError)) {
            throw e;
        }
        else {
            console.log("startClient based TypeError caught");
        }
    }
});
//# sourceMappingURL=main.js.map