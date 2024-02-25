from nba_api.stats.endpoints import leaguestandingsv3
import json

def getImgByTeamId(teamId):
    return "https://cdn.nba.com/logos/nba/" + str(teamId) + "/primary/D/logo.svg"

def get_standings():
    conf_dict = {'Eastern': [],
                 'Western': []}
    standings = json.loads(leaguestandingsv3.LeagueStandingsV3().get_normalized_json())['Standings']
    for team in standings:
        team['teamImg'] = getImgByTeamId(team['TeamID'])
        if team['Conference'] == 'East':
            conf_dict['Eastern'].append(team)
        else:
            conf_dict['Western'].append(team)
    return json.dumps(conf_dict)