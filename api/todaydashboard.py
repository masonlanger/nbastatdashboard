from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import leaguestandingsv3
import json

def getImgByTeamId(teamId):
    return "https://cdn.nba.com/logos/nba/" + str(teamId) + "/primary/D/logo.svg"

def get_standing_place(id, standings):
    for team in standings:
        if team['TeamID'] == id:
            return "#" + str(team['PlayoffRank']) + " " + team['Conference']
    return

def convertGameToJSON(game):
    homeLeaderPic = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + str(game['gameLeaders']['homeLeaders']['personId']) + ".png"
    awayLeaderPic = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + str(game['gameLeaders']['awayLeaders']['personId']) + ".png"
    homeLeader = game['gameLeaders']['homeLeaders']
    homeLeader['playerImg'] = homeLeaderPic
    awayLeader = game['gameLeaders']['awayLeaders']
    awayLeader['playerImg'] = awayLeaderPic

    return(
        {
    'gameId': game['gameId'],
    'gameClock': game['gameClock'],
    'gameStatus': game['gameStatus'],
    'gameStatusText': game['gameStatusText'],
    'homeTeam': {
        'teamId': game['homeTeam']['teamId'],
        'teamAbr': game['homeTeam']['teamTricode'],
        'teamName': game['homeTeam']['teamName'],
        'teamImg': getImgByTeamId(game['homeTeam']['teamId']),
        'wins': game['homeTeam']['wins'],
        'losses': game['homeTeam']['losses'],
        'score': game['homeTeam']['score'],
        'leader': homeLeader,
    },
    'awayTeam': {
        'teamId': game['awayTeam']['teamId'],
        'teamAbr': game['awayTeam']['teamTricode'],
        'teamName': game['awayTeam']['teamName'],
        'teamImg': getImgByTeamId(game['awayTeam']['teamId']),
        'wins': game['awayTeam']['wins'],
        'losses': game['awayTeam']['losses'],
        'score': game['awayTeam']['score'],
        'leader': awayLeader,
    }
}
    )

def convertScoreboard(scoreboard):
    arr = []
    standingsDict = leaguestandingsv3.LeagueStandingsV3().get_normalized_dict()['Standings']
    for game in scoreboard:
        json_game = convertGameToJSON(game)
        json_game['homeTeam']['seed'] = get_standing_place(id=json_game['homeTeam']['teamId'], standings=standingsDict)
        json_game['awayTeam']['seed'] = get_standing_place(id=json_game['awayTeam']['teamId'], standings=standingsDict)
        arr.append(json_game)
    return json.dumps(arr)

def initDash():
	presentDash = scoreboard.ScoreBoard().games.get_dict()
	return (convertScoreboard(presentDash))

