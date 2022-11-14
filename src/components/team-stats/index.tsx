import {FunctionComponent} from 'react';
import {Statistic} from '../../model';

const TeamStats: FunctionComponent<{ stats: Statistic }> = ({stats}) => {
  return (
    <></>
    // <div className="grid grid-cols-2 gap-3 w-full">
    //   {stats.teams.map(team => (
    //     <Card key={team.name}>
    //       <div className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-xl">
    //         <h2 className="text-xl font-semibold">{team.name}</h2>
    //       </div>
    //       <div className="px-6 py-3">
    //         <div className="grid grid-cols-3 gap-3">
    //           <div>
    //             <h3 className="font-semibold">{team.matches}</h3>
    //             <p className="text-sm">Matches</p>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold">{team.wins}</h3>
    //             <p className="text-sm">Wins</p>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold">{team.losses}</h3>
    //             <p className="text-sm">Losses</p>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold">{team.goals}</h3>
    //             <p className="text-sm">Goals</p>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold">{team.avgGoals}</h3>
    //             <p className="text-sm">Average Goals</p>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold">{Math.round(team.winrate * 100)}%</h3>
    //             <p className="text-sm">Winrate</p>
    //           </div>
    //         </div>
    //       </div>
    //       <table className="table-auto w-full mb-1">
    //         <thead className="bg-gray-200 text-left text-sm">
    //         <tr>
    //           <th className="py-1 pl-6 w-1/6"></th>
    //           <th className="py-1 w-1/6">W</th>
    //           <th className="py-1 w-1/6">L</th>
    //           <th className="py-1 w-1/6">G</th>
    //           <th className="py-1 w-1/6">Ø</th>
    //           <th className="py-1 pr-6 w-1/6">WR</th>
    //         </tr>
    //         </thead>
    //         <tbody className={`text-left`}>
    //         {team.opponents.map(opponent => (
    //           <tr key={opponent.name} className={`${opponent.wins > opponent.losses ? 'bg-green-50' : ''} border-b`}>
    //             <td className="py-2 pl-6 w-1/6">{opponent.name}</td>
    //             <td className="py-2 w-1/6">{opponent.wins}</td>
    //             <td className="py-2 w-1/6">{opponent.losses}</td>
    //             <td className="py-2 w-1/6">{opponent.goals}</td>
    //             <td className="py-2 w-1/6">{opponent.avgGoals}</td>
    //             <td className="py-2 pr-6 w-1/6">{opponent.winrate * 100}%</td>
    //           </tr>
    //         ))}
    //         </tbody>
    //       </table>
    //     </Card>
    //   ))}
    // </div>
  )
};

export default TeamStats;
