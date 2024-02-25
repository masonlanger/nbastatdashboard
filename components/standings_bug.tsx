'use client'
import { useEffect, useId, useState } from "react"
import './styles/standings.scss'

type StandingsDict = {
    'Eastern': any[],
    'Western': any[]
}
type Team = {
    'PlayoffRank': number,
    'teamId': number,
    'teamImg': string,
    'WINS': number,
    'LOSSES': number
    'ConferenceGamesBack': number
}

export default function Standings(){
    const [standings, setStandings] = useState<StandingsDict>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch('api/conf_standings')
                .then(res => res.json())
                .then(data => setStandings(data))
            } catch(err){
                console.log(err)
            }
        };

        fetchData();
    }, [])

    const Bug = (conf: any[] | undefined) => {
        let playInStyle = {backgroundColor: '#211d1d'}
        // let eastImgs = east?.map((team: Team) => <img src={team.teamImg} className="standings-team-img"/>);
        let topSix = conf?.slice(0, 6).map((team: Team) => {
            return(
                <tr key={team.teamId} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.PlayoffRank}
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={team.teamImg} className="standings-team-img"/>
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.WINS}-{team.LOSSES}
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {Math.ceil((team.WINS/(team.WINS+team.LOSSES)) * 1000)/1000}
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.ConferenceGamesBack !== 0 ? team.ConferenceGamesBack : "--"}
                    </th>
                </tr>
                // <div className="flex flex-row items-center space-x-1.5">
                //     <span className="standings-pos-text">{team.PlayoffRank}.</span>
                //     <img src={team.teamImg} className="standings-team-img"/>
                //     <span className="record">({team.WINS}-{team.LOSSES})</span>
                //     <span className="standings-pos-text">{team.ConferenceGamesBack !== 0 ? team.ConferenceGamesBack : "--"}</span>
                // </div>
            )
        });
        let playIn = conf?.slice(6, 10).map((team: Team) => {
            return(
                <tr key={team.teamId} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-600">
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.PlayoffRank}
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={team.teamImg} className="standings-team-img"/>
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.WINS}-{team.LOSSES}
                    </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {Math.ceil((team.WINS/(team.WINS+team.LOSSES)) * 1000)/1000}
                        </th>
                    <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {team.ConferenceGamesBack !== 0 ? team.ConferenceGamesBack : "--"}
                    </th>
                </tr>
            );
        });
        let rest = conf?.slice(10).map((team: Team) =>
            {
                return(
                    <tr key={team.teamId} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {team.PlayoffRank}
                        </th>
                        <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src={team.teamImg} className="standings-team-img"/>
                        </th>
                        <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {team.WINS}-{team.LOSSES}
                        </th>
                        <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {Math.ceil((team.WINS/(team.WINS+team.LOSSES)) * 1000)/1000}
                        </th>
                        <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {team.ConferenceGamesBack !== 0 ? team.ConferenceGamesBack : "--"}
                        </th>
                    </tr>
                )
            }
         );
        return(
            <div>
                <table className="mt-3 w-full rounded text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                POS
                            </th>
                            <th scope="col" className="px-3 py-3">
                                TEAM
                            </th>
                            <th scope="col" className="px-2 py-3">
                                RECORD
                            </th>
                            <th scope="col" className="px-2 py-3">
                                WIN %
                            </th>
                            <th scope="col" className="px-2 py-3">
                                GB
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {topSix}
                        {playIn}
                        {rest}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="text-center">
            <h1 className="cat-title">Conference Standings</h1>
            <div className="flex flex-row space-x-8 items-center self-center">
                {Bug(standings?.Western)}
                {Bug(standings?.Eastern)}
            </div>
            
        </div>
        
    )
}