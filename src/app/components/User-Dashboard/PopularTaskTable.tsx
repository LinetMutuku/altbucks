const topChannels = [
    {
      name: 'Organic Search',
      users: 5649,
      completed: 4,
      averageDuration: '2d 14h 30m',
      engagement: 30,
      accepted: 6,
      color: '#27AE60',
    },
    {
      name: 'Referral',
      users: 4025,
      completed: 3,
      averageDuration: '1d 10h 15m',
      engagement: 24,
      accepted: 5,
      color: '#27AE60',
    },
    {
      name: 'Direct',
      users: 3105,
      completed: 2,
      averageDuration: '3d 5h 20m',
      engagement: 18,
      accepted: 4,
      color: '#27AE60',
    },
    {
      name: 'Social',
      users: 1251,
      completed: 1,
      averageDuration: '4h 45m',
      engagement: 12,
      accepted: 3,
      color: '#27AE60',
    },
    {
      name: 'Other',
      users: 734,
      completed: 0,
      averageDuration: '6h 30m',
      engagement: 9,
      accepted: 2,
      color: '#27AE60',
    },
  ];
  
  const PopularTaskTable = () => {
    return (
        <div className="block p-6 w-full overflow-x-auto border rounded-lg">
        <table className="w-full bg-transparent border-collapse">
          <thead>
            <tr className="">
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Task</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Posted</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Completed</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Avgerage Duration</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Engagement</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Accepted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {topChannels.map((channel, index) => (
              <tr key={index} className="text-gray-500">
                <th className="border-t-0 px-4 py-4 text-sm font-normal text-left">{channel.name}</th>
                <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{channel.users}</td>
                <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{channel.completed}</td>
                <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{channel.averageDuration}</td>
                <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-2">{channel.engagement}%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                      <div className="h-2 rounded-sm" style={{ width: `${channel.engagement}%`, backgroundColor: channel.color }}></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{channel.accepted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PopularTaskTable;
  