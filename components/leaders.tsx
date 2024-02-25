'use client'

import { useState, useEffect } from "react";
import PlayByPlay from "./playbyplay";
import './styles/leaders.scss'
export default function Leaders(){
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/dailyleaders');
            const result = await response.json(); // Assuming the response is text
            result ? setData(result) : setData([]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return(
      <div className="text-center">
        <h1 className="font-bold">Tonight's Games</h1>
        <div className="flex flex-row flex-wrap space-x-6 self-center justify-center">
            {
                data?.filter((game: any) => game.gameStatus === 2).map((game: any) => {
                  let winnerStyle = {fontWeight: '700', opacity: '67%'}
                  let betterStyle = {fontWeight: '500', opacity: '67%'}
                    return(
                        <div key={game.gameId} className="flex flex-col shrink-0 mt-2 mb-7">
                          <div className="flex flex-row space-x-1.5 self-center">
                            <div className="flex space-x-0.25 items-start">
                              <div className="flex flex-col">
                                <span className="text-xs pt-1.5">{game.homeTeam.wins}-{game.homeTeam.losses}</span>
                                <span className="text-xs pt-1.5">{game.homeTeam.seed}</span>
                              </div>
                              <img className="teamImg" src={game.homeTeam.teamImg} />
                            </div>
                            <div className="flex flex-col shrink-0 items-center justify-center">
                              {game.gameStatus === 1 ? "" : <div className="flex flex-row space-x-1 self-center">
                                {game.homeTeam.score > game.awayTeam.score ? <h2 style={winnerStyle}>{game.homeTeam.score}</h2> : <h2>{game.homeTeam.score}</h2>}
                                <h2> - </h2>
                                {game.awayTeam.score > game.homeTeam.score ? <h2 style={winnerStyle}>{game.awayTeam.score}</h2> : <h2>{game.awayTeam.score}</h2>}
                              </div>}
                              {game.gameStatusText === "Final" ? <h3 className="text-center font-bold" style={{opacity: '67%'}}>{game.gameStatusText}</h3> : <h3 className="text-center">{game.gameStatusText}</h3>}
                            </div>
                            <div className="flex space-x-0.25 items-start">
                              <img className="teamImg" src={game.awayTeam.teamImg} />
                              <div className="flex flex-col">
                                <span className="text-xs pt-1.5">{game.awayTeam.wins}-{game.awayTeam.losses}</span>
                                <span className="text-xs pt-1.5">{game.awayTeam.seed}</span>
                              </div>
                            </div>
                          </div>
                          {game.gameStatus > 1 ? <div className="flex flex-row space-x-2 self-center" key={game.homeTeam.leader.personId + game.awayTeam.leader.personId}>
                            <div className="flex flex-col items-center">
                              <img className="leaderImg text-center" src={game.homeTeam.leader.playerImg} />
                              <h6 className="text-center">{game.homeTeam.leader.name}</h6>
                              {game.homeTeam.leader.points > game.awayTeam.leader.points ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.points} PTs</h6> : <h6 className="text-center">{game.homeTeam.leader.points} PTs</h6>}
                              {game.homeTeam.leader.assists > game.awayTeam.leader.assists ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.assists} ASTs</h6> : <h6 className="text-center">{game.homeTeam.leader.assists} ASTs</h6>}
                              {game.homeTeam.leader.rebounds > game.awayTeam.leader.rebounds ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.rebounds} REBs</h6> : <h6 className="text-center">{game.homeTeam.leader.rebounds} REBs</h6>}
                            </div>
                            <div className="flex flex-col items-center">
                              <img className="leaderImg" src={game.awayTeam.leader.playerImg} />
                              <h6 className="text-center">{game.awayTeam.leader.name}</h6>
                              {game.homeTeam.leader.points < game.awayTeam.leader.points ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.points} PTs</h6> : <h6 className="text-center">{game.awayTeam.leader.points} PTs</h6>}
                              {game.homeTeam.leader.assists < game.awayTeam.leader.assists ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.assists} ASTs</h6> : <h6 className="text-center">{game.awayTeam.leader.assists} ASTs</h6>}
                              {game.homeTeam.leader.rebounds < game.awayTeam.leader.rebounds ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.rebounds} REBs</h6> : <h6 className="text-center">{game.awayTeam.leader.rebounds} REBs</h6>}
                            </div> 
                          </div> : ""}
                          {game.gameStatus === 2 ? 
                            <div className="flex flex-row space-x-2 self-center">
                              <PlayByPlay gameId={game.gameId} />
                            </div> : ""}
                        </div>
                    )
                }) 
            }
        </div>
        <div className="flex flex-row flex-wrap space-x-10 self-center justify-center">
            {
                data?.filter((game: any) => game.gameStatus !== 2).map((game: any) => {
                  let winnerStyle = {fontWeight: '700', opacity: '67%'}
                  let betterStyle = {fontWeight: '500', opacity: '67%'}
                    return(
                        <div key={game.gameId} className="flex flex-col shrink-0 mt-2 mb-7">
                          <div className="flex flex-row space-x-1.5 self-center">
                            <div className="flex space-x-0.25 items-start">
                              <div className="flex flex-col">
                                <span className="text-xs pt-1.5">{game.homeTeam.wins}-{game.homeTeam.losses}</span>
                                <span className="text-xs pt-1.5">{game.homeTeam.seed}</span>
                              </div>
                              <img className="teamImg" src={game.homeTeam.teamImg} />
                            </div>
                            <div className="flex flex-col shrink-0 items-center justify-center">
                              {game.gameStatus === 1 ? "" : <div className="flex flex-row space-x-1 self-center">
                                {game.homeTeam.score > game.awayTeam.score ? <h2 style={winnerStyle}>{game.homeTeam.score}</h2> : <h2>{game.homeTeam.score}</h2>}
                                <h2> - </h2>
                                {game.awayTeam.score > game.homeTeam.score ? <h2 style={winnerStyle}>{game.awayTeam.score}</h2> : <h2>{game.awayTeam.score}</h2>}
                              </div>}
                              {game.gameStatusText === "Final" ? <h3 className="text-center font-bold" style={{opacity: '67%'}}>{game.gameStatusText}</h3> : <h3 className="text-center">{game.gameStatusText}</h3>}
                            </div>
                            <div className="flex space-x-0.25 items-start">
                              <img className="teamImg" src={game.awayTeam.teamImg} />
                              <div className="flex flex-col">
                                <span className="text-xs pt-1.5">{game.awayTeam.wins}-{game.awayTeam.losses}</span>
                                <span className="text-xs pt-1.5">{game.awayTeam.seed}</span>
                              </div>
                            </div>
                          </div>
                          {game.gameStatus > 1 ? <div className="flex flex-row space-x-2 self-center" key={game.homeTeam.leader.personId + game.awayTeam.leader.personId}>
                            <div className="flex flex-col items-center">
                              <img className="leaderImg text-center" src={game.homeTeam.leader.playerImg} />
                              <h6 className="text-center">{game.homeTeam.leader.name}</h6>
                              {game.homeTeam.leader.points > game.awayTeam.leader.points ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.points} PTs</h6> : <h6 className="text-center">{game.homeTeam.leader.points} PTs</h6>}
                              {game.homeTeam.leader.assists > game.awayTeam.leader.assists ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.assists} ASTs</h6> : <h6 className="text-center">{game.homeTeam.leader.assists} ASTs</h6>}
                              {game.homeTeam.leader.rebounds > game.awayTeam.leader.rebounds ? <h6 className="text-center" style={betterStyle}>{game.homeTeam.leader.rebounds} REBs</h6> : <h6 className="text-center">{game.homeTeam.leader.rebounds} REBs</h6>}
                            </div>
                            <div className="flex flex-col items-center">
                              <img className="leaderImg" src={game.awayTeam.leader.playerImg} />
                              <h6 className="text-center">{game.awayTeam.leader.name}</h6>
                              {game.homeTeam.leader.points < game.awayTeam.leader.points ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.points} PTs</h6> : <h6 className="text-center">{game.awayTeam.leader.points} PTs</h6>}
                              {game.homeTeam.leader.assists < game.awayTeam.leader.assists ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.assists} ASTs</h6> : <h6 className="text-center">{game.awayTeam.leader.assists} ASTs</h6>}
                              {game.homeTeam.leader.rebounds < game.awayTeam.leader.rebounds ? <h6 className="text-center" style={betterStyle}>{game.awayTeam.leader.rebounds} REBs</h6> : <h6 className="text-center">{game.awayTeam.leader.rebounds} REBs</h6>}
                            </div> 
                          </div> : ""}
                          {game.gameStatus === 2 ? 
                            <div className="flex flex-row space-x-2 self-center">
                              <PlayByPlay gameId={game.gameId} />
                            </div> : ""}
                        </div>
                    )
                }) 
            }
        </div>
        </div>
    );
}