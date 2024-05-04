import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className=' flex  lg:h-[700px]  rounded-lg  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 flex-col lg:flex-row'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}
//sm:h-[450px] md:h-[700px] overflow-hidden
export default Home