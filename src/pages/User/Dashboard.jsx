import React, { useState } from 'react'

const Dashboard = () => {
     const [active, setActive] = useState("Dashboard");
  return (
    <div>
      <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-6">{active}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">Enrolled Courses</h2>
              <p className="text-gray-500">You’re enrolled in 5 courses</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">Upcoming Deadlines</h2>
              <p className="text-gray-500">3 assignments due this week</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">Announcements</h2>
              <p className="text-gray-500">2 new announcements</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">Progress Tracker</h2>
              <p className="text-gray-500">You’ve completed 60% of your tasks</p>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard