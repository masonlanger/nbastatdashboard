'use client'

import { useEffect, useState} from "react"
import './styles/pbp.scss'

type PBPData = {
    mainTeam: number,
    mainTeamImg: string,
    mainPlayer: string,
    mainPlayerImg: string,
    playersInvolved: number[],
    description: string

}

export default function PlayByPlay({gameId} : {gameId: any}){
    const [ pbp, setPBP ] = useState({} as PBPData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/lastplay?gameId=${gameId}`);
                const result = await response.json(); // Assuming the response is text
                result ? setPBP(result) : setPBP({} as PBPData); 
            } catch (error) {
                console.error('Error fetching data:', error);
              }
        };

        fetchData();
    }, [])

    return (
        <div>
            {pbp?.description !== "Period End" ? <h4 className="text-center mt-1">Latest Play</h4> : ""}
            <div className="flex flex-row space-x-2 items-center">
                <div className="flex flex-col">
                    <img className="teamImg" src={pbp?.mainTeamImg} />
                    <img className="teamImg" src={pbp?.mainPlayerImg} />
                </div>
                {pbp?.description !== "Period End" ? <h6 className="text-wrap description">{pbp?.description}</h6> : ""} 
            </div>
        </div>
    );
}