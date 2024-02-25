'use client'

import { useEffect, useState} from "react"
import './styles/form.scss'

type FormData = {
    standings : []
}

type FormProps = {
    form: any[],
    img: any,
    teamAbr: any,
    adv: {
        DEF_RANK: number,
        OFF_RANK: number,
        NET_RANK: number,
        OFF_RTG: number,
        DEF_RTG: number,
        NET: number
    }
}

function TeamFormBug(form : any[]){
    return(
        <div className="flex flex-row items-center justify-center space-x-0.5 my-0.5">
        {form.map((ele : any, index: number) => {
                let circleStyle = ele === 'W' ? {width: '1.5rem', aspectRatio: '1/1', backgroundColor: '#4ba363'} : {width: '1.5rem', aspectRatio: '1/1', backgroundColor: '#ed4e4e'};
                let line = ele === 'W' ? <hr style={{width: '1.5rem', height: '0.125rem', borderColor: '#4ba363', color: '#4ba363', backgroundColor: '#4ba363'}} /> : <hr style={{width: '1.75rem', height: '0.125rem', borderColor: '#ed4e4e', color: '#ed4e4e', backgroundColor: '#ed4e4e'}} />
                if(index === 0){
                    return (
                    <div className="flex flex-col items-center justify-center space-y-0.5">
                        <div key={index} className="rounded-full bg-gray text-center shadow-inner" style={circleStyle}>{ele}</div>
                        {line}
                    </div>
                    );
                } else {
                    return (<div key={index} className="rounded-full bg-gray text-center shadow-inner" style={circleStyle}>{ele}</div>);
                }
            })
            }
        </div>
    )
}
function TeamFormRow({form, img, teamAbr, adv} : FormProps){
    return (
        <div className="flex flex-row items-center justify-center space-x-0.5">
            <div id="adv-container" className="flex flex-row">
                <div className="stat-container flex flex-row space-x-1">
                    <span>{adv['OFF_RTG']}</span>
                    <span>#{adv['OFF_RANK']}</span>
                </div>
                <div className="stat-container flex flex-row space-x-1 ml-2">
                    <span>{adv['DEF_RTG']}</span>
                    <span>#{adv['DEF_RANK']}</span>
                </div>
                <div className="stat-container flex flex-row space-x-1 ml-2">
                    <span>{adv['NET']}</span>
                    <span>#{adv['NET_RANK']}</span>
                </div>
            </div>
        </div>
    )
}

export default function TeamForm(){
    const [form, setForm] = useState<FormData>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/form');
                const result = await response.json();
                console.log(result)
                setForm(result);
            } catch (error) {
                console.error('Error fetching data:', error);
              }
        };
        fetchData();
    }, [])
    return(
        <div className="text-center font-bold">
            <h1 className="font-bold cat-title">Recent Form</h1>
            <table className="mt-3 w-full rounded text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Team
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last 5
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Off. Rtg
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Def. Rtg
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Net Rtg
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    </tr>
                    {form ? form['standings'].slice(0, Math.min(form['standings'].length, 10)).map((team) => {
                        return (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex flex-row items-center team-detail">
                                        <h1 className="font-bold">{team['teamAbr']}</h1>
                                        <img className="form-team-img" src={team['teamImg']} />
                                    </div>
                                </th>
                                <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {TeamFormBug(team['L5'])}
                                </th>
                                <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <h2 className="whitespace-nowrap text-sm">{team['adv_stats']['OFF_RTG']} (#{team['adv_stats']['OFF_RANK']})</h2>
                                </th>
                                <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <h2 className="whitespace-nowrap text-sm">{team['adv_stats']['DEF_RTG']} (#{team['adv_stats']['DEF_RANK']})</h2>
                                </th>
                                <th scope="row" className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <h2 className="whitespace-nowrap text-sm">{team['adv_stats']['NET']} (#{team['adv_stats']['NET_RANK']})</h2>
                                </th>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    )
}