"use client"
import React from 'react'

import Search from './Search'
// import Groups from './Groups'
import People from './People'
// import CreateGroup from "./CreateGroup"

const FindAndChat = ({ fetchchatsagain }) => {
  return (
    <div className="flex flex-col justify-between items-center h-full w-[25%] md:w-[30%] xl:w[30%]">
      {/* <Search /> */}
      {/* <Groups/> */}
      {/* <CreateGroup  /> */}
      <People
        fetchchatsagain={fetchchatsagain}
        
      />
    </div>
  );
};

export default FindAndChat