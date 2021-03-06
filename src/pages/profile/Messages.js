import React, { Component } from "react";
import Sidebar from "./SideBar";
import Conversation from "./MessagesConversation"
import { Navbar } from '../home/Home.js'

class Messages extends Component {
  render() {
    return (
        <div>
            <Navbar />
              <div id="profile">
                <Sidebar />
                <div className='profile-content'>
                  {/* Title */}
                  <h1 className='profile-title'>  Messages </h1>
                  <div className='profile-sub-content'>
                    <div className='vertical-frame'>
                      <Conversation />
                    </div>
                  </div>
                </div>
              </div>
        </div>
    );
  }
}
 
export default Messages;