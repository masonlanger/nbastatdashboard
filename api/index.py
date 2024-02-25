from flask import Flask, request, jsonify
from nba_api.live.nba.endpoints import playbyplay
from nba_api.stats.endpoints import teamgamelogs
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguedashteamstats
import json
import pandas as pd
from todaydashboard import initDash
from standings import get_standings

app = Flask(__name__)
app.json.sort_keys = False

def convertGameToJSON(game):
    return(
        {
    'gameId': game['gameId'],
    'gameClock': game['gameClock'],
    'gameStatusText': game['gameStatusText'],
    'homeTeam': {
        'teamId': game['homeTeam']['teamId'],
        'teamAbr': game['homeTeam']['teamTricode'],
        'teamName': game['homeTeam']['teamName'],
        'wins': game['homeTeam']['wins'],
        'losses': game['homeTeam']['losses'],
        'score': game['homeTeam']['score'],
        'leader': game['gameLeaders']['homeLeaders']
    },
    'awayTeam': {
        'teamId': game['awayTeam']['teamId'],
        'teamAbr': game['awayTeam']['teamTricode'],
        'teamName': game['awayTeam']['teamName'],
        'wins': game['awayTeam']['wins'],
        'losses': game['awayTeam']['losses'],
        'score': game['awayTeam']['score'],
        'leader': game['gameLeaders']['awayLeaders']
    }
}
    )

def getImgByTeamId(teamId):
    return "https://cdn.nba.com/logos/nba/" + str(teamId) + "/primary/D/logo.svg"

def convertScoreboard(scoreboard):
    arr = []
    for game in scoreboard:
        json_game = convertGameToJSON(game)
        arr.append(json_game)
    return json.dumps(arr)

@app.route("/api/dailyleaders", methods=["GET"])
def start():
    return initDash()

@app.route("/api/lastplay", methods=["GET"])
def getLastPlay():
    gameId = request.args.get('gameId')

    pbp = playbyplay.PlayByPlay(gameId)
    play = pbp.get_dict()['game']['actions'][-1]
    playRet = {}
    if(play.get('teamId') is not None):
        playRet['mainTeam'] = play['teamId']
        playRet['mainTeamImg'] = getImgByTeamId(play['teamId'])
    else:
        playRet['mainTeam'] = 'None'
    if(play.get('playerNameI') is not None):
        playRet['mainPlayer'] = play['playerNameI']
        playRet['mainPlayerImg'] = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + str(play['personIdsFilter'][0]) + ".png"
        playRet['playersInvolved'] = play['personIdsFilter']
    playRet['description'] = play['description']

    return jsonify(playRet)

@app.route("/api/form", methods=["GET"])
def form_sort():
    teams_dict = {}
    sorted_json = {'standings' : []}
    logs = teamgamelogs.TeamGameLogs(season_nullable='2023-24', last_n_games_nullable=5)
    df = logs.get_data_frames()[0]
    adv = leaguedashteamstats.LeagueDashTeamStats(measure_type_detailed_defense='Advanced', last_n_games=5)
    adv_json = json.loads(adv.get_normalized_json())['LeagueDashTeamStats']
    adv_dict = {}
    for team in adv_json:
        adv_dict.update({team['TEAM_ID'] : {
            'OFF_RTG': team['OFF_RATING'],
            'DEF_RTG': team['DEF_RATING'],
            'NET': team['NET_RATING'],
            'OFF_RANK': team['OFF_RATING_RANK'],
            'DEF_RANK': team['DEF_RATING_RANK'],
            'NET_RANK': team['NET_RATING_RANK']
        }})


    for team in teams.get_teams():
        abr = team['abbreviation']
        t_id = teams.find_team_by_abbreviation(abr)['id']
        teams_dict.update({abr: {
            'L5': list(df[df['TEAM_ABBREVIATION'] == abr]['WL']),
            'teamImg': getImgByTeamId(t_id),
            'adv': adv_dict.get(t_id)
    }})
    team_arr = list(teams_dict)
    for team in sorted(team_arr, key=lambda team: teams_dict.get(team)['L5'].count('W'), reverse=True):
        t = teams_dict.get(team)
        sorted_json['standings'].append({
            'teamAbr': team,
            'L5': t['L5'],
            'teamImg': t['teamImg'],
            'adv_stats': t['adv']
    })
    return sorted_json

@app.route("/api/conf_standings", methods=["GET"])
def standings():
    return get_standings()

if __name__ == "__main__":
    app.run()
